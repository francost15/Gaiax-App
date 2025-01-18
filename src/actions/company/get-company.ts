"use server";

import prisma from "@/lib/prisma";

export async function getAllCompanies() {
  try {
    const companies = await prisma.company.findMany({
      include: { membership: true },
    });
    return companies;
  } catch (error) {
    console.log(error);
    return null;
  }
}
