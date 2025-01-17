"use server";

import prisma from "@/lib/prisma";

export async function getUserAchievements(userId: string) {
  return await prisma.userArchivement.findMany({
    where: { userId },
  });
}
