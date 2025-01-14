'use client'
import { Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Progress } from '@/components'
import { UserProfile } from '@/interface'

interface DailyProgressProps {
  user: UserProfile
}

export function DailyProgress({ user }: DailyProgressProps) {
  return (
    <Card className="h-full p-8 text-white border-none rounded-xl bg-primaryper">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <Zap className="w-5 h-5" />
          Mi Progreso Diario
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">Nivel {user.level}</div>
            <p className="mt-1 text-sm opacity-80">
              {user.lessonsTotal - user.lessonsCompleted} lecciones para el siguiente nivel
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {user.lessonsCompleted}/{user.lessonsTotal}
            </div>
            <div className="text-xs opacity-80">Lecciones completadas</div>
          </div>
        </div>
        <Progress 
          title='user progress'
          value={user.progress} 
          className="h-3 bg-gray-200 dark:bg-neutral-800" 
        />
      </CardContent>
    </Card>
  )
}