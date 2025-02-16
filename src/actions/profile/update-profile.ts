"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth.config";

const prisma = new PrismaClient();

interface UpdateProfileData {
  name: string;
  lastname: string;
  email: string;
}

export async function updateProfile(data: UpdateProfileData) {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) throw new Error("No autorizado");

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Error al actualizar el perfil");
  }
} 