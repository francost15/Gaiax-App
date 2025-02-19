"use server";

import prisma from '@/lib/prisma';
import { LearningPreferences } from "@prisma/client";

export async function getUserPreferences(userId: string): Promise<LearningPreferences | null> {
  try {
    console.log('Buscando preferencias para usuario:', userId);
    const preferences = await prisma.learningPreferences.findUnique({
      where: { userId }
    });
    console.log('Preferencias encontradas:', preferences);
    return preferences;
  } catch (error) {
    console.error('Error obteniendo preferencias:', error);
    return null;
  }
} 