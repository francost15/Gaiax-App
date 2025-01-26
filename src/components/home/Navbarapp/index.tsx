"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Course } from "@/interface";

import { ProfileButton } from "./profile-button";
import { Button, SearchBar, StreakDisplay } from "@/components";

interface Props {
  name: string;
  email: string;
  role: string;
  streaks?: number;
}

export function NavbarApp({ name, email, role, streaks }: Props) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Función para alternar la visibilidad de la barra de búsqueda
  const toggleSearch = () => setIsSearchVisible(!isSearchVisible);

  return (
    <nav className="sticky top-0 z-10 bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 hidden mx-4 lg:block">
            <SearchBar
              onSearch={(results: Course[]) => {
                // Manejar resultados de búsqueda aquí
                console.log(results);
              }}
            />
          </div>
          <div className="items-center hidden gap-4 lg:flex">
            <StreakDisplay streak={streaks ?? 0} />
            <ProfileButton name={name} email={email} role={role} />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              title="buscar"
              variant="ghost"
              size="icon"
              aria-label="Buscar"
              onClick={toggleSearch}
            >
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <ProfileButton name={name} email={email} role={role} />
          </div>
        </div>
      </div>

      {isSearchVisible && (
        <div className="absolute left-0 right-0 p-4 bg-white top-full dark:bg-neutral-900 lg:hidden">
          <SearchBar
            onSearch={(results: Course[]) => {
              // Manejar resultados de búsqueda aquí
              console.log(results);
            }}
          />
        </div>
      )}
    </nav>
  );
}
