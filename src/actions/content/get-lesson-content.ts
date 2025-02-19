"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getLessonContent(lessonId: string) {
  try {
    const content = await prisma.content.findMany({
      where: {
        type: {
          in: ['flashcards', 'interactive-text', 'quiz', 'video', 'code', 'practice']
        }
      },
      include: {
        category: true
      }
    });
    return content;
  } catch (error) {
    console.error("Error fetching lesson content:", error);
    return null;
  }
} 