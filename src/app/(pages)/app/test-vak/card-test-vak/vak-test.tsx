"use client";
import { Card, CardContent } from "@/components";
import VAKQuestion from "./vak-question";
import VAKResult from "./vak-result";
import { questions } from "@/data";
import { Answer, Results, useVAKTestStore } from "@/store";

interface VAKTestProps {
  userId: string;
}

export default function VAKTest({ userId }: VAKTestProps) {
  const answers = useVAKTestStore((state) => state.answers);
  const results = useVAKTestStore((state) => state.results);
  const currentQuestion = useVAKTestStore((state) => state.currentQuestion);
  const setAnswers = useVAKTestStore((state) => state.setAnswers);
  const setResults = useVAKTestStore((state) => state.setResults);
  const setCurrentQuestion = useVAKTestStore(
    (state) => state.setCurrentQuestion
  );
  const resetTest = useVAKTestStore((state) => state.resetTest);

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
    const final: Results = { V: 0, A: 0, K: 0 };
    finalAnswers.forEach((answer) => {
      final[answer]++;
    });
    setResults(final);
  };

  const progress = (currentQuestion / questions.length) * 100;

  if (results) {
    return <VAKResult userId={userId} results={results} onReset={resetTest} />;
  }

  return (
    <Card className="bg-white dark:bg-neutral-900 shadow-xl border-none">
      <CardContent className="p-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-primaryper h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
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
