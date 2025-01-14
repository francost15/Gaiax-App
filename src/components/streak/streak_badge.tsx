import { Flame } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StreakBadgeProps {
  count: number
  className?: string
}

export const StreakBadge = ({ count, className }: StreakBadgeProps) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-full",
      "bg-primaryper/10 dark:bg-primaryper/20",
      "text-primaryper dark:text-[#A5B4FC]",
      "transition-all duration-300 ease-in-out",
      "hover:bg-primaryper/50 dark:hover:bg-primaryper/90",
      "group cursor-pointer",
      className
    )}>
      <Flame 
        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" 
      />
      <span className="font-semibold">
        Racha: {count} días
      </span>
      <span className="sr-only">Tu racha actual de días consecutivos de aprendizaje</span>
    </div>
  )
}

