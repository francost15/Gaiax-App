"use client";

import { useState } from "react";
import { Flame } from "lucide-react";
import { TbFlameFilled } from "react-icons/tb";

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
      {/* Ícono y racha actual */}
      <div className="flex items-center justify-center h-10 px-3 text-white transition-all duration-200 rounded-full cursor-pointer bg-neutral-100 border-neutral-200 dark:bg-neutral-800 hover:shadow-lg">
        <TbFlameFilled className="h-5 w-4 mr-1.5 text-yellow-500" />
        <span className="text-sm font-semibold text-black dark:text-white">
          {streak}
        </span>
      </div>

      {isStreakHovered && (
        <div className="absolute right-0 z-10 p-6 mt-2 transition-all duration-300 ease-out bg-white border border-white shadow-md top-full w-72 bg-gradient-to-r dark:bg-neutral-800 dark:to-neutral-600 rounded-xl dark:border-neutral-700">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TbFlameFilled className="w-8 h-8 mr-3 text-yellow-500 animate-pulse" />
              <div>
                <span className="text-2xl font-bold text-black dark:text-white">
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
          <div className="h-2 mb-4 overflow-hidden rounded-full dark:bg-white/20 bg-neutral-400">
            <div
              className="h-full transition-all duration-500 ease-out bg-yellow-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm font-medium text-center dark:text-neutral-100 text-neutral-900">
            ¡{bestStreak - streak} días más para tu próximo logro!
          </p>
        </div>
      )}
    </div>
  );
};
