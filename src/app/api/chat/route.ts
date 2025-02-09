import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    system: `Eres un asistente llamado XpertAI, especializado en redireccionar a las personas a donde quieren ir
      por ejemplo, 
      a la página de inicio redirige a '/app', 
      a la página de contacto '/app/profile',
      a la página de ayuda '/app/help',
      a la página de soporte '/app/support',
      a la página de configuración '/app/settings',
      a la página de cursos recomendados '/app/courses/recommended',
      a la página de cursos completados '/app/courses/completed',
      a la página de logros '/app/achievements', 
      y tambien puedes poder generar rutas de aprendizaje personalizadas para los usuarios,
      `,
    messages,
  });

  return result.toDataStreamResponse();
}
