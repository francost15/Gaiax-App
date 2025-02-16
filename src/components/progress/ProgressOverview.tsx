"use client";

import { Card, RankingWidget } from "@/components";
import { Target, Trophy, Medal } from "lucide-react";

interface Props {
  xp: number;
  lesson: number;
  progress: number;
}

export function ProgressOverview({ xp, lesson, progress }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
      <Card className="p-5 border-white dark:border-neutral-900 transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primaryper/10 border-white dark:border-neutral-900 transition-colors">
            <Trophy className="w-6 h-6 text-primaryper" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.floor(xp / 100)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nivel actual
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 border-white dark:border-neutral-900 transition-all duration-300 group">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primaryper/10 border-white dark:border-neutral-900 transition-colors">
            <Target className="w-6 h-6 text-primaryper" />
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {lesson}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lecciones completadas
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 border-white dark:border-neutral-900 transition-all duration-300 group">
       <RankingWidget/>
      </Card>
    </div>
  );
}
