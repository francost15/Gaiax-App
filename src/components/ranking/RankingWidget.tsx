"use client";

import { Medal, ChevronRight, TrendingUp, Crown } from "lucide-react";
import Link from "next/link";

export function RankingWidget() {
  return (
    <Link href="/app/ranking" className="group block relative">
      {/* Fondo decorativo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-primaryper/5 to-transparent dark:from-primaryper/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          <div className="relative">
            {/* Efecto de brillo en el ícono */}
            <div className="absolute inset-0 bg-primaryper/20 rounded-xl blur-xl group-hover:bg-primaryper/30 transition-colors" />
            <div className="relative p-3 rounded-xl bg-primaryper/10 border border-primaryper/20 group-hover:border-primaryper/30 transition-all">
              <Medal className="w-6 h-6 text-primaryper" />
            </div>
            
            {/* Badge de mejora con animación */}
            <div className="absolute -top-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full animate-pulse">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-[10px] font-medium text-green-500">+2</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                #5
              </p>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-primaryper/10 rounded-full">
                <Crown className="w-3.5 h-3.5 text-primaryper" />
                <span className="text-xs font-medium text-primaryper">
                  Top 10%
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                2,340 XP
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
              <p className="text-sm font-medium text-primaryper group-hover:underline decoration-2 underline-offset-2">
                Ver ranking completo
              </p>
            </div>
          </div>
        </div>

        {/* Flecha con animación */}
        <div className="relative">
          <div className="absolute inset-0 bg-primaryper/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
          <ChevronRight 
            className="relative w-5 h-5 text-gray-400 group-hover:text-primaryper group-hover:translate-x-0.5 transition-all duration-300" 
          />
        </div>
      </div>
    </Link>
  );
} 