"use client";

import { MultipleChoiceQuestion } from "@/components";
import { useTestStore } from "@/store";

interface GoalsQuestionProps {
  handleSubmit?: () => void;
  answers: string[]; // Se reciben las respuestas por props
}

export const GoalsQuestion = ({
  handleSubmit,
  answers,
}: GoalsQuestionProps) => {
  const { selectedGoals, setSelectedGoals } = useTestStore();

  const toggleGoal = (value: string | number) => {
    const answerStr = String(value);
    let newSelected = selectedGoals.includes(answerStr)
      ? selectedGoals.filter((item) => item !== answerStr)
      : [...selectedGoals, answerStr];
    // Limitar selección a 2 respuestas
    if (newSelected.length > 2) return;
    setSelectedGoals(newSelected);
  };

  // Agregamos un console.log para verificar el estado de las respuestas seleccionadas
  console.log("Selected Goals:", selectedGoals);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        ¿Cuál es tu principal objetivo al utilizar GaiaX? (Selecciona hasta 2
        opciones)
      </h2>
      <MultipleChoiceQuestion
        answers={answers}
        selectedAnswers={selectedGoals}
        handleMultipleChoice={toggleGoal}
        title="Enviar respuesta"
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
