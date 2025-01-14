'use client'

import Link from 'next/link'
import { BookX } from 'lucide-react'
import { Button } from '@/components'
import { usePathname } from 'next/navigation'

export default function NotFound() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 dark:bg-neutral-900">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-60 blur-2xl">
            <BookX className="w-48 h-48 text-primaryper" />
          </div>
          <div className="relative">
            <BookX className="w-32 h-32 mx-auto text-primaryper animate-pulse" />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            ¡Ups! Página no encontrada
          </h1>
          
          <div className="space-y-2">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Parece que <span className="font-medium text-primaryper">&quot;{pathname}&quot;</span> no está en nuestro plan de estudios.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Error 404 - Página no encontrada
            </p>
          </div>

          <Link href="/app" className="inline-block">
            <Button 
            title='Volver al inicio'
              className="h-auto px-6 py-4 text-lg font-medium text-white transition-all duration-300 rounded-xl bg-primaryper hover:bg-primary-hover hover:scale-105 hover:shadow-lg hover:shadow-primaryper/20"
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}