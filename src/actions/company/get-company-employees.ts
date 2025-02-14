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
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return { employees };
  } catch (error: any) {
    throw new Error(`Error al obtener empleados: ${error.message}`);
  }
}
