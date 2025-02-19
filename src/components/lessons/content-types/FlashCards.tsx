"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Timer, Rotate3D, CheckCircle2, HelpCircle, Sparkles, XCircle, BookOpen, Lightbulb } from "lucide-react";

interface FlashCard {
  id: string;
  front: string;
  back: string;
  example?: string;
}

export const FlashCards = ({ cards }: { cards: FlashCard[] }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isHovering, setIsHovering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isFlipped && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isFlipped, timeLeft]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeLeft(30);
    setCurrentCard(prev => (prev + 1) % cards.length);
  };

  const progress = ((currentCard + 1) / cards.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header mejorado */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primaryper/10 dark:bg-primaryper/20 p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-primaryper" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Tarjeta {currentCard + 1} de {cards.length}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aprende nuevos conceptos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800/50 
                        rounded-xl text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            <Timer className="w-4 h-4" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
        </div>
        
        {/* Barra de progreso mejorada */}
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

      {/* Tarjeta mejorada */}
      <div className="relative h-[500px] perspective-1000">
        <motion.div
          className={`
            absolute w-full h-full transition-all duration-700 preserve-3d
            ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}
          `}
          onClick={() => !isFlipped && setIsFlipped(true)}
        >
          {/* Frente - Palabra */}
          <div className="absolute w-full h-full backface-hidden">
            <motion.div 
              className={`
                w-full h-full bg-gradient-to-br from-primaryper via-purple-500 to-primaryper
                rounded-3xl p-10 text-white flex flex-col
                transition-all duration-300 shadow-2xl cursor-pointer
                ${isHovering && !isFlipped ? 'scale-[1.02] shadow-2xl' : 'shadow-xl'}
                border border-white/10 backdrop-blur-sm
              `}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex-grow flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-8"
                >
                  <span className="text-white/70 text-xl">¿Qué significa?</span>
                  <h2 className="text-6xl font-bold tracking-tight">
                    {cards[currentCard].front}
                  </h2>
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 
                             bg-white/10 rounded-full text-sm backdrop-blur-sm
                             border border-white/20"
                  >
                    <Rotate3D className="w-4 h-4" />
                    <span>Toca para revelar</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Reverso - Significado */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <motion.div 
              className={`
                w-full h-full bg-white dark:bg-gray-900 rounded-3xl p-10
                flex flex-col transition-all duration-300
                border border-gray-200 dark:border-gray-800 shadow-2xl
                ${isHovering && isFlipped ? 'scale-[1.02]' : ''}
              `}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="px-4 py-2 bg-primaryper/10 dark:bg-primaryper/20 
                             rounded-full text-primaryper">
                  <span className="font-medium">{cards[currentCard].front}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 
                           rounded-xl transition-colors text-gray-400
                           hover:text-primaryper group"
                >
                  <Rotate3D className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-grow flex flex-col justify-center space-y-8">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl
                             border border-gray-200 dark:border-gray-700">
                  <p className="text-2xl text-gray-900 dark:text-white leading-relaxed text-center">
                    {cards[currentCard].back}
                  </p>
                </div>
                
                {cards[currentCard].example && (
                  <div className="bg-primaryper/5 dark:bg-primaryper/10 
                               rounded-2xl p-6 border border-primaryper/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 bg-primaryper/20 rounded-lg">
                        <HelpCircle className="w-4 h-4 text-primaryper" />
                      </div>
                      <p className="text-sm font-medium text-primaryper">
                        Ejemplo de uso
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {cards[currentCard].example}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSuccess(true);
                      setTimeout(() => {
                        setShowSuccess(false);
                        handleNext();
                      }, 1000);
                    }}
                    className="flex-1 py-4 bg-gradient-to-r from-primaryper to-purple-500
                             text-white rounded-xl font-medium text-sm
                             hover:opacity-90 transition-all duration-300 
                             flex items-center justify-center gap-2
                             shadow-lg shadow-primaryper/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    ¡Lo aprendí!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="flex-1 py-4 bg-gray-100 dark:bg-gray-800
                             text-gray-700 dark:text-gray-300 rounded-xl
                             font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700
                             transition-all duration-300
                             flex items-center justify-center gap-2
                             border border-gray-200 dark:border-gray-700"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Repasar después
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animación de éxito mejorada */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50
                     bg-gradient-to-br from-primaryper/30 to-purple-500/30
                     backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              exit={{ scale: 0.5, rotate: 0 }}
              className="bg-white dark:bg-gray-900 rounded-full p-8 shadow-2xl"
            >
              <Sparkles className="w-16 h-16 text-primaryper" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 