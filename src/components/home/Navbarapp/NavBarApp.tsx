"use client";
import { Course } from "@/interface";
import { ProfileButton } from "./profile-button";
import { SearchBar, StreakDisplay } from "@/components";

interface Props {
  name: string;
  email: string;
  role: string;
  streaks?: number;
}

export function NavbarApp({ name, email, role, streaks }: Props) {
  return (
    // "hidden lg:block" asegura que se muestre solo en pantallas grandes (≥1024px)
    <nav className="hidden lg:block sticky top-0 z-10 bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 ml-36">
            <SearchBar
              onSearch={(results: Course[]) => {
                // Manejar resultados de búsqueda aquí
                console.log(results);
              }}
            />
          </div>
          <div className="items-center gap-4 flex">
            <StreakDisplay streak={streaks ?? 0} bestStreak={0} />
            <ProfileButton name={name} email={email} role={role} />
          </div>
        </div>
      </div>
    </nav>
  );
}
