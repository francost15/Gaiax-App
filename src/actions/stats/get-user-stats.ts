"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth.config";

const prisma = new PrismaClient();

export async function getUserStats() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return null;

  try {
    // Obtener estadísticas del usuario
    const stats = await prisma.$transaction(async (tx) => {
      // Cursos completados (progress = 100)
      const completedCourses = await tx.userProgress.count({
        where: {
          userId,
          progress: 100,
        },
      });

      // Cursos en progreso (0 < progress < 100)
      const coursesInProgress = await tx.userProgress.count({
        where: {
          userId,
          progress: {
            gt: 0,
            lt: 100,
          },
        },
      });

      // Tiempo total de estudio (basado en lecciones completadas)
      const completedLessons = await tx.userLessonProgress.findMany({
        where: {
          userId,
          completed: true,
          completedAt: { not: null },
        },
        select: {
          completedAt: true,
        },
      });

      // Calculamos tiempo estimado (30 minutos por lección)
      const studyTimeHours = (completedLessons.length * 30) / 60;

      return {
        completedCourses,
        coursesInProgress,
        studyTimeHours,
      };
    });

    return stats;
  } catch (error) {
    console.error("Error getting user stats:", error);
    return null;
  }
} 