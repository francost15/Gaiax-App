import { Card, CardContent, CardHeader, CardTitle } from "@/components"
import { Trophy, Star, Zap, Award } from 'lucide-react'

const achievements = [
  { icon: Trophy, label: 'Completaste tu primer curso', date: '15/05/2023' },
  { icon: Star, label: 'Racha de 7 días', date: '22/06/2023' },
  { icon: Zap, label: 'Maestro del código', date: '10/07/2023' },
  { icon: Award, label: 'Top 10% en el curso', date: '05/08/2023' },
]

export default function ProfileAchievements() {
  return (
    <Card className="border-none transition-all duration-300 bg-white dark:bg-neutral-900">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold flex items-center text-gray-800 dark:text-white transition-colors duration-300">
          <Trophy className="mr-2 h-8 w-8 text-primaryper" />
          Logros Recientes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 group">
              <div className="bg-primaryper p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300">
                <achievement.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 transition-colors duration-300">{achievement.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">{achievement.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

