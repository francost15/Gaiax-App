"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth.config";

const prisma = new PrismaClient();

export async function getProfileData() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        lastname: true,
        email: true,
        role: true,
        image: true,
        exp: true,
        company: {
          select: {
            name: true,
          }
        },
      }
    });

    if (!user) return null;

    return {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      company: user.company.name,
      image: user.image || "",
      exp: user.exp
    };
  } catch (error) {
    console.error("Error getting profile data:", error);
    return null;
  }
} 