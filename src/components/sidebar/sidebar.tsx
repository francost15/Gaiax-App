'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, BookOpen, Award, Settings, HelpCircle, X } from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: BookOpen, label: 'Mis Cursos', href: '/courses' },
  { icon: Award, label: 'Logros', href: '/achievements' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
  { icon: HelpCircle, label: 'Ayuda', href: '/help' },
]

export const Sidebar: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && (event.target as HTMLElement).closest('[data-sidebar]') === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      )}
      <aside
        data-sidebar
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-neutral-900",
          "shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="transition-colors duration-200 hover:bg-red-100 dark:hover:bg-red-900"
          >
            <X className="w-6 h-6 text-red-600 dark:text-red-400" />
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)] px-4">
          <nav className="py-4 space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-200",
                  "text-gray-700 dark:text-gray-300 hover:bg-[#6366F1]/10 dark:hover:bg-[#6366F1]/20",
                  "hover:text-[#6366F1] dark:hover:text-[#A5B4FC]",
                  index === 0 && "bg-[#6366F1]/10 dark:bg-[#6366F1]/20 text-[#6366F1] dark:text-[#A5B4FC]"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}

