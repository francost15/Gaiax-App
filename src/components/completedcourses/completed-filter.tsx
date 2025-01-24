"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { Trophy, CheckCircle, Circle } from "lucide-react";

export const CompletedCoursesFilter = () => {
  const [filter, setFilter] = useState("all");

  return (
    <Card className="w-full transition-shadow duration-300 bg-white border-none dark:bg-neutral-900 hover:shadow-md rounded-xl">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl sm:text-2xl font-bold text-primaryper dark:text-[#A5B4FC]">
          Categoria de cursos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 ">
          <div>
            <div className="flex flex-col space-y-2 sm:space-y-3 ">
              {["all", "completed", "incomplete"].map((status) => (
                <Button
                  key={status}
                  variant={filter === status ? "default" : "outline"}
                  className={`justify-start h-auto py-3 px-4 w-full border-none ${
                    filter === status
                      ? "bg-primaryper text-white hover:bg-primary-hover"
                      : "hover:bg-primaryper/20 hover:text-primaryper  text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setFilter(status)}
                >
                  <div className="flex items-center ">
                    {status === "all" && <Trophy className="w-5 h-5 mr-2" />}
                    {status === "completed" && (
                      <CheckCircle className="w-5 h-5 mr-2" />
                    )}
                    {status === "incomplete" && (
                      <Circle className="w-5 h-5 mr-2" />
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
