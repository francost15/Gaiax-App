"use server";

import prisma from "@/lib/prisma";

export async function checkLearningPreferences(userId: string) {
  if (!userId) {
    throw new Error("userId is required");
  }

  const userPreferences = await prisma.learningPreferences.findUnique({
    where: { userId },
  });

  return !!userPreferences?.learningStyleKolb;
}
