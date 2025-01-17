"use server";

import prisma from "@/lib/prisma";

export async function getUserProgress(userId: string) {
  return await prisma.userProgress.findMany({
    where: { userId },
  });
}
