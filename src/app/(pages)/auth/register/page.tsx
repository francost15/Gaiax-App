'use client'

import { useState } from 'react'
import Link from "next/link"
import { Button, Input, Label } from '@/components'


export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Iniciar sesión
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Accede a tu cuenta para comenzar
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email-address" className="sr-only">
                  Correo electrónico
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#6366F1] focus:border-[#6366F1] focus:z-10 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#6366F1] focus:border-[#6366F1] focus:z-10 sm:text-sm"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                title='Recordarme'
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#6366F1] focus:ring-[#6366F1] border-gray-300 rounded"
                />
                <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </Label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-[#6366F1] hover:text-[#5558DD]">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6366F1] hover:bg-[#5558DD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366F1]"
              >
                Iniciar sesión
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link href="/register" className="font-medium text-[#6366F1] hover:text-[#5558DD]">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

