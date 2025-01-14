// interfaces/Curso.ts
// Representa un curso compuesto por varias lecciones.

import { Lesson } from "./Leccion_interface";
import { UserProgress } from "./ProgresoUsuario_interface";

// Course
export interface Course {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  categoryId: string;
  lessons: Lesson[];
  UserProgress: UserProgress[];
}
