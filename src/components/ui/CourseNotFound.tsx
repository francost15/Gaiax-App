import Link from 'next/link'
import { BookX, Home, Search } from 'lucide-react'

export const CourseNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        {/* Ícono animado */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 bg-primaryper/20 rounded-full animate-ping" />
          <div className="relative flex items-center justify-center w-24 h-24 bg-primaryper/10 rounded-full">
            <BookX className="w-12 h-12 text-primaryper" />
          </div>
        </div>

        {/* Mensaje principal */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Curso no encontrado
        </h1>
        
        <p className="text-gray-400 text-sm sm:text-base">
          Lo sentimos, el curso que estás buscando no existe o no tienes acceso a él.
        </p>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/app"
            className="flex items-center gap-2 px-6 py-3 bg-primaryper hover:bg-primaryper/90 text-white rounded-xl transition-all w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            <span>Ir al inicio</span>
          </Link>
          
          <Link
            href="/app/courses/recommended"
            className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl transition-all w-full sm:w-auto justify-center"
          >
            <Search className="w-4 h-4" />
            <span>Explorar cursos</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 