export interface Lesson {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  content: LessonContent[];
  courseId: string;
}

export interface LessonContent {
  type: 'interactive_text' | 'flashcards' | 'quiz' | 'video' | 'practice';
  data: {
    text?: {
      text: string;
      highlights: {
        word: string;
        explanation: string;
      }[];
    };
    cards?: Array<{
      id: string;
      front: string;
      back: string;
    }>;
    questions?: Array<{
      id: string;
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
    practice?: {
      instructions: string;
      steps: string[];
      tips: string[];
    };
    videoUrl?: {
      url: string;
      title: string;
    };
  };
} 