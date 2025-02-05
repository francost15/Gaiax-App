"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { Progress } from "@/components";
import LearningProfileResult from "./test-result";
import LearningProfileQuestion, { Answer } from "./test-question";
import { questions } from "./learning";

import { logout, updateTestResponses } from "@/actions";
import { useTestStore } from "@/store";

interface TestAppProps {
  userId: string;
}

export default function LearningProfileTest({ userId }: TestAppProps) {
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
    selectedFormats,
    selectedLearningStyle,
    improvementAreas,
    setUserId,
    ratingValue,
    availableTime,
    setAvailableTime,
    selectedGoals, // Asegúrate de tener selectedGoals en el store
  } = useTestStore();

  useEffect(() => {
    setUserId(userId);
  }, [userId, setUserId]);

  const handleAnswer = (answer: Answer) => {
    console.log("Respuesta recibida:", answer);
    setAnswers([...answers, answer]);
    const section = questions[currentSection];
    if (currentQuestion < (section.questions?.length ?? 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentSection < questions.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentQuestion(0);
    } else {
      setResults({
        learningStyle: "Personalizado",
        recommendations: [
          "Enfoque mixto",
          "Metas semanales",
          "Recursos multimedia",
        ],
      });
    }
  };

  const handleSave = async () => {
    try {
      if (availableTime === null) {
        console.error(
          "El valor de availableTime no es un número:",
          availableTime
        );
        toast.error("El tiempo disponible debe ser un número válido.");
        return;
      }
      const data = {
        userId,
        availableTime,
        formats: selectedFormats,
        learningStyleKolb: selectedLearningStyle,
        skillLevel: ratingValue,
        improvementAreas,
        goals: selectedGoals, // Asegúrate de pasar los objetivos seleccionados
      };
      console.log("Datos enviados a updateTestResponses:", data);
      const result = await updateTestResponses(data);
      if (result.ok) {
        toast.success("Perfil de aprendizaje guardado correctamente.");
        // Redirigir al logout luego de guardar
        logout();
      } else {
        toast.error(
          result.message || "Error al guardar el perfil de aprendizaje."
        );
      }
    } catch (error: unknown) {
      console.error(
        "updateTestResponses - Error al actualizar las respuestas:",
        error
      );
      toast.error("Error inesperado al actualizar el perfil de aprendizaje.");
    }
  };

  if (results) {
    return (
      <LearningProfileResult
        results={results}
        onReset={resetTest}
        onSave={handleSave}
      />
    );
  }

  const totalQuestions = questions.reduce(
    (acc, sec) => acc + (sec.questions?.length ?? 0),
    0
  );
  const progress = (answers.length / totalQuestions) * 100;
  const currentQuestionData =
    questions[currentSection]?.questions?.[currentQuestion];

  if (!currentQuestionData) return null;

  return (
    <div className="flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 p-4 sm:p-6 md:p-8 relative rounded-xl">
        <div className="w-full md:w-1/3 mb-4">
          <span className="text-lg">{questions[currentSection].section}</span>
          <Progress title="Progreso" value={progress} className="h-3" />
        </div>
        <div className="w-full md:w-2/3">
          <LearningProfileQuestion
            question={currentQuestionData}
            onAnswer={handleAnswer}
            availableTimeProp={availableTime}
            setAvailableTimeProp={setAvailableTime}
          />
        </div>
      </div>
    </div>
  );
}
