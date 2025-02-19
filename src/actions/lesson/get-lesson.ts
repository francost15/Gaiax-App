"use server";

import prisma from "@/lib/prisma";
import { Lesson } from "@/interfaces/Lesson.interface";
import { generateLessonContent } from "@/actions/actions";

export async function getLesson(lessonId: string, userId: string): Promise<Lesson | null> {
  try {
    // Obtener la lección y datos del usuario
    const [lesson, userData] = await Promise.all([
      prisma.lesson.findUnique({
        where: { id: lessonId },
        include: {
          course: true,
          content: true
        }
      }),
      prisma.user.findUnique({
        where: { id: userId },
        include: {
          learningPreferences: true,
          company: {
            include: {
              requirements: true
            }
          }
        }
      })
    ]);

    if (!lesson || !userData) return null;

    // Generar contenido adaptativo
    const adaptedContent = await generateLessonContent(
      {
        ...lesson,
        content: [],
        course: {
          title: lesson.course.title,
          description: lesson.course.description
        }
      },
      userData.learningPreferences,
      userData.company.requirements
    );

    return {
      ...lesson,
      content: adaptedContent.map(content => ({
        type: content.type,
        data: {
          text: typeof content.data.text === 'string' 
            ? { text: content.data.text, highlights: [] }
            : content.data.text,
          cards: content.data.cards,
          questions: content.data.questions
        }
      })),
      course: {
        title: lesson.course.title,
        description: lesson.course.description
      }
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}