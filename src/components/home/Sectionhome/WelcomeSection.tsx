"use client";

interface Props {
  name: string;
  lastname: string;
}
export const WelcomeSection = ({ name, lastname }: Props) => {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col items-start justify-between mb-8 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h1 className="text-md  text-gray-900 sm:text-2xl dark:text-white">
            ¡Hola, {name + " " + lastname}!
          </h1>
          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Continúa tu aprendizaje diario
          </p>
        </div>
      </div>
    </div>
  );
};
