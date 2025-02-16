"use client";

import { useState, useEffect } from "react";
import { Input, Button } from "@/components";
import { Search, Loader2, BookOpen, Filter, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getRecommendedCourses } from "@/actions/course/get-courses";
import { CourseCard } from "@/components/home/RecommendeCourse/CourseCard";

interface Course {
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
}

export default function RecommendedCoursesPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (session?.user?.id) {
          setIsLoading(true);
          const data = await getRecommendedCourses(session.user.id);
          setCourses(data);
          
          const uniqueCategories = ["Todos", ...new Set(data.map(course => course.category.name))];
          setCategories(uniqueCategories);
          
          setFilteredCourses(data);
        }
      } catch (error) {
        console.error("Error loading courses:", error);
        toast.error("Error al cargar los cursos");
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, [session]);

  useEffect(() => {
    const filtered = courses.filter(course => {
      const matchesCategory = selectedCategory === "Todos" || course.category.name === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredCourses(filtered);
  }, [selectedCategory, searchTerm, courses]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900/20">
      {/* Header Section */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
        <div className="container px-4 py-8 mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Cursos Recomendados
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Explora los cursos diseñados para mejorar tus habilidades
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="hidden sm:flex items-center gap-2 text-gray-700 dark:text-gray-300"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-grow">
                <Search className="absolute text-gray-400 transform -translate-y-1/2 pointer-events-none left-3 top-1/2" />
                <Input
                  type="text"
                  placeholder="Buscar cursos por título o descripción..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-neutral-800/50 border-gray-200 dark:border-neutral-700 rounded-xl focus:ring-primaryper focus:border-primaryper"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200
                    ${selectedCategory === category 
                      ? "bg-primaryper text-white shadow-sm shadow-primaryper/20" 
                      : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
                    }
                  `}
                >
                  {category}
                  {selectedCategory === category && category !== "Todos" && (
                    <X 
                      className="inline-block w-4 h-4 ml-2 hover:text-red-400" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory("Todos");
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container px-4 py-8 mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primaryper/30 rounded-full animate-spin">
                  <div className="absolute top-0 right-0 w-4 h-4 bg-primaryper rounded-full" />
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cargando cursos...
              </p>
            </div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-neutral-800">
              <BookOpen className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                No se encontraron cursos
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Intenta ajustar tus filtros de búsqueda
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Todos");
              }}
              className="mt-2"
            >
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''}
                {selectedCategory !== "Todos" && ` en ${selectedCategory}`}
                {searchTerm && ` para "${searchTerm}"`}
              </p>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
