"use server";

import prisma from "@/lib/prisma";

export async function getUserLessonProgress(userId: string) {
  return await prisma.userLessonProgress.findMany({
    where: { userId },
  });
}
