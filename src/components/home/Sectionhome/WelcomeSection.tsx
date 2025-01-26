"use client";
import { StreakDisplay } from "@/components";
interface Props {
  name: string;
  lastname: string;
  streaks: number;
}
export const WelcomeSection = ({ name, lastname, streaks }: Props) => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between mb-8 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
            ¡Hola, {name + " " + lastname}!
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Continúa tu aprendizaje diario para PyMEs
          </p>
        </div>
      </div>
    </div>
  );
};
