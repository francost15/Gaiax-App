"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { Trophy, CheckCircle, Circle } from "lucide-react";

export const AchievementFilter = () => {
  const [filter, setFilter] = useState("all");

  return (
    <Card className="bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow duration-300 w-full">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl sm:text-2xl font-bold text-primaryper dark:text-[#A5B4FC]">
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Estado de Logros
            </h3>
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {["all", "completed", "incomplete"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  className={`justify-start h-auto py-3 px-4 w-full ${
                    filter === status
                      ? "bg-primaryper text-white"
                      : "hover:bg-primaryper/10 hover:text-primaryper text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setFilter(status)}
                >
                  <div className="flex items-center">
                    {status === "all" && <Trophy className="mr-2 h-5 w-5" />}
                    {status === "completed" && (
                      <CheckCircle className="mr-2 h-5 w-5" />
                    )}
                    {status === "incomplete" && (
                      <Circle className="mr-2 h-5 w-5" />
                    )}
                    <span className="text-sm sm:text-base">
                      {status === "all" && "Todos los Logros"}
                      {status === "completed" && "Logros Completados"}
                      {status === "incomplete" && "Logros Pendientes"}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
