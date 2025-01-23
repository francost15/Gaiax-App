"use server";
import prisma from "@/lib/prisma";

export async function getCompletedCoursesByUser(userId: string) {
  return prisma.userProgress.findMany({
    where: {
      userId,
      progress: 100, // Asumiendo que el progreso del curso completado es 100%
    },
    include: {
      course: {
        include: {
          category: true,
        },
      },
    },
  });
}
