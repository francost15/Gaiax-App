'use client'
import { Card, RankingWidget } from '@/components'
import { Clock, Target, Trophy } from 'lucide-react'

export function LearningSummary() {
  return (
    <Card className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border-none shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Resumen de Aprendizaje
      </h2>
      <div className="grid grid-cols-2 gap-5">
        {/* Logros */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/20 rounded-xl">
              <Trophy className="h-6 w-6 text-primaryper" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Logros</div>
            </div>
          </div>
        </div>

        {/* Minutos */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/20 rounded-xl">
              <Clock className="h-6 w-6 text-primaryper" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">45</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Minutos Hoy</div>
            </div>
          </div>
        </div>

        {/* En curso */}
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-5 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-100 dark:bg-violet-900/20 rounded-xl">
              <Target className="h-6 w-6 text-primaryper" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">23</div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">En curso</div>
            </div>
          </div>
        </div>

        <RankingWidget />
      </div>
    </Card>
  )
}