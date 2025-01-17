"use server";

import prisma from "@/lib/prisma";

export async function getCourses() {
  return await prisma.course.findMany({
    include: { lessons: true },
  });
}
