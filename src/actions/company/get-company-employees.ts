"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCompanyEmployees(companyId: string) {
  try {
    const employees = await prisma.user.findMany({
      where: {
        companyId: companyId,
        role: {
          not: "admin",
        },
      },
      include: {
        UserProgress: {
          include: {
            course: true,
            lessonsCompleted: true
          }
        },
        UserLessonProgress: {
          where: {
            completed: true
          }
        },
        learningPreferences: true
      }
    });

    const formattedEmployees = employees.map(emp => ({
      id: emp.id,
      name: emp.name,
      lastname: emp.lastname,
      email: emp.email,
      role: emp.role || 'Sin rol',
      exp: emp.exp,
      joinedDate: new Date(),
      completedCourses: emp.UserLessonProgress.length,
      totalXP: emp.exp
    }));

    return { employees: formattedEmployees };
  } catch (error: any) {
    throw new Error(`Error al obtener empleados: ${error.message}`);
  }
}
