"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUserProfile = async (
  userId: string,
  name: string,
  lastname: string,
  email: string
) => {
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        lastname,
        email,
      },
    });
    revalidatePath("/profile");
    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al actualizar el perfil del usuario",
    };
  }
};
