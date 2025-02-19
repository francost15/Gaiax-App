"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primaryper to-[#7375F3] shadow-xl flex items-center justify-center">
            <span className="text-2xl font-bold text-white">gX</span>
          </div>
        </motion.div>

        {/* Anillos de carga */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute border-2 border-primaryper rounded-2xl"
                initial={{ width: 64, height: 64, opacity: 0 }}
                animate={{
                  width: [64, 80 + i * 16],
                  height: [64, 80 + i * 16],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: `-${8 + i * 8}px`,
                  top: `-${8 + i * 8}px`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Texto de carga */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-[20%] left-0 right-0 text-center"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Cargando...
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Preparando tu experiencia de aprendizaje
        </p>
      </motion.div>
    </div>
  );
}
