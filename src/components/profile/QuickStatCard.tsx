interface QuickStatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
}

export function QuickStatCard({ title, value, icon, trend }: QuickStatCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primaryper/10">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h4>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
            {trend && (
              <span className="text-xs font-medium text-green-500">
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 