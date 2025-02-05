"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { Trophy, CheckCircle, Circle } from "lucide-react";

export const CompletedCoursesFilter = () => {
  const [filter, setFilter] = useState("all");

  return (
    <Card className="w-full transition-shadow duration-300 bg-white border-none dark:bg-neutral-900 hover:shadow-md rounded-xl mb-6">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl sm:text-2xl font-bold text-primaryper dark:text-[#A5B4FC] text-center">
          Categoría de Cursos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {["all", "completed", "incomplete"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              className={`justify-start h-auto py-3 px-4 w-full border-none ${
                filter === status
                  ? "bg-primaryper text-white hover:bg-primary-hover"
                  : "hover:bg-primaryper/20 hover:text-primaryper text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setFilter(status)}
            >
              <div className="flex items-center gap-2">
                {status === "all" && <Trophy className="w-5 h-5" />}
                {status === "completed" && <CheckCircle className="w-5 h-5" />}
                {status === "incomplete" && <Circle className="w-5 h-5" />}
                <span className="text-sm sm:text-base">
                  {status === "all" && "Todos los Cursos"}
                  {status === "completed" && "Cursos Completados"}
                  {status === "incomplete" && "Cursos Pendientes"}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
