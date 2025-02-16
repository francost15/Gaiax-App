"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth.config";

const prisma = new PrismaClient();

export async function getActivityData(period: 'week' | 'month' | 'year' = 'week') {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return [];

  try {
    // Definir el rango de fechas según el periodo
    const now = new Date();
    const startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Obtener lecciones completadas en el periodo
    const completedLessons = await prisma.userLessonProgress.findMany({
      where: {
        userId,
        completed: true,
        completedAt: {
          gte: startDate,
          lte: now,
        },
      },
      select: {
        completedAt: true,
      },
      orderBy: {
        completedAt: 'asc',
      },
    });

    // Agrupar por día
    const activityByDay = completedLessons.reduce((acc, lesson) => {
      const date = lesson.completedAt?.toISOString().split('T')[0] ?? '';
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convertir a formato esperado por el gráfico
    const activityData = Object.entries(activityByDay).map(([date, value]) => ({
      date,
      value,
    }));

    return activityData;
  } catch (error) {
    console.error("Error getting activity data:", error);
    return [];
  }
} 