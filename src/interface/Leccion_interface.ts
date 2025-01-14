// interfaces/Leccion.ts
// Define una lección individual dentro de un curso.

import { UserLessonProgress } from "./Usuario_leccion_progreso_interface";

// Lesson
export interface Lesson {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  courseId: string;
  userProgressId?: string | null;
  UserLessonProgress: UserLessonProgress[];
}
