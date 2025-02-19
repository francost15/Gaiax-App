import { z } from 'zod';

export const contentSchema = z.object({
  content: z.array(z.object({
    type: z.enum(['interactive_text', 'flashcards', 'quiz', 'video', 'podcast', 'practice']),
    data: z.object({
      text: z.object({
        text: z.string(),
        highlights: z.array(z.object({
          word: z.string(),
          explanation: z.string()
        }))
      }).optional(),
      cards: z.array(z.object({
        term: z.string(),
        definition: z.string()
      })).optional()
      // ... resto del schema
    })
  }))
}); 