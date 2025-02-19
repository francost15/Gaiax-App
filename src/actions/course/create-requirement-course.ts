"use server";

import { PrismaClient } from "@prisma/client";
import { createCourseWithAI } from "./create-course";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

interface RequirementData {
  name: string;
  description: string;
  categoryId: string;
  skillsDesired: string[];
  employeeIds: string[];
  companyId: string;
}

function getContentType() {
  const types = ['interactive_text', 'flashcards', 'quiz', 'video', 'podcast', 'practice'] as const;
  return types[Math.floor(Math.random() * types.length)];
}

export async function createRequirementAndCourses(data: RequirementData) {
  if (!data || !data.companyId) {
    throw new Error("Datos de requerimiento inválidos");
  }

  try {
    // Validación de categoría
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new Error("La categoría seleccionada no existe");
    }

    // 1. Crear el requerimiento
    const requirement = await prisma.requirementCompany.create({
      data: {
        name: data.name,
        description: data.description,
        category: { connect: { id: data.categoryId } },
        company: { connect: { id: data.companyId } },
        skillsDesired: data.skillsDesired,
      },
    });

    // 2. Generar contenido del curso
    const generatedContent = await createCourseWithAI(
      data.employeeIds[0],
      data.categoryId
    );

    if (!generatedContent) {
      throw new Error("No se pudo generar el contenido del curso");
    }

    if (!generatedContent.lessons || generatedContent.lessons.length === 0) {
      throw new Error("No se pudieron generar las lecciones del curso");
    }

    // 3. Crear un único curso
    const course = await prisma.course.create({
      data: {
        title: data.name,
        description: data.description,
        category: { connect: { id: data.categoryId } },
        exp: 100,
        learningObjectives: generatedContent.learningObjectives || [],
        url: null,
      },
    });

    // 4. Crear las lecciones para el curso
    for (const lessonData of generatedContent.lessons) {
      const lesson = await prisma.lesson.create({
        data: {
          title: lessonData.title,
          description: lessonData.description,
          exp: 50,
          learningObjectives: lessonData.objectives || [],
          url: null,
          course: { connect: { id: course.id } },
        },
      });
    }

    // 5. Crear progreso inicial y notificaciones para cada empleado
    for (const employeeId of data.employeeIds) {
      try {
        // Crear progreso inicial
        await prisma.userProgress.create({
          data: {
            user: { connect: { id: employeeId } },
            course: { connect: { id: course.id } },
            progress: 0,
          },
        });

        // Crear notificación
        await prisma.notification.create({
          data: {
            user: { connect: { id: employeeId } },
            title: "Nuevo curso asignado",
            message: `Se te ha asignado un nuevo curso: ${data.name}`,
            notificationType: "CourseAssigned",
            course: { connect: { id: course.id } },
            isRead: false,
          },
        });
      } catch (error) {
        console.error(`Error asignando curso al empleado ${employeeId}:`, error);
      }
    }

    revalidatePath("/admin");
    revalidatePath("/app");

    return {
      success: true,
      usersAffected: data.employeeIds.length,
      requirementId: requirement.id,
      courseId: course.id
    };
  } catch (error: any) {
    const errorMessage = error?.message || 'Error desconocido al crear el curso';
    console.error("Error en createRequirementAndCourses: " + errorMessage);
    throw new Error(errorMessage);
  }
}
