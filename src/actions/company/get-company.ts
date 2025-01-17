"use server";

import prisma from "@/lib/prisma";

export async function getCompany(id: string) {
  try {
    const companies = await prisma.company.findUnique({
      where: { id },
      include: { membership: true },
    });
    return companies;
  } catch (error) {
    console.log(error);
    return null;
  }
}
