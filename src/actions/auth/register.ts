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
  isAdmin: boolean,
  role: Role,
  companyId: string,
  learningStyle: LearningStyle
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
        isAdmin: isAdmin || false,
        role: role,
        companyId: companyId,
        learningStyle: learningStyle,
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
    console.log("Error al crear usuario:", error); // Agrega este console.log para depurar
    return {
      ok: false,
      message: "No se pudo crear al usuario",
    };
  }
};
