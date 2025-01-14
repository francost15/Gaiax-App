import { StreakDisplay} from '@/components'

const USER = {
  name: "Franco Alessandro",
  avatar: "",
  initials: "FA",
  streak: 7,
  level: 5,
  progress: 60,
  lessonsCompleted: 3,
  lessonsTotal: 5
}

export const WelcomeSection = () => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between mb-8 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">¡Hola, {USER.name}!</h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">Continúa tu aprendizaje diario para PyMEs</p>
        </div>
        <StreakDisplay streak={USER.streak} />
      </div>
    
    </div>
  )
}
