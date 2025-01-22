"use server";
import prisma from "@/lib/prisma";

export async function getUserAchievementsById(userId: string) {
  return prisma.userArchivement.findMany({
    where: { userId },
    orderBy: {
      date: "desc",
    },
    take: 4,
    include: {
      achievement: true,
    },
  });
}
