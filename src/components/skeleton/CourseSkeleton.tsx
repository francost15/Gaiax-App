import { CardContent, Card } from "@/components";

export const CourseSkeleton = () => {
  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="h-8 w-64 bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse" />
        <div className="h-6 w-40 bg-gray-200 dark:bg-neutral-800 rounded-lg animate-pulse mt-4 sm:mt-0" />
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            className="relative h-[220px] bg-white dark:bg-neutral-900 border-gray-200/50 dark:border-neutral-800"
          >
            {/* Badge EXP Skeleton */}
            <div className="absolute -top-0.5 -left-0.5">
              <div className="flex items-center gap-1.5 px-3 py-1">
                <div className="w-3.5 h-3.5 bg-amber-500/20 rounded animate-pulse" />
                <div className="w-12 h-4 bg-amber-500/20 rounded animate-pulse" />
              </div>
            </div>

            {/* Badge Categoría Skeleton */}
            <div className="absolute -top-0.5 -right-0.5">
              <div className="w-24 h-7 bg-primaryper/20 rounded-s-xl animate-pulse" />
            </div>

            <CardContent className="relative h-full p-6 pt-12">
              {/* Contenido Principal */}
              <div className="flex items-start gap-5">
                {/* Icono */}
                <div className="p-3.5 rounded-xl bg-primaryper/10 animate-pulse">
                  <div className="w-6 h-6" />
                </div>
                
                {/* Título y Descripción */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse w-3/4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse w-2/3" />
                  </div>
                </div>
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
