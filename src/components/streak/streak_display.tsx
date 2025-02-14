"use client";

import { useState } from "react";
import { TbFlameFilled, TbStar } from "react-icons/tb";

interface Props {
  streak: number;
  bestStreak: number;
}

export const StreakDisplay = ({ streak, bestStreak }: Props) => {
  const [isStreakHovered, setIsStreakHovered] = useState(false);
  const progressPercentage =
    bestStreak === 0 ? 0 : Math.min((streak / bestStreak) * 100, 100);

  const flameColor = streak === 0 ? "text-gray-500" : "text-yellow-500";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsStreakHovered(true)}
      onMouseLeave={() => setIsStreakHovered(false)}
    >
      {/* Ícono y racha actual */}
      <div className="flex items-center justify-center h-10 px-3 text-white transition-all duration-200 rounded-full cursor-pointer bg-neutral-100 border-neutral-200 dark:bg-neutral-800 hover:shadow-lg">
        <TbFlameFilled className={`h-5 w-4 mr-1.5 ${flameColor}`} />
        <span className="text-sm font-semibold text-black dark:text-white">
          {streak}
        </span>
      </div>

      {isStreakHovered && (
        <div className="absolute right-0 z-10 mt-2 transition-all duration-300 ease-out bg-white border border-gray-200 shadow-lg w-80 rounded-xl top-full dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex items-center justify-between p-4 border-b dark:border-neutral-700">
            <div className="flex items-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {progressPercentage}%
                  </span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#F59E0B"
                    strokeWidth="5"
                    fill="transparent"
                    className="transition-all duration-500 stroke-dasharray-283 stroke-dashoffset-283"
                    style={{
                      strokeDasharray: 283,
                      strokeDashoffset: 283 - (283 * progressPercentage) / 100,
                    }}
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ¡Sigue así!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mantén tu racha activa.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <TbFlameFilled className="w-5 h-5 mr-2 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Racha actual
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {streak} días
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TbStar className="w-5 h-5 mr-2 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mejor racha
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {bestStreak} días
              </span>
            </div>
          </div>

          <div className="p-4 text-center border-t dark:border-neutral-700">
            <p className="text-sm text-gray-700 dark:text-gray-200">
              ¡A {bestStreak - streak} días de tu récord!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
