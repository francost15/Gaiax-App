"use client";

import { ProfileButton } from "./profile-button";
import { Logo, StreakDisplay } from "@/components";

interface Props {
  name: string;
  email: string;
  role: string;
  streaks?: number;
}

export function NavbarMobileApp({ name, email, role, streaks }: Props) {
  return (
    // "block lg:hidden" asegura que se muestre solo en pantallas pequeñas y medianas (<1024px)
    <nav className="sticky top-0 z-10 block lg:hidden bg-white dark:bg-neutral-900 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Contenedor principal: espacio a la izquierda para el logo,
            y botones alineados a la derecha */}
        <div className="flex items-center h-16">
          {/* Espacio para el logo */}
          <div className="w-20 mr-4">
            <Logo />
          </div>

          {/* Sección de controles alineados a la derecha */}
          <div className="flex items-center gap-2 ml-auto">
            <StreakDisplay streak={streaks ?? 0} bestStreak={0} />
            <ProfileButton name={name} email={email} role={role} />
          </div>
        </div>
      </div>
    </nav>
  );
}
