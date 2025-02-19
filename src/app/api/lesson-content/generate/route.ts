import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getUserPreferences } from "@/actions/user/get-preferences";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { lesson, userId } = await req.json();
    const preferences = await getUserPreferences(userId);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un experto en educación que genera contenido adaptativo."
        },
        {
          role: "user",
          content: `
            Genera contenido educativo personalizado basado en:
            
            DATOS DEL CURSO:
            ${JSON.stringify(lesson.course, null, 2)}
            
            LECCIÓN:
            ${JSON.stringify(lesson, null, 2)}
            
            PREFERENCIAS:
            ${JSON.stringify(preferences, null, 2)}
          `
        }
      ],
      temperature: 0.7
    });

    const content = completion.choices[0].message?.content;
    return NextResponse.json({ content: JSON.parse(content || "[]") });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
} 