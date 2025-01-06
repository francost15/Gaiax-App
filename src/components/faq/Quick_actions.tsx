'use client'
import { quickActions } from '@/data'
import { motion } from 'framer-motion'

export const QuickActions = () => {
  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
        Acciones Rápidas
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {quickActions.map((action, index) => (
          <motion.a
            key={index}
            href={action.href}
            className="relative flex flex-col items-center p-6 text-center transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-xl hover:shadow-md hover:border-primaryper"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-3 rounded-full bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 transition-colors duration-300 mb-4">
              <div className="text-primaryper">
                {action.icon}
              </div>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              {action.title}
            </h3>
            <p className="text-sm text-gray-500">
              {action.description}
            </p>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

