"use client";

import { MultipleChoiceQuestion } from "@/components";
import { useTestStore } from "@/store";

interface StrengthsQuestionProps {
  handleSubmit?: () => void;
  answers: string[];
}

export const StrengthsQuestion = ({
  handleSubmit,
  answers,
}: StrengthsQuestionProps) => {
  const { selectedAnswers, setSelectedAnswers } = useTestStore();

  const toggleStrength = (value: string | number) => {
    const current = selectedAnswers.includes(String(value))
      ? selectedAnswers.filter((item) => item !== String(value))
      : [...selectedAnswers, String(value)];
    // Limitar selección a 3 respuestas
    if (current.length > 3) return;
    setSelectedAnswers(current);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        ¿En qué áreas consideras que tienes fortalezas o habilidades destacadas?
        (Selecciona hasta 3 opciones)
      </h2>
      <MultipleChoiceQuestion
        answers={answers}
        selectedAnswers={selectedAnswers}
        handleMultipleChoice={toggleStrength}
        title="Enviar respuesta"
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
