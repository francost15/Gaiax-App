// interfaces/ProgresoUsuario.ts
// Rastrea el progreso de un usuario en un curso.

import { UserLessonProgress } from "./Usuario_leccion_progreso_interface";

// UserProgress
export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  lessonsCompleted: UserLessonProgress[];
  updatedAt: Date;
}
