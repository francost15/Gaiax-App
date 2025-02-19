import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Metric {
  label: string;
  value: string;
}

interface AdminModuleProps {
  title: string;
  description: string;
  icon?: ReactNode;
  metrics?: Metric[];
}

export const AdminModule = ({ title, description, icon, metrics }: AdminModuleProps) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-lg 
    transition-all duration-300 border border-transparent hover:border-primaryper/20 
    dark:border-neutral-700 group cursor-pointer"
  >
    <div className="flex items-start gap-4">
      {icon && (
        <motion.div 
          whileHover={{ rotate: 5 }}
          className="p-3 bg-primaryper/10 group-hover:bg-primaryper/20 rounded-xl 
          transition-colors duration-300"
        >
          <div className="text-primaryper">
            {icon}
          </div>
        </motion.div>
      )}
      <div className="flex-1">
        <motion.h2 
          className="text-lg font-semibold text-gray-900 dark:text-white mb-1 
          group-hover:text-primaryper transition-colors duration-300"
        >
          {title}
        </motion.h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {description}
        </p>
        
        {metrics && (
          <div className="grid grid-cols-2 gap-4 mt-2">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-primaryper/5 dark:bg-primaryper/10 p-2 rounded-lg
                hover:bg-primaryper/10 dark:hover:bg-primaryper/20 transition-colors duration-300"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {metric.label}
                </p>
                <p className="text-sm font-semibold text-primaryper">
                  {metric.value}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  </motion.div>
); 