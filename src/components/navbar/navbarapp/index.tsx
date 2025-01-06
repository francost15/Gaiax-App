'use client'

import { useState } from 'react'
import { Menu, Search } from 'lucide-react'
import { Button, Logo, NotificationButton, ProfileButton } from '@/components'
import { ThemeToggle } from './theme-toggle'
import { SearchBar } from '../../search/SearchBar'
import { RecommendedCourse } from '@/interface'

interface NavbarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export function NavbarApp({ isOpen, setIsOpen }: NavbarProps) {
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const toggleSearch = () => setIsSearchVisible(!isSearchVisible)

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Abrir/cerrar menú lateral"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </Button>
            <Logo />
          </div>
          <div className="flex-1 hidden mx-4 lg:block">
            <SearchBar onSearch={(results: RecommendedCourse[]) => {
              // Si deseas manejar resultados de búsqueda, hazlo aquí
              console.log(results)
            }} />
          </div>
          <div className="items-center hidden gap-4 lg:flex">
            <ThemeToggle />
            <NotificationButton />
            <ProfileButton />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Buscar"
              onClick={toggleSearch}
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <ThemeToggle />
            <NotificationButton />
            <ProfileButton />
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="absolute left-0 right-0 p-4 bg-white top-full dark:bg-neutral-900 lg:hidden">
          <SearchBar onSearch={(results: RecommendedCourse[]) => {
            console.log(results)
          }} />
        </div>
      )}
    </nav>
  )
}