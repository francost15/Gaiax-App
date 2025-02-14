"use server";

import { PrismaClient } from "@prisma/client";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";

const prisma = new PrismaClient();

// Definir interfaces para tipar mejor los datos
interface UserData {
  learningPreferences: {
    skillLevel: number;
    learningStyleKolb: string;
    formats: string[];
    availableTime: number;
    strengths: string[];
    improvementAreas: string[];
    goals: string[];
  };
  company: {
    requirements: Array<{
      categoryId: string;
      name: string;
      description: string;
      skillsDesired: string[];
    }>;
  };
}

/**
 * Obtiene los datos completos del usuario y la empresa
 */
async function getUserAndCompanyData(userId: string): Promise<UserData> {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      learningPreferences: true,
      company: {
        include: {
          requirements: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (!userData?.company) {
    throw new Error("Usuario no tiene una empresa asociada");
  }

  if (!userData?.learningPreferences) {
    throw new Error(
      "Usuario no tiene preferencias de aprendizaje configuradas"
    );
  }

  // Validar que los campos necesarios existan
  if (
    userData.learningPreferences.skillLevel === undefined ||
    !userData.learningPreferences.learningStyleKolb ||
    !userData.learningPreferences.formats ||
    !userData.learningPreferences.availableTime ||
    !userData.learningPreferences.strengths ||
    !userData.learningPreferences.improvementAreas ||
    !userData.learningPreferences.goals
  ) {
    throw new Error(
      "Faltan campos requeridos en las preferencias de aprendizaje"
    );
  }

  return userData as UserData;
}

/**
 * Genera y crea un nuevo curso utilizando IA basado en requerimientos y preferencias
 */
export async function createCourseWithAI(userId: string, categoryId: string) {
  try {
    // Obtener y validar datos completos
    const userData = await getUserAndCompanyData(userId);
    const { learningPreferences, company } = userData;

    // Filtrar requerimientos por categoría
    const categoryRequirements = company.requirements.filter(
      (req) => req.categoryId === categoryId
    );

    if (categoryRequirements.length === 0) {
      throw new Error("No hay requerimientos para esta categoría");
    }

    const prompt = `
      Genera un curso personalizado considerando:

      PERFIL DEL USUARIO:
      - Nivel de habilidad: ${learningPreferences.skillLevel}/5
      - Estilo de aprendizaje: ${learningPreferences.learningStyleKolb}
      - Formatos preferidos: ${learningPreferences.formats.join(", ")}
      - Tiempo disponible: ${learningPreferences.availableTime} min/día
      - Fortalezas: ${learningPreferences.strengths.join(", ")}
      - Áreas de mejora: ${learningPreferences.improvementAreas.join(", ")}
      - Metas: ${learningPreferences.goals.join(", ")}

      REQUERIMIENTOS DE LA EMPRESA:
      ${categoryRequirements
        .map(
          (req) => `- ${req.name}:
              Descripción: ${req.description}
              Habilidades deseadas: ${req.skillsDesired.join(", ")}`
        )
        .join("\n")}

      Instrucciones: 
      1. Ajustar el contenido a las preferencias del usuario.
      2. Incluir objetivos de aprendizaje alineados a metas y requerimientos.
      3. Asignar exp entre 50 y 200 puntos.
      4. Agregar un listado de lecciones con título, descripción y objetivos.
    `;

    const response = await generateObject({
      model: openai("gpt-4o"),
      prompt,
      schema: z.object({
        title: z.string(),
        description: z.string(),
        learningObjectives: z.array(z.string()),
        exp: z.number().min(50).max(200),
        lessons: z
          .array(
            z.object({
              title: z.string(),
              description: z.string(),
              objectives: z.array(z.string()),
              type: z.string(),
            })
          )
          .optional(),
      }),
    });

    // Crear el curso
    const course = await prisma.course.create({
      data: {
        title: response.object.title,
        description: response.object.description,
        categoryId,
        exp: response.object.exp,
        learningObjectives: response.object.learningObjectives,
        url: null, // Se puede agregar más adelante si se requiere
      },
    });

    // Crear contenido para cada lección
    if (response.object.lessons) {
      for (const lesson of response.object.lessons) {
        await prisma.content.create({
          data: {
            title: lesson.title,
            description: lesson.description,
            type: lesson.type, // o el tipo que prefieras
            exp: 50,
            url: null,
            categoryId: categoryId,
          },
        });
      }
    }

    // Crear notificación para el usuario
    await prisma.notification.create({
      data: {
        userId,
        courseId: course.id,
        title: "Nuevo curso personalizado disponible",
        message: `Se ha creado un nuevo curso para ti: ${course.title}`,
        notificationType: "CourseCreated",
      },
    });

    // Retornar el curso y las lecciones (si existen)
    return {
      ...course,
      lessons: response.object.lessons ?? [],
    };
  } catch (error: any) {
    console.error("Error creando curso con IA:", error);
    throw new Error(`Error al crear curso personalizado: ${error.message}`);
  }
}
