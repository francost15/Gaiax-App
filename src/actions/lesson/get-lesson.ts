"use server";

import prisma from "@/lib/prisma";

export async function getLessons(courseId: string) {
  return await prisma.lesson.findMany({
    where: { courseId },
  });
}
