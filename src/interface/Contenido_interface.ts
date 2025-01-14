// interfaces/Contenido.ts
// Define el contenido educativo disponible en la plataforma.
// Content
export interface Content {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  type: LearningStyle;
  categoryId: string;
}
