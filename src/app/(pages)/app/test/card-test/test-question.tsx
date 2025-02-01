"use client";
import { useEffect } from "react";
import {
  Button,
  MultipleChoiceQuestion,
  RatingQuestion,
  SingleChoiceQuestion,
} from "@/components";
import { useTestStore } from "@/store";

interface Question {
  text: string;
  type: string;
  answers?: string[];
  maxSelections?: number;
  min?: number;
  max?: number;
  options?: string[];
  placeholder?: string;
}

interface LearningProfileQuestionProps {
  question: Question;
  onAnswer: (answer: any) => void;
}

export default function LearningProfileQuestion({
  question,
  onAnswer,
}: LearningProfileQuestionProps) {
  const {
    selectedAnswers,
    ratingValue,
    setSelectedAnswers,
    setRatingValue,
    resetRanking,
  } = useTestStore();

  useEffect(() => {
    if (question.type === "ranking" && question.options) {
      resetRanking(question.options);
    }
  }, [question, resetRanking]);

  const handleMultipleChoice = (answer: string) => {
    const updated = selectedAnswers.includes(answer)
      ? selectedAnswers.filter((a) => a !== answer)
      : [...selectedAnswers, answer];
    if (question.maxSelections && updated.length > question.maxSelections)
      return;
    setSelectedAnswers(updated);
  };
  const handleSubmit = () => {
    switch (question.type) {
      case "multipleChoice":
        onAnswer(selectedAnswers);
        break;
      case "singleChoice":
        onAnswer(selectedAnswers[0]);
        break;
      case "rating":
        onAnswer(ratingValue);
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h3 className="hidden sm:flex text-lg font-semibold text-gray-800 dark:text-white items-center">
        <span className="ml-2">{question.text}</span>
      </h3>

      {/* Contenedor de contenido que se desplaza si hay muchas respuestas */}
      <div className="flex-1 overflow-auto p-4">
        {question.type === "multipleChoice" && (
          <MultipleChoiceQuestion
            answers={question.answers || []}
            selectedAnswers={selectedAnswers}
            handleMultipleChoice={handleMultipleChoice}
          />
        )}

        {question.type === "singleChoice" && (
          <SingleChoiceQuestion
            answers={question.answers || []}
            setSelectedAnswers={setSelectedAnswers}
            selectedAnswers={selectedAnswers}
          />
        )}

        {question.type === "rating" && (
          <RatingQuestion
            min={question.min || 1}
            max={question.max || 5}
            ratingValue={ratingValue}
            setRatingValue={setRatingValue}
          />
        )}

        {/* Agrega aquí tus otros tipos de pregunta (ranking, openEnded, yesNo...) */}
      </div>

      {/* Botón “Siguiente” con posición sticky para mantenerse visible */}
      <div className="sticky bottom-0 left-0 w-full p-4 bg-white dark:bg-neutral-900 sm:relative">
        <Button
          title="Enviar respuesta"
          onClick={handleSubmit}
          className="w-full bg-primaryper hover:bg-primary-hover text-white transition-all duration-300 transform hover:scale-105 py-4 sm:py-3"
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
