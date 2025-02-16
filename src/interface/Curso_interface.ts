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
  category: {
    id: string;
    name: string;
    description: string;
  };
  lessons: Lesson[];
  UserProgress: {
    id: string;
    userId: string;
    courseId: string;
    progress: number;
    updatedAt: Date;
  }[];
  learningObjectives: string[];
  createdAt: Date;
  updatedAt: Date;
}
