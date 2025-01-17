"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUserProfile = async (userId: string, password: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
    revalidatePath("/profile");
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar la contraseña del usuario",
    };
  }
};
