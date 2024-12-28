import { Button,Card,CardContent } from '@/components'

import React from 'react'

export const CardDemo = () => {
  return (
    <Card className="transition-all duration-300 ease-in-out shadow-2xl rounded-2xl hover:shadow-xl">
    <CardContent className="p-8">
      <div className="space-y-6">
        <div className='text-center '>
        <h2 className="text-3xl font-bold text-gray-900">
          Comienza tu prueba gratuita
        </h2>
        <span className='font-light text-center text-gray-600 '>
        Regístrate y empieza ahora a mejorar la gestión de talento de tu empresa.
        </span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de la empresa 
              <span className='text-red-600'>*</span>
            </label>
            <input
              required
              title='Nombre de la empresa'
              type="text"
              className="block w-full px-3 py-2 mt-1 transition-all duration-300 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
              <span className='text-red-600'>*</span>
            </label>
            <input
              required
              title='Correo electrónico'
              type="email"
              className="block w-full px-3 py-2 mt-1 transition-all duration-300 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
              <span className='text-red-600'>*</span>
            </label>
            <input
              required
              title='Teléfono'
              type="tel"
              className="block w-full px-3 py-2 mt-1 transition-all duration-300 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
            <span className='text-red-600'>*</span>
              Número de empleados
            </label>
            <select
              required
              title='Número de empleados'
              className="block w-full px-3 py-2 mt-1 transition-all duration-300 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>201+</option>
            </select>
          </div>
          <Button className="w-full font-bold transition-colors duration-300 bg-blue-600 hover:bg-blue-700">
            Obten tu demo personalizada
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  )
}
