import { CardContent, Card } from "@/components";

export const CourseSkeleton = () => {
  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="h-8 w-64 bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        <div className="h-6 w-40 bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse mt-4 sm:mt-0" />
      </div>

      {/* Descripción Skeleton */}
      <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse mb-6" />

      {/* Swiper Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="h-[380px] transform transition-all duration-300 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800"
          >
            <CardContent className="relative flex flex-col h-full p-4 sm:p-6">
              {/* Header con Categoría y EXP */}
              <div className="flex justify-between items-center mb-6">
                <div className="h-7 w-24 bg-gray-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                <div className="flex items-center gap-1.5 h-7 w-20 bg-gray-200 dark:bg-neutral-800 rounded-full animate-pulse" />
              </div>

              {/* Contenido Principal */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Icono y Título */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-gray-200 dark:bg-neutral-800 animate-pulse shrink-0">
                    <div className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
                  </div>
                </div>

                {/* Descripción */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800 space-y-3">
                <div className="h-8 w-full bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
                <div className="h-12 w-full bg-gray-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-neutral-800 animate-pulse"
          />
        ))}
      </div>
    </section>
  );
};
