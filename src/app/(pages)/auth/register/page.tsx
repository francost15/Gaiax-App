'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button, Input, Label, Progress, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components'
import { puestos, empresas } from "@/data"
import { calculatePasswordStrength, validateField } from '@/utils'

export default function RegisterPage() {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [puesto, setPuesto] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password))
  }, [password])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fields = { nombre, apellidos, email, password, puesto, empresa }
    Object.entries(fields).forEach(([key, value]) => validateField(key, value, setErrors))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">
  <span className="text-gray-900">Crear</span> <span className="text-primaryper">una cuenta</span>
</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Regístrate para comenzar tu viaje de aprendizaje
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex -space-x-px">
              <div className="w-1/2 flex-1 min-w-0">
                <Label htmlFor="nombre" className="text-gray-500">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 sm:text-sm`}
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value)
                    validateField('nombre', e.target.value, setErrors)
                  }}
                  onBlur={() => validateField('nombre', nombre, setErrors)}
                />
                {errors.nombre && <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>}
              </div>
              <div className="w-1/2 flex-1 min-w-0">
                <Label htmlFor="apellidos" className="text-gray-500">Apellidos</Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.apellidos ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 sm:text-sm`}
                  placeholder="Apellidos"
                  value={apellidos}
                  onChange={(e) => {
                    setApellidos(e.target.value)
                    validateField('apellidos', e.target.value, setErrors)
                  }}
                  onBlur={() => validateField('apellidos', apellidos, setErrors)}
                />
                {errors.apellidos && <p className="mt-1 text-xs text-red-500">{errors.apellidos}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-500">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 sm:text-sm`}
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  validateField('email', e.target.value, setErrors)
                }}
                onBlur={() => validateField('email', email, setErrors)}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-500">Contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 sm:text-sm`}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  validateField('password', e.target.value, setErrors)
                }}
                onBlur={() => validateField('password', password, setErrors)}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>
            <div className="px-3 py-2 bg-white border border-gray-300">
              <Label htmlFor="password-strength" className="text-gray-500">Seguridad de la contraseña</Label>
              <Progress value={passwordStrength} className="w-full h-2" />
            </div>
            <div>
              <Label htmlFor="puesto" className="text-gray-500">Puesto</Label>
              <Select 
                onValueChange={(value) => {
                  setPuesto(value)
                  validateField('puesto', value, setErrors)
                }}
                value={puesto}
              >
                <SelectTrigger className={`w-full px-3 py-2 border ${errors.puesto ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 sm:text-sm`}>
                  <SelectValue placeholder="Selecciona tu puesto" />
                </SelectTrigger>
                <SelectContent>
                  {puestos.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.puesto && <p className="mt-1 text-xs text-red-500">{errors.puesto}</p>}
            </div>
            <div>
              <Label htmlFor="empresa" className="text-gray-500">Empresa</Label>
              <Select 
                onValueChange={(value) => {
                  setEmpresa(value)
                  validateField('empresa', value, setErrors)
                }}
                value={empresa}
              >
                <SelectTrigger className={`w-full px-3 py-2 border ${errors.empresa ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus focus:z-10 sm:text-sm`}>
                  <SelectValue placeholder="Selecciona tu empresa" />
                </SelectTrigger>
                <SelectContent>
                  {empresas.map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.empresa && <p className="mt-1 text-xs text-red-500">{errors.empresa}</p>}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryper hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
            >
              Registrarse
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/auth/login" className="font-medium text-primaryper hover:text-primary-hover">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}