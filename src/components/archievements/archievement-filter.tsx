"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { Trophy, CheckCircle, Circle } from "lucide-react";

export const AchievementFilter = () => {
  const [filter, setFilter] = useState("all");
  return (
    <Card className="bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow duration-300 w-full border-none rounded-xl ">
      <CardHeader className="border-b border-gray-200 dark:border-neutral-800">
        <CardTitle className="text-xl sm:text-2xl font-bold text-primaryper dark:text-[#ffffff] text-center">
          Estado de Logros
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-row justify-center gap-4">
          {["all", "completed", "incomplete"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              className={`justify-center h-auto py-3 px-4 border-none rounded-xl ${
                filter === status
                  ? "bg-primaryper text-white hover:bg-primary-hover"
                  : "hover:bg-primaryper/20 hover:text-primaryper text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setFilter(status)}
            >
              <div className="flex items-center gap-2">
                {status === "all" && <Trophy className="h-5 w-5" />}
                {status === "completed" && <CheckCircle className="h-5 w-5" />}
                {status === "incomplete" && <Circle className="h-5 w-5" />}
                <span className="text-sm sm:text-base">
                  {status === "all" && "Todos los Logros"}
                  {status === "completed" && "Logros Completados"}
                  {status === "incomplete" && "Logros Pendientes"}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
