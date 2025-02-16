"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function searchCourses(searchTerm: string) {
  try {
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
      include: {
        category: true,
        UserProgress: true,
        lessons: {
          include: {
            UserLessonProgress: true
          }
        },
      },
      take: 5, // Limitamos a 5 resultados para mejor rendimiento
    });

    return courses;
  } catch (error) {
    console.error('Error searching courses:', error);
    return [];
  }
} 