"use client";

import { Card } from "@/components";
import { BookOpen, Clock, Trophy, Target, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
  lastname: string;
  xp: number;
  lesson: number;
}

export const WelcomeSection = ({ name, lastname, xp, lesson }: Props) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-gray-200/50 dark:border-neutral-800/50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        {/* Header principal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 sm:mb-8">
          <div className="space-y-1">
            {/* Usando h1 para el título principal */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              ¡Hola, {name + " " + lastname}!
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Continúa donde lo dejaste
            </p>
          </div>
          
     
             {/* 
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primaryper/5 dark:bg-primaryper/10 rounded-lg border border-primaryper/10">
              <Trophy className="w-4 h-4 text-primaryper" />
              <span className="text-sm font-medium text-primaryper">
                Nivel {Math.floor(xp / 100)}
              </span>
            </div>
    
          Stats minimalistas en línea 
          
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-primaryper/5 dark:bg-primaryper/10 rounded-lg border border-primaryper/10">
              <Clock className="w-4 h-4 text-primaryper" />
              <span className="text-sm font-medium text-primaryper">
                45 min hoy
              </span>
            </div>
        
          </div>
            */}
        </div>

        {/* Continuar Aprendiendo - Diseño mejorado y responsive */}
        <Card className="p-4 sm:p-6 shadow-md hover:bg-primaryper/10 rounded-xl hover:border-primaryper border-white dark:border-neutral-900 transition-all duration-300 group">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
            {/* Thumbnail con overlay - Ajustado para móvil */}
            <div className="relative mx-auto sm:mx-0">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primaryper to-primary-hover opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center bg-primaryper/10 group-hover:bg-primaryper/20 transition-colors">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primaryper" />
                </div>
              </div>
              {/* Badge de duración - Reposicionado en móvil */}
            
            </div>

            <div className="flex-1 min-w-0 space-y-3 sm:space-y-4">
              {/* Usando h2 para el título del curso */}
              <div className="text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-2 mb-1">
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                    Introducción a React
                  </h2>
                  <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium text-primaryper bg-primaryper/10 rounded-full">
                    Nuevo
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lección 3: Componentes y Props
                </p>
              </div>
              
              {/* Barra de progreso con info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Progreso del curso
                  </span>
                  <span className="font-medium text-primaryper">
                    30% completado
                  </span>
                </div>
                <div className="h-1.5 sm:h-2 bg-primaryper/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primaryper to-primary-hover rounded-full transition-all duration-500 group-hover:opacity-90"
                    style={{ width: '30%' }}
                  />
                </div>
              </div>

              {/* Botón de continuar y última actividad */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                  href="/app/lesson/1"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white bg-primaryper hover:bg-primary-hover rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primaryper/20"
                >
                  <PlayCircle className="w-4 h-4" />
                  Continuar lección
                </Link>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Última actividad: hace 2 horas
                </span>
              </div>
            </div>

            {/* Flecha indicadora - Solo en desktop */}
            <div className="hidden sm:block">
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primaryper group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
