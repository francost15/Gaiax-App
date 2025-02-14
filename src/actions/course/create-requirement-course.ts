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
        category: {
          connect: { id: data.categoryId },
        },
        company: {
          connect: { id: data.companyId },
        },
        skillsDesired: data.skillsDesired,
      },
    });

    console.log("Requerimiento creado:", requirement);

    // 2. Crear cursos para cada empleado
    let createdCourses = [];

    for (const employeeId of data.employeeIds) {
      try {
        // Generar contenido del curso con IA
        const generatedContent = await createCourseWithAI(
          employeeId,
          data.categoryId
        );

        if (generatedContent) {
          // Crear el curso
          const course = await prisma.course.create({
            data: {
              title: `${data.name} - Curso personalizado`,
              description: data.description,
              category: {
                connect: { id: data.categoryId },
              },
              exp: 100,
              learningObjectives: generatedContent.learningObjectives || [],
              url: null,
            },
          });

          // Crear las lecciones (si existen)
          if (generatedContent.lessons && generatedContent.lessons.length > 0) {
            for (const lessonData of generatedContent.lessons) {
              await prisma.lesson.create({
                data: {
                  title: lessonData.title,
                  description: lessonData.description,
                  exp: 50,
                  learningObjectives: lessonData.objectives || [],
                  url: null,
                  course: {
                    connect: { id: course.id },
                  },
                },
              });
            }
          }

          // Crear progreso inicial para el usuario
          await prisma.userProgress.create({
            data: {
              user: {
                connect: { id: employeeId },
              },
              course: {
                connect: { id: course.id },
              },
              progress: 0,
            },
          });

          // Crear notificación
          await prisma.notification.create({
            data: {
              user: {
                connect: { id: employeeId },
              },
              title: "Nuevo curso asignado",
              message: `Se te ha asignado un nuevo curso: ${data.name}`,
              notificationType: "CourseAssigned",
              course: {
                connect: { id: course.id },
              },
              isRead: false,
            },
          });

          createdCourses.push(course);
        }
      } catch (error) {
        console.error(
          `Error creando curso para empleado ${employeeId}:`,
          error
        );
      }
    }

    // Revalidar la página
    revalidatePath("/admin");
    revalidatePath("/app");

    return {
      success: true,
      usersAffected: createdCourses.length,
      requirementId: requirement.id,
    };
  } catch (error: any) {
    console.error("Error en createRequirementAndCourses:", error);
    throw new Error(`Error al crear cursos: ${error.message}`);
  }
}
