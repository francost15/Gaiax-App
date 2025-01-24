"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useActionState } from "react";
import { Input, Label } from "@/components";
import { IoInformationOutline } from "react-icons/io5";
import { authenticate } from "@/actions";
import clsx from "clsx";
import { useFormStatus } from "react-dom";

export default function LoginPage() {
  const [state, dispatch] = useActionState(authenticate, undefined);

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/app");
    }
  }, [state]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-800">
      <div className="flex items-center justify-center flex-1 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center">
              <span className="text-gray-900 dark:text-white">Iniciar</span>{" "}
              <span className="text-primaryper">sesión</span>
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
              Accede a tu cuenta para comenzar
            </p>
          </div>

          <form className="mt-8 space-y-6" action={dispatch}>
            <div className="-space-y-px rounded-md shadow-sm">
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
                  placeholder="prueba@google.com"
                  className="px-5 py-2 mb-5 text-black bg-gray-200 border-2 border-gray-200 rounded focus:border-primaryper"
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
                  autoComplete="password"
                  required
                  placeholder="Ingrese su contraseña"
                  className="px-5 py-2 mb-5 text-black bg-gray-200 border-2 border-gray-200 rounded focus:border-primaryper"
                />
              </div>
            </div>

            <div
              className="flex items-end h-8 space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {state === "CredentialsSignin" && (
                <div className="flex flex-row mb-2">
                  <IoInformationOutline className="w-5 h-5 text-red-500" />
                  <p className="text-sm text-red-500">
                    Credenciales no son correctas
                  </p>
                </div>
              )}
            </div>

            <LoginButton />

            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-gray-500"></div>
              <div className="px-2 text-gray-800 dark:text-white">O</div>
              <div className="flex-1 border-t border-gray-500"></div>
            </div>
            <Link href="/auth/register">
              <div className="p-2 mt-4 text-center border-2 border-primaryper hover:bg-primary-hover hover:text-white rounded-xl">
                Crear una nueva cuenta
              </div>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        " bg-primaryper hover:bg-primary-hover dark:text-white p-3 w-full rounded-xl":
          !pending,
        "bg-neutral-300 hover:bg-neutral-400 p-3 w-full rounded-xl": pending,
      })}
      disabled={pending}
    >
      <span className="text-white">Ingresar</span>
    </button>
  );
}
