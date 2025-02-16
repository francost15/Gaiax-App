"use client";

import { useState } from "react";
import { TbFlameFilled, TbStar, TbTrophy } from "react-icons/tb";

interface Props {
  streak: number;
  bestStreak: number;
}

export const StreakDisplay = ({ streak, bestStreak }: Props) => {
  const [isStreakHovered, setIsStreakHovered] = useState(false);
  const progressPercentage =
    bestStreak === 0 ? 0 : Math.min((streak / bestStreak) * 100, 100);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsStreakHovered(true)}
      onMouseLeave={() => setIsStreakHovered(false)}
    >
      {/* Botón de Racha */}
      <button className="flex items-center gap-2 px-4 py-2 transition-all duration-200 bg-white border rounded-xl dark:bg-neutral-900 hover:shadow-md border-neutral-200 dark:border-neutral-800 hover:border-primaryper dark:hover:border-primaryper group">
        <div className="p-1.5 rounded-lg ">
          <TbFlameFilled 
            className={`h-5 w-5 ${
              streak === 0 
                ? "text-gray-400" 
                : "text-amber-500 group-hover:text-orange-500"
            }`} 
          />
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primaryper dark:group-hover:text-primaryper">
          {streak} días
        </span>
      </button>

      {/* Panel de Detalles */}
      {isStreakHovered && (
        <div className="absolute right-0 z-50 w-80 mt-2 transition-all duration-300 ease-out bg-white border shadow-lg dark:bg-neutral-900 rounded-xl border-neutral-200 dark:border-neutral-800">
          {/* Header con Progreso Circular */}
          <div className="p-4 border-b dark:border-neutral-800 bg-gradient-to-br from-primaryper/5 to-amber-500/5">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Círculo de fondo */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="stroke-neutral-200 dark:stroke-neutral-700"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  {/* Círculo de progreso */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="stroke-amber-500 transition-all duration-500"
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 283,
                      strokeDashoffset: 283 - (283 * progressPercentage) / 100,
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-amber-500">
                    {Math.round(progressPercentage)}%
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  ¡Mantén el ritmo!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Continúa con tu racha de aprendizaje
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <TbFlameFilled className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Racha actual
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {streak} días
              </span>
            </div>

            <div className="flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primaryper/10">
                  <TbTrophy className="w-4 h-4 text-primaryper" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mejor racha
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {bestStreak} días
              </span>
            </div>
          </div>

          {/* Footer */}
          {bestStreak > streak && (
            <div className="p-4 text-center border-t dark:border-neutral-800 bg-gradient-to-br from-primaryper/5 to-amber-500/5">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ¡Te faltan{" "}
                <span className="font-bold text-primaryper">
                  {bestStreak - streak} días
                </span>{" "}
                para superar tu récord!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
