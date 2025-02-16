"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRecommendedCourses(userId: string) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        category: true,
        UserProgress: {
          where: {
            userId: userId
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new Error('No se pudieron cargar los cursos');
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
