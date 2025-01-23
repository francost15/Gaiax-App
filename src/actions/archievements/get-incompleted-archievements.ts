"use server";
import prisma from "@/lib/prisma";

export async function getIncompleteAchievements(userId: string) {
  const completedAchievements = await prisma.userArchivement.findMany({
    where: { userId },
    select: {
      achievementId: true,
    },
  });

  const completedAchievementIds = completedAchievements.map(
    (achievement) => achievement.achievementId
  );

  return prisma.achievement.findMany({
    where: {
      id: {
        notIn: completedAchievementIds,
      },
    },
  });
}
