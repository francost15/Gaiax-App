import { generateLessonContent } from '@/utils/openai';
import { getUserPreferences } from '@/actions/user/get-preferences';
import { NextResponse } from 'next/server';
import { Lesson } from '@/interfaces/Lesson.interface';

export const maxDuration = 30;

interface RequestBody {
  lesson: Lesson;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const { lesson, userId } = await req.json() as RequestBody;

    if (!userId || !lesson) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Obtener preferencias del usuario
    const preferences = await getUserPreferences(userId);
    
    // Generar contenido adaptativo
    const content = await generateLessonContent({
      lesson,
      preferences
    });

    return NextResponse.json(content);

  } catch (error) {
    console.error('Error generando contenido:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 