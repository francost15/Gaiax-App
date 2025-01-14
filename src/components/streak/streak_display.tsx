import { Flame, TrendingDown } from 'lucide-react'

interface StreakDisplayProps {
  streak: number
  status?: 'lost' | 'maintained'
}

export const StreakDisplay = ({ streak, status = 'maintained' }: StreakDisplayProps) => {
  const getStreakInfo = () => {
    switch (status) {
      case 'lost':
        return {
          icon: TrendingDown,
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          textColor: 'text-red-600 dark:text-red-400',
          borderColor: 'border-red-200 dark:border-red-800',
          message: '¡Vuelve a la carga!',
          hoverBg: 'hover:bg-red-200 dark:hover:bg-red-800/30'
        }
      case 'maintained':
      default:
        return {
          icon: Flame,
          bgColor: 'bg-primaryper/10 dark:bg-primaryper/20',
          textColor: 'text-primaryper dark:text-[#A5B4FC]',
          borderColor: 'border-primaryper/20 dark:border-primaryper/30',
          message: '¡Sigue así!',
          hoverBg: 'hover:bg-primaryper/20 dark:hover:bg-primaryper/30'
        }
    }
  }

  const { icon: StreakIcon, bgColor, textColor, borderColor, message, hoverBg } = getStreakInfo()

  return (
    <div className={`group relative flex items-center gap-2 ${bgColor} ${textColor} px-4 py-2 rounded-full shadow-md border ${borderColor} text-sm sm:text-base font-semibold transition-all duration-300 ease-in-out ${hoverBg} hover:shadow-lg`}>
      <StreakIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${textColor} transition-transform duration-300 ease-in-out group-hover:scale-110`} />
      <span>Racha: {streak} días</span>
      <span className={`absolute -top-6 right-0 ${bgColor} ${textColor} text-xs font-bold py-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out whitespace-nowrap`}>
        {message}
      </span>
    </div>
  )
}

