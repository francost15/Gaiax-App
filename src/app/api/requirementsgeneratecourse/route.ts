import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    messages: [
      {
        role: 'system',
        content: `Eres un asistente especializado en crear requerimientos de capacitación.
        IMPORTANTE: Debes responder SIEMPRE en formato JSON válido.
        
        Según el tipo de solicitud, responde con uno de estos formatos:
        
        1. Para nombres:
        {"name": "nombre del requerimiento"}
        
        2. Para descripciones:
        {"description": "descripción detallada"}
        
        3. Para habilidades:
        {"skills": ["habilidad1", "habilidad2", "habilidad3"]}
        
        Ejemplos de respuestas válidas:
        - {"name": "Desarrollo Full Stack con React y Node.js"}
        - {"description": "Programa intensivo diseñado para desarrolladores que buscan dominar el stack completo..."}
        - {"skills": ["React.js", "Node.js", "TypeScript", "Git", "APIs RESTful"]}
        
        NO incluyas explicaciones adicionales, SOLO el objeto JSON.`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.4,
  });

  return result.toDataStreamResponse();
}
