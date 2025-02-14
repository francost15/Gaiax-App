"use server";

import { PrismaClient } from "@prisma/client";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";

const prisma = new PrismaClient();

// Interfaces para tipar los datos
interface LearningPreferences {
  skillLevel: number;
  learningStyleKolb: string;
  formats: string[];
  availableTime: number;
  strengths: string[];
  improvementAreas: string[];
  goals: string[];
}

interface CompanyRequirement {
  name: string;
  description: string;
  skillsDesired: string[];
}

/**
 * Obtiene los datos necesarios para generar una lección
 */
async function getLessonContextData(courseId: string, userId: string) {
  const data = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      category: true,
      // Obtener usuario con sus preferencias
      UserProgress: {
        where: { userId },
        include: {
          user: {
            include: {
              learningPreferences: true,
              company: {
                include: {
                  requirements: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!data) {
    throw new Error("Curso no encontrado");
  }

  const userProgress = data.UserProgress[0];
  if (!userProgress?.user.learningPreferences) {
    throw new Error("Preferencias de aprendizaje no encontradas");
  }

  return {
    course: data,
    preferences: userProgress.user.learningPreferences,
    requirements: userProgress.user.company.requirements,
  };
}

/**
 * Genera y crea una nueva lección personalizada usando IA
 */
export async function createLessonWithAI(
  courseId: string,
  userId: string,
  topic: string
) {
  try {
    const { course, preferences, requirements } = await getLessonContextData(
      courseId,
      userId
    );

    const prompt = `
      Genera una lección personalizada sobre "${topic}" para un curso de "${
      course.title
    }" considerando:

      PERFIL DEL ESTUDIANTE:
      - Nivel: ${preferences.skillLevel}/5
      - Estilo de aprendizaje: ${preferences.learningStyleKolb}
      - Formatos preferidos: ${preferences.formats.join(", ")}
      - Tiempo disponible: ${preferences.availableTime} minutos
      - Fortalezas: ${preferences.strengths.join(", ")}
      - Áreas de mejora: ${preferences.improvementAreas.join(", ")}

      OBJETIVOS DEL CURSO:
      ${course.learningObjectives.map((obj) => `- ${obj}`).join("\n")}

      REQUERIMIENTOS DE LA EMPRESA:
      ${requirements
        .map(
          (req) => `
      - ${req.name}:
        * ${req.description}
        * Habilidades: ${req.skillsDesired.join(", ")}
      `
        )
        .join("\n")}

      Genera una lección que:
      1. Se adapte al estilo de aprendizaje del usuario
      2. Use los formatos preferidos del usuario
      3. Sea completable en el tiempo disponible
      4. Incluya ejercicios prácticos relevantes
      5. Se alinee con los objetivos del curso

      La lección debe incluir:
      1. Título descriptivo
      2. Descripción general
      3. Objetivos específicos de aprendizaje
      4. Contenido principal en formato markdown
      5. Ejercicios prácticos
      6. Recursos adicionales
      7. Tiempo estimado de completación
      8. Puntos de experiencia (exp) a ganar
    `;

    const response = await generateObject({
      model: openai("gpt-4o"),
      prompt,
      schema: z.object({
        title: z.string(),
        description: z.string(),
        learningObjectives: z.array(z.string()),
        content: z.string(),
        exercises: z.array(z.string()),
        resources: z.array(z.string()),
        estimatedTime: z.number(),
        exp: z.number().min(10).max(100),
      }),
    });

    // Crear la lección en la base de datos
    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        title: response.object.title,
        description: response.object.description,
        learningObjectives: response.object.learningObjectives,
        exp: response.object.exp,
        url: null, // Se puede agregar después si es necesario
      },
    });

    // Crear notificación para el usuario
    await prisma.notification.create({
      data: {
        userId,
        lessonId: lesson.id,
        courseId,
        title: "Nueva lección disponible",
        message: `Se ha agregado una nueva lección a tu curso: ${lesson.title}`,
        notificationType: "LessonCreated",
      },
    });

    // Crear progreso inicial para el usuario
    await prisma.userLessonProgress.create({
      data: {
        userId,
        lessonId: lesson.id,
        completed: false,
      },
    });

    return {
      ...lesson,
      content: response.object.content,
      exercises: response.object.exercises,
      resources: response.object.resources,
      estimatedTime: response.object.estimatedTime,
    };
  } catch (error: any) {
    console.error("Error creando lección con IA:", error);
    throw new Error(`Error al crear lección personalizada: ${error.message}`);
  }
}
