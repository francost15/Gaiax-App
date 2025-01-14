'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle,Button } from "@/components"
import { ChevronRight, BookOpen } from 'lucide-react'
import { Contenido } from '@/interface'

const completedCourses: Contenido[] = [
  { id: 1, tipo: 'visual', descripcion: 'Introducción a React', url: '/cursos/react', exp: 100, categoria: 'Desarrollo' },
  { id: 2, tipo: 'audio', descripcion: 'Estrategias de Marketing Digital', url: '/cursos/marketing', exp: 150, categoria: 'Marketing' },
  { id: 3, tipo: 'actividad', descripcion: 'Liderazgo Efectivo', url: '/cursos/liderazgo', exp: 200, categoria: 'Habilidades Blandas' },
]
export default function ProfileCompletedCourses() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)

  return (
    <Card className="border-none shadow-md  transition-all duration-300 bg-white dark:bg-neutral-900">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold flex items-center text-gray-800 dark:text-white transition-colors duration-300">
          <BookOpen className="mr-2 h-8 w-8 text-[#6366F1]" />
          Cursos Completados
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {completedCourses.map((course) => (
            <div key={course.id} className="rounded-xl bg-gray-50 dark:bg-neutral-800 p-4  shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300">{course.descripcion}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  aria-expanded={expandedCourse === course.id}
                  aria-controls={`course-details-${course.id}`}
                >
                  <ChevronRight className={`h-5 w-5 text-[#6366F1] transition-transform ${expandedCourse === course.id ? 'rotate-90' : ''}`} />
                </Button>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">
                <span>Categoría: {course.categoria}</span>
                <span>EXP ganada: {course.exp}</span>
              </div>
              {expandedCourse === course.id && (
                <div id={`course-details-${course.id}`} className="mt-4 pl-4 border-l-2 border-[#6366F1]">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Tipo: {course.tipo}</p>
                  <Button className="bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors duration-300">
                    Revisar curso
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

