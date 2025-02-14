"use client";
import { Card, CardContent, Button } from "@/components";
import { BookOpen, ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    exp: number;
    url?: string | null;
    category: {
      name: string;
    };
    learningObjectives: string[];
    createdAt: Date;
    UserProgress?: {
      progress: number;
    }[];
  };
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="h-[380px] transform transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 hover:border-primaryper dark:hover:border-[#7375F3] hover:shadow-lg">
      <CardContent className="relative flex flex-col h-full p-4 sm:p-6">
        {/* Header con Categoría y EXP */}
        <div className="flex justify-between items-center mb-6">
          <span className="px-3 py-1.5 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-primaryper to-[#7375F3]">
            {course.category.name}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-600">
              {course.exp} EXP
            </span>
          </div>
        </div>

        {/* Contenido Principal con Scroll */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Icono y Título - Fuera del área scrolleable */}
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-primaryper/10 shrink-0">
              <BookOpen className="w-6 h-6 text-primaryper" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
              {course.title}
            </h3>
          </div>

          {/* Contenido Scrolleable */}
          <div
            className={`overflow-y-auto flex-1 pr-2 scrollbar-thin scrollbar-thumb-primaryper scrollbar-track-transparent`}
          >
            <div className={`transition-all duration-300`}>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {course.description}
              </p>

              {showDetails && course.learningObjectives?.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    Objetivos del curso:
                  </p>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primaryper mt-1.5 shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer con Botones - Siempre visible */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800 space-y-3 bg-white dark:bg-neutral-900">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primaryper transition-colors"
          >
            {showDetails ? "Ver menos" : "Ver más"}
            <ChevronRight
              className={`w-4 h-4 transition-transform ${
                showDetails ? "rotate-90" : ""
              }`}
            />
          </button>

          <Link href={`/app/courses/${course.id}`} className="block">
            <Button className="w-full bg-gradient-to-r from-primaryper to-[#7375F3] hover:from-[#5558DD] hover:to-[#8385F5] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              Comenzar Curso
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
