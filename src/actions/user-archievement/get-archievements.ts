"use server";
import prisma from "@/lib/prisma";

export async function getAllAchievements(userId: string) {
  return prisma.userArchivement.findMany({
    where: { userId },
    orderBy: {
      date: "desc",
    },
    include: {
      achievement: true,
    },
  });
}
