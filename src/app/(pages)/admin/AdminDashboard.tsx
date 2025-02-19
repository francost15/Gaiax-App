"use client";
import { Card, UserStats } from "@/components";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Trophy,
  Activity,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export const AdminDashboard = () => {
  return (
    <div className="p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Bienvenido al Panel de Administración
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Resumen general del sistema
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {[
          {
            icon: <Users className="w-6 h-6" />,
            value: "150",
            label: "Usuarios Activos",
          },
          {
            icon: <BookOpen className="w-6 h-6" />,
            value: "25",
            label: "Cursos Activos",
          },
          {
            icon: <Trophy className="w-6 h-6" />,
            value: "85%",
            label: "Tasa de Finalización",
          },
          {
            icon: <Activity className="w-6 h-6" />,
            value: "32",
            label: "Cursos en Progreso",
          },
        ].map((stat, index) => (
          <motion.div key={index} variants={item}>
            <Card className="p-6 bg-white dark:bg-neutral-800 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primaryper/10 rounded-xl group-hover:bg-primaryper/20 transition-colors">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Estadísticas de Usuarios - Ahora ocupa todo el ancho */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <UserStats />
      </motion.div>
    </div>
  );
}; 