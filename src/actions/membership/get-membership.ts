"use server";

import prisma from "@/lib/prisma";

export async function getMemberships() {
  try {
    const memberships = await prisma.membership.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return memberships;
  } catch (error) {
    console.log(error);
    return [];
  }
}
