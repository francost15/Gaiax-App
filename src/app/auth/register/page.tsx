'use client'

import { useState} from 'react'
import Link from "next/link"
import {Button,Input,Label,Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components'
import { puestos, empresas } from "@/data"
import {validateField } from '@/utils'

export default function RegisterPage() {
  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [puesto, setPuesto] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fields = { nombre, apellidos, email, password, puesto, empresa }
    Object.entries(fields).forEach(([key, value]) => validateField(key, value, setErrors))
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 dark:bg-neutral-800 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">
            <span className="text-gray-900 dark:text-white">Crear</span>{' '}
            <span className="text-primaryper">una cuenta</span>
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
            Regístrate para comenzar tu viaje de aprendizaje
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="flex -space-x-px">
              <div className="flex-1 w-1/2 min-w-0">
                <Label htmlFor="nombre" className="text-gray-500">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  className={`block w-full px-3 py-2 border ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  } bg-white placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm`}
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value)
                    validateField('nombre', e.target.value, setErrors)
                  }}
                  onBlur={() => validateField('nombre', nombre, setErrors)}
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-red-500">{errors.nombre}</p>
                )}
              </div>
              <div className="flex-1 w-1/2 min-w-0">
                <Label htmlFor="apellidos" className="text-gray-500">
                  Apellidos
                </Label>
                <Input
                  id="apellidos"
                  name="apellidos"
                  type="text"
                  required
                  className={`block w-full px-3 py-2 border ${
                    errors.apellidos ? 'border-red-500' : 'border-gray-300'
                  } bg-white placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm`}
                  placeholder="Apellidos"
                  value={apellidos}
                  onChange={(e) => {
                    setApellidos(e.target.value)
                    validateField('apellidos', e.target.value, setErrors)
                  }}
                  onBlur={() => validateField('apellidos', apellidos, setErrors)}
                />
                {errors.apellidos && (
                  <p className="mt-1 text-xs text-red-500">{errors.apellidos}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-500">
                Correo electrónico
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm`}
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  validateField('email', e.target.value, setErrors)
                }}
                onBlur={() => validateField('email', email, setErrors)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-500">
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } placeholder-gray-500 bg-white text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm`}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  validateField('password', e.target.value, setErrors)
                }}
                onBlur={() => validateField('password', password, setErrors)}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <Label htmlFor="puesto" className="text-gray-500">
                Puesto
              </Label>
              <Select
                onValueChange={(value) => {
                  setPuesto(value)
                  validateField('puesto', value, setErrors)
                }}
                value={puesto}
              >
                <SelectTrigger
                  className={`w-full px-3 py-2 border ${
                    errors.puesto ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm`}
                >
                  <SelectValue placeholder="Selecciona tu puesto" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {puestos.map((p) => (
                    <SelectItem
                      key={p}
                      value={p}
                      className="data-[highlighted]:bg-primaryper data-[highlighted]:text-white"
                    >
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.puesto && (
                <p className="mt-1 text-xs text-red-500">{errors.puesto}</p>
              )}
            </div>
            <div>
              <Label htmlFor="empresa" className="text-gray-500">
                Empresa
              </Label>
              <Select
                onValueChange={(value) => {
                  setEmpresa(value)
                  validateField('empresa', value, setErrors)
                }}
                value={empresa}
              >
                <SelectTrigger
                  className={`w-full px-3 py-2 border ${
                    errors.empresa ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 bg-white  rounded-b-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm`}
                >
                  <SelectValue placeholder="Selecciona tu empresa" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-neutral-800 border-none">
                  {empresas.map((e) => (
                    <SelectItem
                      key={e}
                      value={e}
                      className="data-[highlighted]:bg-primaryper data-[highlighted]:text-white "
                    >
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.empresa && (
                <p className="mt-1 text-xs text-red-500">{errors.empresa}</p>
              )}
            </div>
          </div>
          <div>
            <Button
              name="submit"
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-primaryper hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
              aria-label="Registrarse"
            >
              Registrarse
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
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