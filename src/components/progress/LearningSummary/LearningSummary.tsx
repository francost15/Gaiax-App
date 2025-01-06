'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components'
import { StatCard } from '@/interface'

interface LearningSummaryProps {
  stats: StatCard[]
}

export function LearningSummary({ stats }: LearningSummaryProps) {
  return (
    <Card className="bg-white border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <CardHeader>
        <CardTitle>Resumen de Aprendizaje</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((state, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 transition-all duration-200 bg-gray-50 dark:bg-primaryper/20 rounded-xl hover:shadow-md hover:scale-105"
            >
              <div className="p-2 rounded-xl bg-primaryper/10 dark:bg-primaryper/40">
                <state.icon className="w-6 h-6 text-primaryper dark:text-white" />
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-300">
                  {state.label}
                </div>
                <div className="text-lg font-bold text-primaryper dark:text-white">
                  {state.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}