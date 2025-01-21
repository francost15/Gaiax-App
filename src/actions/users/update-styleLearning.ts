"use server";
import { LearningStyle } from "@/interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateUserStyleLearning = async (
  userId: string,
  learningStyle: LearningStyle
) => {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { learningStyle },
    });
    revalidatePath("/app");
    return {
      ok: true,
      message: "Estilo de aprendizaje actualizado correctamente",
    };
  } catch (error) {
    console.error("Error al actualizar el estilo de aprendizaje:", error);
    return {
      ok: false,
      message: "Error al actualizar el estilo de aprendizaje",
    };
  }
};
