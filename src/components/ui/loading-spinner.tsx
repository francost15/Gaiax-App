export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primaryper/30 rounded-full animate-spin">
            <div className="absolute top-0 right-0 w-4 h-4 bg-primaryper rounded-full" />
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Generando contenido personalizado...
        </p>
      </div>
    </div>
  );
} 