'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button, ScrollArea } from '@/components'
import { Home, BookOpen, Award, Settings, HelpCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: Home, label: 'Inicio', href: '/app' },
  { icon: BookOpen, label: 'Mis Cursos', href: '/app/courses/recommended' },
  { icon: Award, label: 'Logros', href: '/achievements' },
  { icon: Settings, label: 'Configuración', href: '/app/settings' },
  { icon: HelpCircle, label: 'Ayuda', href: '/help' },
]

export const Sidebar: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void }> = ({
  isOpen,
  setIsOpen,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && (event.target as HTMLElement).closest('[data-sidebar]') === null) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen, setIsOpen])

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />}
      <aside
        data-sidebar
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-64 flex-col bg-white dark:bg-neutral-900 shadow-lg transition-transform',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-300 dark:border-neutral-700">
          <span className="font-bold text-gray-800 dark:text-white">Menú</span>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 dark:text-white" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 text-primaryper" />
                <span className="text-gray-700 dark:text-gray-200">{item.label}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  )
}