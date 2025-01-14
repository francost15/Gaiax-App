'use client'
import { Card, RankingWidget } from '@/components'

import { Clock, Target, Trophy } from 'lucide-react'

export function LearningSummary() {
  return (
        <Card className="bg-white dark:bg-neutral-900 p-6 rounded-xl border-none">
          <h2 className="text-xl font-semibold mb-4">Resumen de Aprendizaje</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl ">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-primaryper" />
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Logros</div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl ">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primaryper" />
                <div>
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Minutos Hoy</div>
                </div>
              </div>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-xl ">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-primaryper" />
                <div>
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">En curso</div>
                </div>
              </div>
            </div>
            <RankingWidget />
          </div>
        </Card>
  )
}