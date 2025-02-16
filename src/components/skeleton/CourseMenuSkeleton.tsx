export const SkeletonCourseMenu = () => {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex gap-3">
          <div className="h-7 w-32 bg-gray-200 dark:bg-neutral-800 rounded-full" />
          <div className="h-7 w-24 bg-gray-200 dark:bg-neutral-800 rounded-full" />
        </div>
        
        <div className="space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
          <div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded-lg" />
          <div className="h-4 w-2/3 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
          <div className="w-full max-w-sm space-y-2">
            <div className="h-2.5 w-full bg-gray-200 dark:bg-neutral-800 rounded-full" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-neutral-800 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Lessons Skeleton */}
      <div className="max-w-3xl mx-auto space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full p-4 bg-gray-100 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-neutral-700 rounded-full" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-2/3 bg-gray-200 dark:bg-neutral-700 rounded-lg" />
                <div className="flex gap-3">
                  <div className="h-6 w-20 bg-gray-200 dark:bg-neutral-700 rounded-full" />
                  <div className="h-6 w-24 bg-gray-200 dark:bg-neutral-700 rounded-full" />
                </div>
              </div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-neutral-700 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};