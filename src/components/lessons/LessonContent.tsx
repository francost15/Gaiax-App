"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FlashCards,
  InteractiveText,
  QuizComponent
} from "@/components";
import { completeLesson } from "@/actions/lesson/complete-lesson";
import { Lesson, LessonContent as LessonContentType } from "@/interfaces/Lesson.interface";

interface LessonContentProps {
  lesson: Lesson;
}

export const LessonContent = ({ lesson }: LessonContentProps) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const content = Array.isArray(lesson.content) ? lesson.content : [];

  const handleQuizComplete = async (score: number) => {
    try {
      await completeLesson({
        lessonId: lesson.id,
        score: score
      });
      
      router.push(`/app/course/${lesson.courseId}`);
    } catch (error) {
      console.error('Error al completar la lección:', error);
    }
  };

  const renderContent = (content: LessonContentType) => {
    if (!content) return null;
    
    switch (content.type) {
      case 'interactive_text':
        return <InteractiveText content={content.data.text!} />;
      case 'flashcards':
        return <FlashCards cards={content.data.cards!} />;
      case 'quiz':
        return <QuizComponent 
          questions={content.data.questions!} 
          onComplete={handleQuizComplete}
        />;
      default:
        return null;
    }
  };

  if (!content.length) return <div>No hay contenido disponible</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="text-gray-600 dark:text-gray-400">{lesson.description}</p>
      </div>

      {content[currentStep] && renderContent(content[currentStep])}

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>

        <div className="flex gap-2">
          {content.map((_: LessonContentType, index: number) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentStep === index 
                  ? 'bg-primaryper' 
                  : 'bg-gray-200 dark:bg-neutral-700'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => setCurrentStep(prev => Math.min(content.length - 1, prev + 1))}
          disabled={currentStep === content.length - 1}
          className="px-4 py-2 bg-gray-100 dark:bg-neutral-800 rounded-lg disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}; 