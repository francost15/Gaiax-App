"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Pause, Play, Lightbulb, X } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";

interface TextContent {
  text: string;
  highlights: {
    word: string;
    explanation: string;
  }[];
}

export const InteractiveText = ({ content }: { content: TextContent }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [readingSpeed, setReadingSpeed] = useState(150);
  
  const words = useMemo(() => content.text.split(' '), [content.text]);
  const progress = (currentPosition / words.length) * 100;

  useEffect(() => {
    if (isPlaying && currentPosition < words.length) {
      const timer = setTimeout(() => {
        setCurrentPosition(prev => prev + 1);
      }, readingSpeed);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentPosition, words.length, readingSpeed]);

  const highlightText = (text: string) => {
    let textWithHighlights = text;
    content.highlights.forEach(highlight => {
      textWithHighlights = textWithHighlights.replace(
        new RegExp(`(${highlight.word})`, 'gi'),
        `<span class="relative group cursor-pointer">
          <span class="border-b-2 border-primaryper/30 group-hover:border-primaryper 
                     transition-all duration-300" data-word="$1">$1</span>
          <span class="absolute -top-1 left-1/2 w-1 h-1 bg-primaryper rounded-full 
                     transform -translate-x-1/2 scale-0 group-hover:scale-100 
                     transition-transform duration-300"></span>
        </span>`
      );
    });
    return textWithHighlights;
  };

  return (
    <div className="relative bg-white dark:bg-black min-h-[calc(100vh-12rem)]">
      {/* Barra de progreso superior */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1">
        <motion.div 
          className="h-full bg-gradient-to-r from-primaryper to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Controles superiores */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Tooltip content="Reiniciar">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPosition(0);
                  setIsPlaying(true);
                }}
                className="p-2 text-gray-400 hover:text-primaryper 
                         hover:bg-primaryper/10 rounded-lg transition-all"
              >
                <RotateCcw className="w-5 h-5" />
              </motion.button>
            </Tooltip>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-4 py-2
                       bg-gradient-to-r from-primaryper to-purple-500 
                       text-white rounded-lg shadow-md
                       hover:from-primaryper/90 hover:to-purple-500/90 
                       transition-all duration-300"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span className="text-sm font-medium">Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 ml-0.5" />
                  <span className="text-sm font-medium">Continuar</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">{currentPosition + 1}</span>
            <span>/</span>
            <span>{words.length} palabras</span>
          </div>
        </div>

        {/* Área de lectura */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8
                      shadow-lg border border-gray-200 dark:border-gray-800">
          <div className="prose dark:prose-invert max-w-none">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                className={`
                  inline-block relative mx-[3px] py-1 transition-all duration-300
                  ${idx === currentPosition 
                    ? 'text-primaryper font-medium scale-105' 
                    : idx < currentPosition
                      ? 'text-gray-400 dark:text-gray-600'
                      : 'text-gray-700 dark:text-gray-300'}
                `}
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.dataset.word) {
                    setSelectedWord(target.dataset.word);
                  }
                }}
              >
                {idx === currentPosition && (
                  <motion.div
                    layoutId="cursor"
                    className="absolute -bottom-1 left-0 right-0 h-[2px]
                             bg-gradient-to-r from-primaryper/0 via-primaryper to-primaryper/0"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                <span
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(word)
                  }}
                  className="text-xl leading-relaxed tracking-wide"
                />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Popup de explicación mejorado */}
        <AnimatePresence>
          {selectedWord && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 
                       w-full max-w-lg mx-auto
                       bg-white/95 dark:bg-gray-900/95 backdrop-blur-md
                       border border-gray-200 dark:border-gray-800
                       rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex items-start gap-4 p-6">
                <div className="p-2 bg-primaryper/10 rounded-lg flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-primaryper" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-primaryper">
                      {selectedWord}
                    </h4>
                    <button
                      onClick={() => setSelectedWord(null)}
                      className="p-1 text-gray-400 hover:text-primaryper 
                               hover:bg-primaryper/10 rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {content.highlights.find(h => h.word === selectedWord)?.explanation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 