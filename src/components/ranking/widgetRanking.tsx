"use client";

import { Medal, ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export function RankingWidget() {
  return (
    <Link href="/app/ranking" className="group block">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 rounded-xl bg-primaryper/10 border-neutral-900">
              <Medal className="w-6 h-6 text-primaryper" />
            </div>
            {/* Indicador de posición */}
            <div className="absolute -top-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-green-500/10 rounded-full">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-[10px] font-medium text-green-500">2</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                #5
              </p>
              <span className="text-sm font-medium text-primaryper">
                Top 10%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                2,340 XP
              </p>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                •
              </span>
              <p className="text-sm text-primaryper group-hover:underline">
                Ver ranking
              </p>
            </div>
          </div>
        </div>

        <ChevronRight 
          className="w-5 h-5 text-gray-400 group-hover:text-primaryper transition-colors" 
        />
      </div>
    </Link>
  );
}