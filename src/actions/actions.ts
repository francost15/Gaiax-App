"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { Result } from "@/interface";
import { Lesson, LessonContent } from "@/interfaces/Lesson.interface";

const prisma = new PrismaClient();

const TABLE_NAME = `"LearningPreferences"`;

// Schema para validar el contenido de la lección
const lessonContentSchema = z.object({
  content: z.array(z.object({
    type: z.enum(['interactive_text', 'flashcards', 'quiz']),
    data: z.object({
      text: z.union([
        z.string(),
        z.object({
          text: z.string(),
          highlights: z.array(z.object({
            word: z.string(),
            explanation: z.string()
          }))
        })
      ]).optional(),
      cards: z.array(z.object({
        id: z.string(),
        front: z.string(),
        back: z.string()
      })).optional(),
      questions: z.array(z.object({
        id: z.string(),
        question: z.string(),
        options: z.array(z.string()),
        correctAnswer: z.number(),
        explanation: z.string()
      })).optional()
    })
  }))
});

export const generateQuery = async (input: string) => {
  "use server";

  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: `
    You are a SQL (Postgres) and data visualization expert. Your job is to help the user write a secure SQL query to retrieve data from the LearningPreferences table. The table schema is as follows:

LearningPreferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Unique identifier
  userId VARCHAR UNIQUE, -- User ID (unique)
  formats TEXT[] NOT NULL, -- Preferred learning formats
  learningStyleKolb VARCHAR NOT NULL, -- Kolb learning style
  availableTime INT NOT NULL, -- Time available for learning in minutes
  goals TEXT[] NOT NULL, -- Learning goals
  strengths TEXT[] NOT NULL, -- User strengths
  skillLevel INT, -- Skill level (optional)
  improvementAreas TEXT[] NOT NULL -- Areas for improvement
)

Only retrieval queries are allowed.

For string fields (formats, goals, strengths, improvementAreas, learningStyleKolb), use the ILIKE operator and convert both the search term and the field to lowercase using the LOWER() function. For example: LOWER(formats) ILIKE LOWER('%search_term%').

For queries involving array fields, use LATERAL UNNEST to handle them properly. Below are some updated examples of best practice queries:

1. Count by userId:
   SELECT "userId" AS "User ID", COUNT("userId") AS "User Count"
   FROM public."LearningPreferences"
   GROUP BY "userId";

2. Count by learningStyleKolb:
   SELECT "learningStyleKolb" AS "Learning Style", COUNT("learningStyleKolb") AS "Style Count"
   FROM public."LearningPreferences"
   GROUP BY "learningStyleKolb";

3. Count by availableTime:
   SELECT "availableTime" AS "Available Time (Minutes)", COUNT("availableTime") AS "Count"
   FROM public."LearningPreferences"
   GROUP BY "availableTime";

4. Count by skillLevel:
   SELECT "skillLevel" AS "Skill Level", COUNT("skillLevel") AS "Level Count"
   FROM public."LearningPreferences"
   GROUP BY "skillLevel";

5. Count by formats (using UNNEST):
   SELECT t.format AS "Format", COUNT(*) AS "Format Count"
   FROM public."LearningPreferences", LATERAL UNNEST("formats") AS t(format)
   GROUP BY t.format;

6. Count by goals (using UNNEST):
   SELECT t.goal AS "Goal", COUNT(*) AS "Goal Count"
   FROM public."LearningPreferences", LATERAL UNNEST("goals") AS t(goal)
   GROUP BY t.goal;

7. Count by strengths (using UNNEST):
   SELECT t.strength AS "Strength", COUNT(*) AS "Strength Count"
   FROM public."LearningPreferences", LATERAL UNNEST("strengths") AS t(strength)
   GROUP BY t.strength;

8. Count by improvementAreas (using UNNEST):
   SELECT t.area AS "Improvement Area", COUNT(*) AS "Area Count"
   FROM public."LearningPreferences", LATERAL UNNEST("improvementAreas") AS t(area)
   GROUP BY t.area;

Additional Guidelines:
- Always use double quotes for table and column names (e.g., SELECT * FROM "LearningPreferences").
- Include at least two columns in the output for data visualization (for example, field and its count).
- If the user requests data from a single column, also return the count of values in that column.
- Return only a JSON object with a single key "query" containing the SQL query, and nothing else.
- Adapt your generated SQL query according to the user's request while ensuring that the output is suitable for data visualization.
      `,
      prompt: `Generate the query to retrieve the data the user needs: ${input}`,
      schema: z.object({
        query: z.string(),
      }),
    });

    console.log("Generated query:", result);
    return result.object.query;
  } catch (error: any) {
    console.error("Error generating query:", error.message);
    throw new Error("Failed to generate query");
  }
};

/**
 * Ejecuta una consulta SQL generada, asegurándose de que sea segura.
 */
export const runGeneratedSQLQuery = async (query: string) => {
  "use server";

  // Validar que sea una consulta SELECT segura
  const isSelectQuery =
    query.trim().toLowerCase().startsWith("select") &&
    !/drop|delete|insert|update|alter|truncate|create|grant|revoke/i.test(
      query
    );

  if (!isSelectQuery) {
    throw new Error("Only SELECT queries are allowed");
  }

  try {
    const data = await prisma.$queryRawUnsafe(query);
    return data as Result[];
  } catch (error: any) {
    console.error("Error running query:", error.message);

    if (
      error.message.includes(
        `relation ${TABLE_NAME.toLowerCase()} does not exist`
      )
    ) {
      console.error(
        `The table "${TABLE_NAME}" does not exist. Ensure you have run the migrations (e.g., \`npx prisma migrate dev\`) and the table name uses double quotes.`
      );
    }

    throw error;
  }
};

/**
 * Genera contenido de lecciones personalizadas utilizando AI.
 */
export const generateLessonContent = async (
  lesson: Lesson,
  userPreferences: any,
  companyRequirements: any
) => {
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: "Eres un experto en educación que genera contenido adaptativo en formato JSON válido.",
      prompt: `
        Genera contenido educativo personalizado basado en:

        DATOS DEL CURSO:
        Título: ${lesson.course.title}
        Descripción: ${lesson.course.description}

        DATOS DE LA LECCIÓN:
        Título: ${lesson.title}
        Descripción: ${lesson.description}
        Objetivos: ${lesson.learningObjectives.join(", ")}

        PERFIL DEL USUARIO:
        - Estilo de aprendizaje: ${userPreferences.learningStyleKolb}
        - Fortalezas: ${userPreferences.strengths.join(", ")}
        - Áreas de mejora: ${userPreferences.improvementAreas.join(", ")}
        - Formatos preferidos: ${userPreferences.formats.join(", ")}
        - Tiempo disponible: ${userPreferences.availableTime} minutos
        - Metas: ${userPreferences.goals.join(", ")}
        
        REQUERIMIENTOS DE LA EMPRESA:
        ${companyRequirements.map((req: any) => req.name).join(", ")}

        Genera el contenido siguiendo esta estructura exacta para LessonContent[]:
        [
          {
            "type": "interactive_text",
            "data": { ... }
          },
          {
            "type": "flashcards",
            "data": { ... }
          },
          {
            "type": "quiz",
            "data": { ... }
          }
        ]`,
      schema: lessonContentSchema,
      temperature: 0.7,
    });

    return result.object.content;
  } catch (error: any) {
    console.error("Error generando contenido:", error);
    throw new Error(`Error generando contenido: ${error.message}`);
  }
};

/**
 * Recopila datos del usuario y de la empresa.
 */
export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      learningPreferences: true,
      company: {
        include: {
          requirements: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (!user.company) {
    throw new Error("Usuario no tiene una empresa asociada");
  }

  return user;
};

/**
 * Crea un curso.
 */
export const createCourse = async (
  title: string,
  description: string,
  categoryId: string
) => {
  const newCourse = await prisma.course.create({
    data: {
      title,
      description,
      category: { connect: { id: categoryId } },
      exp: 0, // Add a default value for the exp property
    },
  });
  return newCourse;
};

/**
 * Genera y crea lecciones.
 */
export const generateAndCreateLessons = async (courseId: string, userData: any, topic: string) => {
  try {
    // Primero crear la lección básica
    const basicLesson = await prisma.lesson.create({
      data: {
        courseId,
        title: `Lección sobre ${topic}`,
        description: topic,
        exp: 0,
      },
      include: {
        course: true
      }
    });

    // Luego generar el contenido
    const lessonContent = await generateLessonContent(
      {
        ...basicLesson,
        content: [],
        course: {
          title: basicLesson.course.title,
          description: basicLesson.course.description
        }
      },
      userData.learningPreferences,
      userData.company.requirements
    );

    // Actualizar la lección con el contenido
    return await prisma.lesson.update({
      where: { id: basicLesson.id },
      data: {
        description: JSON.stringify(lessonContent)
      }
    });
  } catch (error: any) {
    console.error("Error detallado:", error);
    throw new Error(error.message || "Error desconocido generando la lección");
  }
};

/**
 * Implementación completa para crear un curso personalizado.
 */
export const createPersonalizedCourse = async (
  userId: string,
  courseTitle: string,
  courseDescription: string,
  categoryId: string,
  topics: string[]
) => {
  try {
    // Validar que exista el usuario y sus datos
    const userData = await getUserData(userId);
    if (!userData) {
      throw new Error("Usuario no encontrado");
    }

    // Validar que exista la categoría
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      throw new Error("Categoría no encontrada");
    }

    // Crear el curso
    const course = await createCourse(
      courseTitle,
      courseDescription,
      categoryId
    );

    // Generar y crear lecciones para cada tema
    const lessonPromises = topics.map((topic) =>
      generateAndCreateLessons(course.id, userData, topic)
    );

    await Promise.all(lessonPromises);

    return course;
  } catch (error: any) {
    console.error("Error creating personalized course:", error);
    throw new Error(`Error al crear el curso personalizado: ${error.message}`);
  }
};
