"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, Button, Input, Badge } from "@/components";
import { ArrowLeft, Search, Clock, Award } from "lucide-react";
import Link from "next/link";
import { RECOMMENDED_COURSES } from "@/data";

const categories = [
  "Todos",
  ...Array.from(new Set(RECOMMENDED_COURSES.map((course) => course.category))),
];

export default function RecommendedCoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = useMemo(() => {
    return RECOMMENDED_COURSES.filter(
      (course) =>
        (selectedCategory === "Todos" ||
          course.category === selectedCategory) &&
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [selectedCategory, searchTerm]);

  return (
    <div className="container px-4 py-8 mx-auto text-gray-100 ">
      <div className="flex flex-col gap-4 mb-6 sm:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none left-3 top-1/2" />
          <Input
            type="text"
            placeholder="Buscar cursos..."
            className="w-full pl-10 dark:border-neutral-600 dark:text-gray-100 text-gray-800 rounded-xl border-neutral-300 bg-neutral-50 dark:bg-neutral-900 dark:focus:border-primaryper dark:focus:ring-primaryper focus:border-primaryper focus:ring-primaryper"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm rounded-xl ${
                selectedCategory === category
                  ? "bg-primaryper text-white hover:bg-primary-hover"
                  : "dark:bg-neutral-900 bg-neutral-50 hover:bg-primary-hover dark:text-gray-300 text-neutral-700 dark:border-neutral-700 border-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* courses cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCourses.map((course, index) => (
          <Card
            key={index}
            className="overflow-hidden text-gray-100 transition-all duration-300 bg-white border rounded-xl border-neutral-300 dark:border-neutral-700 hover:shadow-lg dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:bg-neutral-50 hover:scale-105"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-black dark:text-gray-100 line-clamp-1">
                  {course.title}
                </h3>
                <Badge
                  variant="outline"
                  className="text-xs transition-all duration-300 cursor-pointer dark:border-neutral-700 border-neutral-400 text-neutral-700 dark:text-gray-400 dark:bg-neutral-800 bg-neutral-100 hover:bg-primaryper dark:hover:bg-primaryper dark:hover:text-white hover:text-white hover:border-primaryper"
                >
                  {course.category}
                </Badge>
              </div>
              <p className="mb-3 text-xs text-neutral-700 dark:text-gray-400 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center justify-between mb-3">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs text-neutral-700 dark:text-gray-400"
                >
                  <Clock className="w-3 h-3 text-neutral-700 dark:text-gray-400" />
                  {course.duration}
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-xs text-neutral-700 dark:text-gray-400"
                >
                  <Award className="w-3 h-3 text-neutral-700 dark:text-gray-400" />
                  {course.xp} XP
                </Badge>
              </div>
              <Button
                title="Comenzar Curso"
                className="w-full py-1 text-sm text-white rounded-xl bg-primaryper hover:bg-primary-hover"
              >
                Comenzar Curso
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
