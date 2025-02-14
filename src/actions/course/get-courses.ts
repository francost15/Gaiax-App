"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRecommendedCourses(userId: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        UserProgress: {
          none: {
            userId: userId,
          },
        },
      },
      include: {
        category: true,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.error("Error al obtener cursos recomendados:", error);
    return [];
  }
}

export async function getCoursesInProgress(userId: string) {
  try {
    const coursesInProgress = await prisma.userProgress.findMany({
      where: {
        userId: userId,
        progress: {
          lt: 100,
        },
      },
      include: {
        course: {
          include: {
            category: true,
            lessons: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return coursesInProgress;
  } catch (error) {
    console.error("Error al obtener cursos en progreso:", error);
    return [];
  }
}
