"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export const updateUserProfile = async (userId: string, password: string) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: bcrypt.hashSync(password),
      },
    });
    revalidatePath("/profile");
    return {
      ok: true,
      message: "Contraseña actualizada correctamente",
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar la contraseña del usuario",
    };
  }
};
