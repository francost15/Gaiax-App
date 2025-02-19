'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";



interface CompleteParams {
  lessonId: string;
  score: number;
}

export async function completeLesson({ lessonId, score }: CompleteParams) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("No autorizado");

    // Primero buscamos el progreso existente
    const existingProgress = await prisma.userLessonProgress.findFirst({
      where: {
        userId: session.user.id,
        lessonId: lessonId,
      },
    });

    if (existingProgress) {
      // Si existe, actualizamos
      return await prisma.userLessonProgress.update({
        where: {
          id: existingProgress.id,
        },
        data: {
          completed: true,
          completedAt: new Date(),
        },
      });
    } else {
      // Si no existe, creamos uno nuevo
      return await prisma.userLessonProgress.create({
        data: {
          userId: session.user.id,
          lessonId: lessonId,
          completed: true,
          completedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error('Error completing lesson:', error);
    throw error;
  }
} 