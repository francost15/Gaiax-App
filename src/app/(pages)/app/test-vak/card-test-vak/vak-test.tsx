"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import VAKQuestion from "./vak-question";
import VAKResult from "./vak-result";
import { questions } from "@/data";
import { Answer, Results, useVAKTestStore } from "@/store";

export default function VAKTest() {
  const {
    currentQuestion,
    answers,
    results,
    setCurrentQuestion,
    setAnswers,
    setResults,
    resetTest,
  } = useVAKTestStore();

  const handleAnswer = (answer: Answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Answer[]) => {
    const results: Results = { V: 0, A: 0, K: 0 };
    finalAnswers.forEach((answer) => {
      results[answer]++;
    });
    setResults(results);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (results) {
    return <VAKResult results={results} onReset={resetTest} />;
  }

  return (
    <Card className="bg-white dark:bg-neutral-900 shadow-lg border-none">
      <CardContent className="p-6">
        <Progress title="Progreso" value={progress} className="mb-6 h-2" />
        <VAKQuestion
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>
      </CardContent>
    </Card>
  );
}
