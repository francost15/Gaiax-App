"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCourseDetail(courseId: string, userId: string) {
  if (!courseId || !userId) {
    throw new Error("Se requieren courseId y userId");
  }

  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        category: true,
        lessons: {
          include: {
            UserLessonProgress: {
              where: { userId },
            },
          },
        },
        UserProgress: {
          where: { userId },
        },
      },
    });

    if (!course) {
      throw new Error("Curso no encontrado");
    }

    return course;
  } catch (error) {
    console.error("Error obteniendo detalles del curso:", error);
    throw error;
  }
}
