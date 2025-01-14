// interfaces/ProgresoUsuario.ts
// Rastrea el progreso de un usuario en un curso.

import { Lesson } from "./Leccion_interface";
import { UserLessonProgress } from "./Usuario_leccion_progreso_interface";

// UserProgress
export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonsCompleted: UserLessonProgress[];
  progress: number;
  Lesson: Lesson[];
}
