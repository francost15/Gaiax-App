"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, HelpCircle, Trophy, BookCheck } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  questions: Question[];
  onComplete?: (score: number) => void;
}

export const QuizComponent = ({ questions, onComplete }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleFinishLesson = () => {
    if (onComplete) {
      onComplete(score);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header con progreso */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primaryper/10 dark:bg-primaryper/20 p-2 rounded-xl">
              <Trophy className="w-5 h-5 text-primaryper" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Pregunta {currentQuestion + 1} de {questions.length}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Puntuación actual: {score} correctas
              </p>
            </div>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="relative h-2">
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-full" />
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primaryper to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Contenido de la pregunta */}
      <motion.div
        key={questions[currentQuestion].id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl
                 border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showExplanation && handleAnswer(index)}
              disabled={showExplanation}
              whileHover={!showExplanation ? { scale: 1.02 } : {}}
              whileTap={!showExplanation ? { scale: 0.98 } : {}}
              className={`
                w-full p-6 text-left rounded-2xl transition-all duration-300
                flex items-center gap-4 group relative
                ${showExplanation
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : selectedAnswer === index
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'bg-gray-50 dark:bg-gray-800/50 opacity-50'
                  : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }
              `}
            >
              {/* Indicador de respuesta */}
              {showExplanation && (
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                  ${index === questions[currentQuestion].correctAnswer
                    ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400'
                    : selectedAnswer === index
                      ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                  }
                `}>
                  {index === questions[currentQuestion].correctAnswer ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : selectedAnswer === index ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                  )}
                </div>
              )}

              {/* Texto de la opción */}
              <span className={`flex-grow ${
                showExplanation
                  ? index === questions[currentQuestion].correctAnswer
                    ? 'text-green-700 dark:text-green-300 font-medium'
                    : selectedAnswer === index
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-gray-500 dark:text-gray-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {option}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Explicación */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 p-6 bg-primaryper/5 dark:bg-primaryper/10 
                       rounded-2xl border border-primaryper/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-primaryper/10 rounded-lg">
                  <HelpCircle className="w-4 h-4 text-primaryper" />
                </div>
                <h4 className="font-medium text-primaryper">
                  Explicación
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {questions[currentQuestion].explanation}
              </p>

              {!isLastQuestion && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextQuestion}
                  className="mt-6 w-full py-4 bg-gradient-to-r from-primaryper to-purple-500
                           text-white rounded-xl font-medium
                           hover:opacity-90 transition-all duration-300
                           flex items-center justify-center gap-2
                           shadow-lg shadow-primaryper/20"
                >
                  Siguiente pregunta
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Resultado final modificado */}
      <AnimatePresence>
        {isLastQuestion && showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-8 bg-white dark:bg-gray-900 rounded-3xl
                     border border-gray-200 dark:border-gray-800 shadow-xl"
          >
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <Trophy className="w-20 h-20 text-primaryper mx-auto" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1"
                >
                  <CheckCircle className="w-5 h-5 text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                ¡Quiz completado!
              </h3>
              <div className="flex flex-col items-center gap-2 mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Has acertado {score} de {questions.length} preguntas
                </p>
                <div className="px-4 py-2 bg-primaryper/10 dark:bg-primaryper/20 
                             rounded-full text-primaryper font-medium">
                  {Math.round((score / questions.length) * 100)}% completado
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFinishLesson}
                className="px-8 py-4 bg-gradient-to-r from-primaryper to-purple-500
                         text-white rounded-xl font-medium text-lg
                         hover:opacity-90 transition-all duration-300
                         inline-flex items-center gap-3 shadow-lg shadow-primaryper/20"
              >
                <BookCheck className="w-5 h-5" />
                Finalizar lección
              </motion.button>
              
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Al finalizar, se desbloqueará la siguiente lección
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 