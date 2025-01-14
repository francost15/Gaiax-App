// UserLessonProgress
export interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date | null;
  userProgressId?: string | null;
}
