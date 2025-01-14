'use client'

import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card,CardContent,Progress } from "@/components"
import { CourseProgress } from '@/interface'
import { COURSES_IN_PROGRESS } from '@/data'


interface CoursesProgressProps {
  courses?: CourseProgress[]
}

export const CoursesProgress: React.FC<CoursesProgressProps> = ({ courses = COURSES_IN_PROGRESS }) => {
  const [startIndex, setStartIndex] = useState(0)
  const visibleCourses = courses.slice(startIndex, startIndex + 2)

  const handlePrevious = useCallback(() => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }, [])

  const handleNext = useCallback(() => {
    setStartIndex((prevIndex) => Math.min(courses.length - 2, prevIndex + 1))
  }, [courses.length])

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Mis Lecciones en Progreso</h2>
        <div 
  className="flex space-x-2"
  role="navigation"
  aria-label="Navegación de cursos"
>
  <button 
    title='atras'
    name='previous'
    className="p-1 transition-colors bg-gray-200 rounded-full dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 disabled:opacity-50"
    onClick={handlePrevious}
    disabled={startIndex === 0}
    aria-label="Cursos anteriores"
  >
    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  </button>
  <button 
    title='siguiente'
    name='next'
    className="p-1 transition-colors bg-gray-200 rounded-full dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 disabled:opacity-50"
    onClick={handleNext}
    disabled={startIndex >= courses.length - 2}
    aria-label="Cursos siguientes"
  >
    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  </button>
</div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {visibleCourses.map((course, index) => (
          <Card key={index} className="relative transition-all duration-200 bg-white border-gray-200 rounded-xl group hover:border-primaryper dark:bg-neutral-900 dark:border-neutral-700">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 transition-colors rounded-xl bg-primaryper/10 group-hover:bg-primaryper/20">
                  <course.icon className="w-6 h-6 text-primaryper" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{course.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{course.timeRemaining}</p>
                    </div>
                    <div className="absolute top-0 right-0 px-2 py-1 text-xs font-bold text-white rounded-tl-lg rounded-br-lg rounded-xl bg-primaryper">
                      {course.progress}%
                    </div>
                  </div>
                </div>
              </div>
              <Progress 
                title='Progreso del curso'
                value={course.progress} 
                className="h-2 mb-4 bg-gray-100 dark:bg-neutral-700" 
              />
              <button 
              title='continuar'
              className="rounded-xl w-full p-2 bg-primaryper hover:bg-primary-hover transition-colors text-white dark:bg-[#7375F3] dark:hover:bg-primaryper">
                Continuar
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

