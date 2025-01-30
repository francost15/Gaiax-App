"use client";

import { useEffect } from "react";
import { Progress } from "@/components";
import LearningProfileResult from "./test-result";
import LearningProfileQuestion from "./test-question";
import { questions } from "./learning";
import { useTestStore } from "@/store";

type Answer = string | string[] | number | { [key: string]: number };

export default function LearningProfileTest() {
  const {
    currentSection,
    currentQuestion,
    answers,
    results,
    setCurrentSection,
    setCurrentQuestion,
    setAnswers,
    setResults,
    resetTest,
  } = useTestStore();

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions[currentSection].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < questions.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Answer[]) => {
    // Lógica placeholder (reemplazar con lógica real de cálculo)
    const resultsData = {
      learningStyle: "Personalizado",
      recommendations: [
        "Basado en tus respuestas, te recomendamos un enfoque de aprendizaje mixto.",
        "Considera establecer metas semanales para mantener tu motivación.",
        "Aprovecha los recursos multimedia y las simulaciones prácticas.",
      ],
    };
    setResults(resultsData);
  };

  const totalQuestions = questions.reduce(
    (acc, section) => acc + section.questions.length,
    0
  );
  const answeredQuestions = answers.length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  useEffect(() => {
    // Uso previo de goToPreviousQuestion con Framer Motion (eliminado)
  }, []);

  if (results) {
    return <LearningProfileResult results={results} onReset={resetTest} />;
  }

  const currentQuestionData =
    questions[currentSection].questions[currentQuestion];

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 ">
      <div className="border-none overflow-hidden w-full max-w-5xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 md:gap-6 relative rounded-xl">
        {/* Sección de la izquierda (título, progreso) */}
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2
            className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-gray-800 dark:text-white 
                       transition-all duration-300 transform opacity-0 -translate-y-2 animate-fade-in-up"
          >
            {questions[currentSection].section}
          </h2>

          <div className="mb-2 md:mb-4">
            <Progress title="Progreso" value={progress} className="h-2" />
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Pregunta {answeredQuestions + 1} de {totalQuestions}
            </div>
          </div>
        </div>

        {/* Sección de la derecha (pregunta actual) */}
        <div
          className="w-full md:w-2/3 transition-all duration-300 transform opacity-0 translate-x-2 
                     animate-fade-in-left"
        >
          <LearningProfileQuestion
            question={currentQuestionData}
            onAnswer={handleAnswer}
          />
        </div>
      </div>
    </div>
  );
}
