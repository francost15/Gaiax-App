"use client";

interface CodeExerciseProps {
  exercise: {
    instructions: string;
    initialCode: string;
    solution: string;
  };
}

export const CodeExercise = ({ exercise }: CodeExerciseProps) => {
  return (
    <div className="p-8">
      <div className="mb-4 prose dark:prose-invert">
        <h3>Ejercicio de Código</h3>
        <p>{exercise.instructions}</p>
      </div>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono">
        <pre>{exercise.initialCode}</pre>
      </div>
    </div>
  );
}; 