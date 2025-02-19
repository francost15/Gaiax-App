import OpenAI from "openai";
import { Lesson, LessonContent } from "@/interfaces/Lesson.interface";
import { LearningPreferences } from "@prisma/client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateContentParams {
  lesson: Lesson;
  preferences: LearningPreferences | null;
}

export async function generateLessonContent({ 
  lesson, 
  preferences 
}: GenerateContentParams): Promise<LessonContent[]> {
  const prompt = `
    Como experto en educación, genera contenido adaptativo para esta lección:

    CONTEXTO DEL CURSO:
    Título del curso: ${lesson.course.title}
    Descripción del curso: ${lesson.course.description}

    LECCIÓN ACTUAL:
    Título: ${lesson.title}
    Descripción: ${lesson.description}
    Objetivos de aprendizaje:
    ${lesson.learningObjectives.map(obj => `- ${obj}`).join('\n')}

    PERFIL DEL ESTUDIANTE:
    Estilo de aprendizaje: ${preferences?.learningStyleKolb || 'visual'}
    Nivel de habilidad: ${preferences?.skillLevel || 1}/5
    Tiempo disponible: ${preferences?.availableTime || 30} minutos
    Formatos preferidos: ${preferences?.formats?.join(', ') || 'texto interactivo'}
    Objetivos personales: ${preferences?.goals?.join(', ') || 'no especificados'}

    Genera el contenido en el siguiente formato JSON:
    {
      "content": [
        {
          "type": "interactive_text",
          "data": {
            "text": {
              "text": "Contenido principal...",
              "highlights": [
                {
                  "word": "concepto clave",
                  "explanation": "explicación del concepto"
                }
              ]
            }
          }
        },
        {
          "type": "flashcards",
          "data": {
            "cards": [
              {
                "id": "1",
                "front": "Concepto",
                "back": "Explicación"
              }
            ]
          }
        },
        {
          "type": "quiz",
          "data": {
            "questions": [
              {
                "id": "1",
                "question": "Pregunta...",
                "options": ["Opción 1", "Opción 2", "Opción 3"],
                "correctAnswer": 0,
                "explanation": "Explicación de la respuesta correcta"
              }
            ]
          }
        }
      ]
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Eres un experto en educación que genera contenido adaptativo en formato JSON válido."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" } // Asegura respuesta en JSON
    });

    const content = completion.choices[0].message?.content;
    return processOpenAIResponse(content, lesson);
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    return getDefaultContent(lesson);
  }
}

function processOpenAIResponse(content: string | null, lesson: Lesson): LessonContent[] {
  if (!content) return getDefaultContent(lesson);
  
  try {
    const parsed = JSON.parse(content);
    return parsed.content;
  } catch (error) {
    console.error("Error parsing OpenAI response:", error);
    return getDefaultContent(lesson);
  }
}

function getDefaultContent(lesson: Lesson): LessonContent[] {
  return [
    {
      type: 'interactive_text',
      data: {
        text: {
          text: `
            ${lesson.title}
            
            ${lesson.description}
            
            Objetivos de aprendizaje:
            ${lesson.learningObjectives.map(obj => `• ${obj}`).join('\n')}
          `,
          highlights: lesson.learningObjectives.map((obj, index) => ({
            word: `Objetivo ${index + 1}`,
            explanation: obj
          }))
        }
      }
    },
    {
      type: 'flashcards',
      data: {
        cards: lesson.learningObjectives.map((obj, index) => ({
          id: index.toString(),
          front: `Objetivo de aprendizaje ${index + 1}`,
          back: obj
        }))
      }
    },
    {
      type: 'quiz',
      data: {
        questions: [
          {
            id: '1',
            question: `¿Cuál es el objetivo principal de ${lesson.title}?`,
            options: [
              lesson.description,
              'No es relevante',
              'Ninguna de las anteriores'
            ],
            correctAnswer: 0,
            explanation: lesson.description
          }
        ]
      }
    }
  ];
} 