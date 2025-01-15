'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button, Input, Label } from '@/components'
import { useFormState, useFormStatus } from "react-dom"

import { IoInformationOutline } from "react-icons/io5"
import { authenticate } from '@/actions'
import clsx from 'clsx'

export default function LoginPage() {

  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    if (state === 'Success') {
      window.location.replace('/')
    }
  }, [state])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              <span className="text-gray-900">Iniciar</span> <span className="text-primaryper">sesión</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Accede a tu cuenta para comenzar
            </p>
          </div>
          <form className="mt-8 space-y-6" action={dispatch}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="text-gray-500">
                  Correo electrónico
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-5 py-2 border bg-gray-200 rounded mb-5"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-500">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-5 py-2 border bg-gray-200 rounded mb-5"
                />
              </div>
            </div>

            <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
              {state === "CredentialsSignin" && (
                <div className="flex flex-row mb-2">
                  <IoInformationOutline className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    Credenciales no son correctas
                  </p>
                </div>
              )}
            </div>

            <LoginButton />

            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-gray-500"></div>
              <div className="px-2 text-gray-800">O</div>
              <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/register" className="btn-secondary text-center">
              Crear una nueva cuenta
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  )
}