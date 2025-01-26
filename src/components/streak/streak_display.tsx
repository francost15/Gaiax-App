"use client";

import { useState } from "react";
import { Flame } from "lucide-react";

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
      {/* Ícono y racha actual (ahora visible en mobile) */}
      <div className="flex items-center justify-center bg-white dark:bg-neutral-800 text-white px-3 h-8 rounded-full cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg">
        <Flame className="h-4 w-4 mr-1.5 text-yellow-300" />
        <span className="text-sm font-semibold text-black dark:text-white">
          {streak}
        </span>
      </div>

      {isStreakHovered && (
        <div
          className="absolute top-full right-0 mt-2 w-72 p-6 bg-gradient-to-r dark:bg-neutral-800 dark:to-neutral-600 bg-slate-50 to-slate-200
                    rounded-xl border dark:border-neutral-700 border-neutral-200 z-10
                    transition-all duration-300 ease-out"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Flame className="h-8 w-8 text-yellow-300 mr-3 animate-pulse" />
              <div>
                <span className="text-2xl font-bold dark:text-white text-black">
                  {streak} días
                </span>
                <p className="text-xs dark:text-neutral-200 text-neutral-900">
                  Racha actual
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm dark:text-neutral-200 text-neutral-900">
                Mejor racha
              </p>
              <p className="text-lg font-semibold text-black dark:text-white">
                {bestStreak} días
              </p>
            </div>
          </div>
          <div className="dark:bg-white/20 bg-neutral-400 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-yellow-300 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-center dark:text-neutral-100 text-neutral-900 font-medium">
            ¡{bestStreak - streak} días más para tu próximo logro!
          </p>
        </div>
      )}
    </div>
  );
};
