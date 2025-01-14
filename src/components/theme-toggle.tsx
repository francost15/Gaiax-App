import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components"
import { useTheme } from "next-themes"

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      title='tema'
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="w-5 h-5 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}

