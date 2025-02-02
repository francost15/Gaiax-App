"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface UpdateTest {
  userId?: string;
  availableTime?: number;
  formats?: string[];
  learningStyleKolb?: string;
  skillLevel?: number;
  improvementAreas?: string[];
  goals?: string[];
}

export const updateTestResponses = async ({
  userId,
  availableTime,
  formats,
  learningStyleKolb,
  skillLevel,
  improvementAreas,
  goals,
}: UpdateTest): Promise<{ ok: boolean; message?: string; data?: any }> => {
  if (!userId) {
    return {
      ok: false,
      message: "userId es requerido para actualizar las respuestas del test",
    };
  }

  // Construir updateData solo con las propiedades que se proporcionan
  const updateData: Record<string, any> = {};
  if (availableTime !== undefined) updateData.availableTime = availableTime;
  if (formats !== undefined) updateData.formats = formats;
  if (learningStyleKolb !== undefined)
    updateData.learningStyleKolb = learningStyleKolb;
  if (skillLevel !== undefined) updateData.skillLevel = skillLevel;
  if (improvementAreas !== undefined)
    updateData.improvementAreas = improvementAreas;
  if (goals !== undefined) updateData.goals = goals;

  console.log("updateTestResponses - Datos a guardar:", updateData);
  console.log(
    "updateTestResponses - Intentando upsert learningPreferences para userId:",
    userId
  );

  try {
    // Usar upsert para actualizar o crear el registro de learningPreferences
    const result = await prisma.learningPreferences.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        availableTime: updateData.availableTime ?? 0,
        formats: updateData.formats ?? [],
        learningStyleKolb: updateData.learningStyleKolb ?? "",
        skillLevel: updateData.skillLevel ?? null,
        improvementAreas: updateData.improvementAreas ?? [],
        goals: updateData.goals ?? [],
        strengths: [], // Campo requerido en el schema
      },
    });
    console.log("updateTestResponses - Resultado de upsert exitosa:", result);

    // Revalidar la ruta
    revalidatePath("/app/test");
    console.log(
      "updateTestResponses - Ruta /app/test revalidada correctamente."
    );

    return { ok: true, data: result };
  } catch (error: unknown) {
    // Forzamos error a objeto no nulo
    const errObj =
      error !== null && typeof error === "object"
        ? error
        : { message: "Error desconocido, valor null" };
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      "updateTestResponses - Error al actualizar las respuestas:",
      errObj || {}
    );
    console.log("updateTestResponses - Datos enviados:", updateData);
    return {
      ok: false,
      message: `Error al actualizar las respuestas del test: ${errorMessage}. Datos enviados: ${JSON.stringify(
        updateData
      )}`,
      data: updateData,
    };
  }
};
