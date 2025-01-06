'use client'

import { useState, useCallback,useId } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent,Button } from "@/components"
import { RecommendedCourse } from '@/interface'
import { RECOMMENDED_COURSES } from '@/data'

interface RecommendedCoursesProps {
  courses?: RecommendedCourse[]
}

export const RecommendedCourses: React.FC<RecommendedCoursesProps> = ({ courses = RECOMMENDED_COURSES }) => {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCourses = courses.slice(startIndex, startIndex + 3)
  const sectionId = useId()
  const navigationId = useId()

  const handlePrevious = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }, [])

  const handleNext = useCallback(() => {
    setStartIndex((prevIndex) => Math.min(courses.length - 3, prevIndex + 1))
  }, [courses.length])

  return (
    <section 
      className="mb-12"
      aria-labelledby={sectionId}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 id={sectionId} className="text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
          Microlearning Recomendado
        </h2>
        <div 
          className="flex space-x-2"
          role="navigation"
          aria-label="Navegación de cursos"
          id={navigationId}
        >
        <button 
        title='atras'
    name='previous'
    className="p-1 transition-colors bg-gray-200 rounded-full dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 disabled:opacity-50"
    onClick={handlePrevious}
    disabled={startIndex === 0}
    aria-label="Cursos anteriores"
    aria-controls={navigationId}
  >
    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  </button>
  <button 
  title='siguiente'
    className="p-1 transition-colors bg-gray-200 rounded-full dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 disabled:opacity-50"
    onClick={handleNext}
    disabled={startIndex >= courses.length - 3}
    aria-label="Cursos siguientes"
    aria-controls={navigationId}
  >
    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between mb-6 sm:mb-4">
        <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-[70%]">
          Lecciones cortas y efectivas para mejorar tus habilidades en software y IA
        </p>
        <a 
          title='Mas cursos'
          href="/courses"
          className="text-sm sm:text-base font-semibold text-[#6366F1] hover:text-[#5558DD] dark:text-[#7375F3] dark:hover:text-[#8385F5] transition-colors duration-200 whitespace-nowrap"
          aria-label="Ver todos los cursos disponibles"
        >
          Mostrar más
        </a>
      </div>
      <div 
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:gap-6"
        role="list"
        aria-label="Lista de cursos recomendados"
      >
        {visibleCourses.map((course, index) => (
          <article
            key={index}
            className="group hover:border-[#6366F1] transition-all duration-200 overflow-hidden"
            role="listitem"
          >
            <Card className="h-full bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 transition-all duration-200 hover:border-[#6366F1] dark:hover:border-[#7375F3]">
              <CardContent className="relative flex flex-col h-full pt-6">
                <div className="absolute top-0 right-0 bg-[#6366F1] text-white px-2 py-1 text-xs font-semibold rounded-bl-lg">
                  <span aria-label="Duración del curso">{course.duration}</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/20 transition-colors">
                    <course.icon className="h-6 w-6 text-[#6366F1]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.description}
                    </p>
                  </div>
                </div>
                <Button 
                title='comenzar leccion'
                  className="w-full mt-auto bg-[#6366F1] hover:bg-[#5558DD] transition-colors text-white dark:bg-[#7375F3] dark:hover:bg-[#6366F1]"
                  aria-label={`Comenzar lección: ${course.title}`}
                >
                  Comenzar Lección
                </Button>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </section>
  )
}

