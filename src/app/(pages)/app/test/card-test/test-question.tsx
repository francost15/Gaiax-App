"use client";

import {
  MultipleChoiceQuestion,
  RatingQuestion,
  SingleChoiceQuestion,
  AvailableTimeQuestion,
  GoalsQuestion,
  StrengthsQuestion,
} from "@/components";
import { useTestStore } from "@/store";

// Definimos el tipo Answer para incluir la forma { done: boolean }
export type Answer = string | string[] | number | { done: boolean };

interface Question {
  text: string;
  type: string;
  answers?: (string | number)[];
  maxSelections?: number;
  min?: number;
  max?: number;
  fieldName?: string;
}

// Modificar la interfaz para permitir 'number | null' en availableTimeProp
interface LearningProfileQuestionProps {
  question: Question;
  onAnswer?: (answer: Answer) => void;
  // Ahora se permite que availableTimeProp sea number, null o undefined
  availableTimeProp?: number | null;
  setAvailableTimeProp?: (time: number) => void;
}

export default function LearningProfileQuestion({
  question,
  onAnswer,
  availableTimeProp,
  setAvailableTimeProp,
}: LearningProfileQuestionProps) {
  // Agregar guardia para asegurar que question no sea undefined
  if (!question) return null;

  const {
    selectedAnswers,
    setSelectedAnswers,
    selectedFormats,
    setSelectedFormats,
    improvementAreas,
    setImprovementAreas,
    ratingValue,
    setRatingValue,
    selectedLearningStyle,
    setSelectedLearningStyle,
  } = useTestStore();

  // Si la pregunta es de tipo goals o strengths, delegamos en el componente correspondiente
  if (question.fieldName === "goals") {
    return (
      <GoalsQuestion
        handleSubmit={() => onAnswer && onAnswer({ done: true })}
        answers={question.answers as string[]}
      />
    );
  }
  if (question.fieldName === "strengths") {
    return (
      <StrengthsQuestion
        handleSubmit={() => onAnswer && onAnswer({ done: true })}
        answers={question.answers as string[]}
      />
    );
  }

  const toggleValue = (
    value: string | number,
    arr: string[],
    setter: (s: string[]) => void
  ) => {
    const newArr = arr.includes(String(value))
      ? arr.filter((item) => item !== String(value))
      : [...arr, String(value)];
    if (question.maxSelections && newArr.length > question.maxSelections)
      return;
    setter(newArr);
  };

  const handleMultipleChoice = (answer: string | number) => {
    if (question.fieldName === "formats") {
      toggleValue(answer, selectedFormats, setSelectedFormats);
    } else if (question.fieldName === "improvementAreas") {
      toggleValue(answer, improvementAreas, setImprovementAreas);
    } else if (question.fieldName === "learningStyleKolb") {
      setSelectedLearningStyle(answer as string);
    } else if (question.fieldName === "availableTime") {
      if (typeof setAvailableTimeProp === "function") {
        setAvailableTimeProp(answer as number);
      } else {
        console.error("setAvailableTimeProp no está definido");
      }
    } else {
      toggleValue(answer, selectedAnswers, setSelectedAnswers);
    }
  };

  const handleSubmit = () => {
    onAnswer && onAnswer({ done: true });
  };

  return (
    <div>
      <span className="text-xl font-bold">{question.text}</span>
      <div>
        {question.type === "multipleChoice" && (
          <MultipleChoiceQuestion
            answers={question.answers ?? []}
            selectedAnswers={
              question.fieldName === "formats"
                ? selectedFormats
                : question.fieldName === "improvementAreas"
                ? improvementAreas
                : selectedAnswers
            }
            handleMultipleChoice={handleMultipleChoice}
            title="Enviar respuesta"
            handleSubmit={handleSubmit}
          />
        )}
        {question.type === "singleChoice" && (
          <>
            {question.fieldName === "availableTime" ? (
              <AvailableTimeQuestion
                answers={question.answers as number[]}
                selectedTime={availableTimeProp}
                setSelectedTime={(time: number) => {
                  if (typeof setAvailableTimeProp === "function") {
                    setAvailableTimeProp(time);
                  }
                }}
                title="Enviar respuesta"
                handleSubmit={handleSubmit}
              />
            ) : (
              <SingleChoiceQuestion
                answers={question.answers ?? []}
                setSelectedAnswers={(answers) =>
                  handleMultipleChoice(answers[0])
                }
                selectedAnswers={
                  question.fieldName === "learningStyleKolb"
                    ? [selectedLearningStyle]
                    : selectedAnswers
                }
                title="Enviar respuesta"
                handleSubmit={handleSubmit}
              />
            )}
          </>
        )}
        {question.type === "rating" && (
          <RatingQuestion
            min={question.min ?? 1}
            max={question.max ?? 5}
            ratingValue={ratingValue}
            setRatingValue={setRatingValue}
            title="Enviar respuesta"
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
