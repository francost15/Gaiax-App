"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { ChevronRight, BookOpen } from "lucide-react";
import { ImSad } from "react-icons/im";

interface Course {
  id: string;
  title: string;
  description: string;
  url?: string | null; // Permitir null
  exp: number;
  category: {
    name: string;
  };
}

interface Props {
  completedCourses: {
    course: Course;
  }[];
}

export default function ProfileCourses({ completedCourses }: Props) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  return (
    <Card className="border-none transition-all duration-300 bg-white dark:bg-neutral-900">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold flex items-center text-gray-800 dark:text-white transition-colors duration-300">
          <BookOpen className="mr-2 h-8 w-8 text-[#6366F1]" />
          Cursos Completados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {completedCourses.map(({ course }) => (
            <div key={course.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {course.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Categoría: {course.category.name}
                </p>
              </div>
              <Button
                variant="outline"
                className="ml-4"
                onClick={() =>
                  setExpandedCourse(
                    expandedCourse === course.id ? null : course.id
                  )
                }
              >
                <ChevronRight
                  className={`h-5 w-5 transition-transform ${
                    expandedCourse === course.id ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
