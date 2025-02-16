"use server";

import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { generateObject } from "ai";

const lessonSchema = z.object({
  title: z.string(),
  description: z.string(),
  objectives: z.array(z.string()),
});

const courseSchema = z.object({
  learningObjectives: z.array(z.string()),
  lessons: z.array(lessonSchema).length(5),
});

export async function createCourseWithAI(userId: string, categoryId: string) {
  try {
    const response = await generateObject({
      model: openai("gpt-4o"),
      schema: courseSchema,
      prompt: `Genera un curso con exactamente 5 lecciones. Incluye:
      1. Objetivos de aprendizaje generales del curso (3-5 objetivos)
      2. Exactamente 5 lecciones, cada una con:
         - Título claro y conciso
         - Descripción detallada del contenido
         - 3-5 objetivos específicos de aprendizaje
      
      El curso debe ser estructurado y progresivo.
      IMPORTANTE: Asegúrate de generar EXACTAMENTE 5 lecciones.
      Responde SOLO con el objeto JSON que cumpla el schema.`,
      temperature: 0.7,
    });

    if (!response?.object) {
      throw new Error("No se pudo generar el contenido del curso");
    }

    if (response.object.lessons.length !== 5) {
      throw new Error("El curso debe tener exactamente 5 lecciones");
    }

    return response.object;
  } catch (error: any) {
    console.error("Error en createCourseWithAI:", error);
    throw new Error(`Error generando contenido del curso: ${error.message}`);
  }
}
