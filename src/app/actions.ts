"use server";

import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { Result } from "@/lib/types";

const prisma = new PrismaClient();

// Definición del esquema y constante para la tabla
const TABLE_NAME = `"LearningPreferences"`;
const schema = `
  model LearningPreferences {
    id                String   @id @default(uuid()) // Unique identifier
    user              User     @relation(fields: [userId], references: [id]) // Relation to User
    userId            String   @unique // User ID (unique)
    formats           String[] // Preferred learning formats
    learningStyleKolb String    // Kolb learning style
    availableTime     Int       // Time available for learning in minutes
    goals             String[]  // Learning goals
    strengths         String[]  // User strengths
    skillLevel        Int?      // Skill level (optional)
    improvementAreas  String[]  // Areas for improvement
  }
`;

/**
 * Genera una consulta SQL segura a partir de un input en lenguaje natural.
 */
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
