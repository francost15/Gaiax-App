import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="p-4 bg-gray-100 dark:bg-neutral-800 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="text-sm font-medium text-primaryper hover:text-primary-hover transition-colors"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
} 