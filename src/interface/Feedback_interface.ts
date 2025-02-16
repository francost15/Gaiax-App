// interfaces/Feedback.ts
// Representa el feedback generado durante el uso de la aplicación

export interface Feedback {
  id: string;
  userId: string;
  lessonId?: string | null;
  courseId?: string | null;
  feedbackType: string;
  content: string;
  date: Date;
} 