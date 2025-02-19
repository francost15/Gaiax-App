"use client";

interface PracticeExerciseProps {
  exercise: {
    title: string;
    description: string;
    steps: string[];
  };
}

export const PracticeExercise = ({ exercise }: PracticeExerciseProps) => {
  return (
    <div className="p-8">
      <h3 className="text-xl font-semibold mb-4">{exercise.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{exercise.description}</p>
      <ol className="space-y-4">
        {exercise.steps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primaryper/10 text-primaryper rounded-full">
              {index + 1}
            </span>
            <p className="text-gray-700 dark:text-gray-300">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}; 