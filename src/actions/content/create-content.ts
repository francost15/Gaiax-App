"use server";

import { PrismaClient } from "@prisma/client";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";

const prisma = new PrismaClient();

// Interfaces para tipar los datos
interface ContentPreferences {
  skillLevel: number;
  learningStyleKolb: string;
  formats: string[];
  availableTime: number;
}

interface CompanyRequirement {
  name: string;
  description: string;
  skillsDesired: string[];
  category: {
    id: string;
    name: string;
  };
}

/**
 * Obtiene las preferencias del usuario y requerimientos de la empresa
 */
async function getContentContextData(userId: string, categoryId: string) {
  const userData = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      learningPreferences: true,
      company: {
        include: {
          requirements: {
            where: { categoryId },
            include: { category: true },
          },
        },
      },
    },
  });

  if (!userData?.learningPreferences) {
    throw new Error("Preferencias de aprendizaje no encontradas");
  }

  if (!userData?.company?.requirements.length) {
    throw new Error("No hay requerimientos para esta categoría");
  }

  return {
    preferences: userData.learningPreferences,
    requirements: userData.company.requirements,
  };
}

/**
 * Genera y crea nuevo contenido personalizado usando IA
 */
export async function createContentWithAI(
  userId: string,
  categoryId: string,
  contentType: string,
  topic: string
) {
  try {
    const { preferences, requirements } = await getContentContextData(
      userId,
      categoryId
    );

    const prompt = `
      Genera contenido educativo sobre "${topic}" considerando:

      FORMATO Y CONTEXTO:
      - Tipo de contenido: ${contentType}
      - Categoría: ${requirements[0].category.name}

      PERFIL DEL USUARIO:
      - Nivel: ${preferences.skillLevel}/5
      - Estilo de aprendizaje: ${preferences.learningStyleKolb}
      - Formatos preferidos: ${preferences.formats.join(", ")}
      - Tiempo disponible: ${preferences.availableTime} minutos

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

      Genera contenido que:
      1. Sea específico para el formato ${contentType}
      2. Se adapte al estilo de aprendizaje del usuario
      3. Sea completable en el tiempo disponible
      4. Cumpla con los requerimientos de la empresa
      5. Sea práctico y aplicable

      El contenido debe incluir:
      1. Título llamativo
      2. Descripción clara
      3. Contenido principal
      4. Recursos relacionados (URLs, referencias)
      5. Tiempo estimado de consumo
      6. Puntos de experiencia (exp) a ganar
    `;

    const response = await generateObject({
      model: openai("gpt-4"),
      prompt,
      schema: z.object({
        title: z.string(),
        description: z.string(),
        content: z.string(),
        resources: z.array(z.string()),
        estimatedTime: z.number(),
        exp: z.number().min(5).max(50),
        suggestedUrl: z.string().optional(),
      }),
    });

    // Crear el contenido en la base de datos
    const content = await prisma.content.create({
      data: {
        title: response.object.title,
        description: response.object.description,
        type: contentType,
        categoryId,
        exp: response.object.exp,
        url: response.object.suggestedUrl || null,
      },
    });

    // Crear notificación para el usuario
    await prisma.notification.create({
      data: {
        userId,
        title: "Nuevo contenido disponible",
        message: `Se ha agregado nuevo contenido de ${contentType}: ${content.title}`,
        notificationType: "ContentCreated",
      },
    });

    return {
      ...content,
      content: response.object.content,
      resources: response.object.resources,
      estimatedTime: response.object.estimatedTime,
    };
  } catch (error: any) {
    console.error("Error creando contenido con IA:", error);
    throw new Error(`Error al crear contenido personalizado: ${error.message}`);
  }
}

/**
 * Actualiza contenido existente con IA basado en feedback
 */
export async function updateContentWithAI(
  contentId: string,
  userId: string,
  feedback: string
) {
  try {
    const content = await prisma.content.findUnique({
      where: { id: contentId },
      include: {
        category: true,
      },
    });

    if (!content) {
      throw new Error("Contenido no encontrado");
    }

    const { preferences } = await getContentContextData(
      userId,
      content.categoryId
    );

    const prompt = `
      Mejora el siguiente contenido basado en el feedback:
      
      CONTENIDO ACTUAL:
      Título: ${content.title}
      Descripción: ${content.description}
      Tipo: ${content.type}
      
      FEEDBACK RECIBIDO:
      ${feedback}
      
      PERFIL DEL USUARIO:
      - Nivel: ${preferences.skillLevel}/5
      - Estilo de aprendizaje: ${preferences.learningStyleKolb}
      
      Genera una versión mejorada que:
      1. Aborde el feedback recibido
      2. Mantenga el formato y tipo de contenido
      3. Se adapte mejor al usuario
    `;

    const response = await generateObject({
      model: openai("gpt-4o"),
      prompt,
      schema: z.object({
        title: z.string(),
        description: z.string(),
        content: z.string(),
        suggestedUrl: z.string().optional(),
      }),
    });

    // Actualizar el contenido
    const updatedContent = await prisma.content.update({
      where: { id: contentId },
      data: {
        title: response.object.title,
        description: response.object.description,
        url: response.object.suggestedUrl || content.url,
      },
    });

    return {
      ...updatedContent,
      content: response.object.content,
    };
  } catch (error: any) {
    console.error("Error actualizando contenido con IA:", error);
    throw new Error(`Error al actualizar contenido: ${error.message}`);
  }
}
