"use server";
import prisma from "@/lib/prisma";

interface Company {
  name: string;
  id: string;
  // ... otros campos que tu modelo defina
}

export async function getCompanyById(
  companyId: string
): Promise<Company | null> {
  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });
    return company;
  } catch (error) {
    console.error("Error al obtener la compañía:", error);
    return null;
  }
}
