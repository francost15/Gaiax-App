"use client";
import { Card, CardContent } from "@/components";
import { BookOpen, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    exp: number;
    category: {
      name: string;
    };
  };
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link href={`/app/course/${course.id}`}>
        <Card className="relative group overflow-hidden bg-white dark:bg-neutral-900 border-gray-200/50 dark:border-neutral-800/50 hover:border-primaryper dark:hover:border-primaryper transition-all duration-300 hover:shadow-xl h-[220px]">
          {/* Gradiente de fondo en hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primaryper/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          />

          {/* Badge de EXP en esquina izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-0.5 -left-0.5"
          >
            <div className="flex items-center gap-1.5 px-3 py-1  text-amber-500 ">
              <Trophy className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">
                {course.exp} XP
              </span>
            </div>
          </motion.div>

          {/* Badge de categoría en esquina derecha */}
          <div className="absolute -top-0.5 -right-0.5">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="px-3 py-1 text-sm font-medium text-white bg-primaryper rounded-s-xl "
            >
              {course.category.name}
            </motion.div>
          </div>

          <CardContent className="relative h-full p-6 pt-12">
            {/* Contenido Principal */}
            <div className="flex items-start gap-5">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="p-3.5 rounded-xl bg-primaryper/10 group-hover:bg-primaryper/20 transition-colors"
              >
                <BookOpen className="w-6 h-6 text-primaryper" />
              </motion.div>
              
              <div className="flex-1 min-w-0 space-y-2">
                <motion.h3 
                  className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2"
                >
                  {course.title}
                </motion.h3>
                <motion.p 
                  className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2"
                >
                  {course.description}
                </motion.p>
              </div>
            </div>

            {/* Botón de Acción con Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-primaryper/5 backdrop-blur-[2px] transition-all duration-300"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primaryper to-[#7375F3] text-white rounded-full shadow-lg"
              >
                <span className="text-sm font-medium">Ir al curso</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};
