// interfaces/Leccion.ts
// Define una lección individual dentro de un curso.

import { Feedback } from "./Feedback_interface";
import { UserLessonProgress } from "./Usuario_leccion_progreso_interface";


// Lesson
export interface Lesson {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  learningObjectives: string[];
  courseId: string;
  UserLessonProgress: {
    id: string;
    userId: string;
    lessonId: string;
    completed: boolean;
    completedAt: Date | null;
    userProgressId: string | null;
  }[];
  Feedback?: Feedback[];
  Notification?: Notification[];
}
