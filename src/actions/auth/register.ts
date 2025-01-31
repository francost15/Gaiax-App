"use server";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";
import { LearningStyle, Role } from "@/interface";

export const registerUser = async (
  name: string,
  lastname: string,
  email: string,
  password: string,
  streaks: number,
  exp: number,
  role: Role,
  companyId: string,
  learningPreferences: {
    formats: string[];
    learningStyleKolb: string;
    availableTime: number;
    goals: string[];
    strengths: string[];
    skillLevel?: number;
    improvementAreas: string[];
  }
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        lastname: lastname,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
        streaks: streaks || 0,
        exp: exp || 0,
        role: role,
        companyId: companyId,
        learningPreferences: {
          create: {
            formats: learningPreferences.formats || [],
            learningStyleKolb: learningPreferences.learningStyleKolb || "",
            availableTime: learningPreferences.availableTime || 0,
            goals: learningPreferences.goals || [],
            strengths: learningPreferences.strengths || [],
            skillLevel: learningPreferences.skillLevel || 0,
            improvementAreas: learningPreferences.improvementAreas || [],
          },
        },
        UserArchivement: {
          create: [],
        },
        UserProgress: {
          create: [],
        },
        UserLessonProgress: {
          create: [],
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.log(
      "Error al crear usuario:",
      error instanceof Error ? error.message : String(error)
    ); // Manejo de error mejorado
    return {
      ok: false,
      message: "No se pudo crear al usuario",
    };
  }
};
