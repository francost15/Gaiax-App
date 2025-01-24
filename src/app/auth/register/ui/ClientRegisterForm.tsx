"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";

import { registerUser, login } from "@/actions";
import {
  Button,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components";
import { LearningStyle, Role } from "@/interface";

// Define los tipos según los campos de tu formulario
type FormInputs = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
  company: string;
  LearningStyle: LearningStyle;
  // Si quieres capturar streaks, exp, isAdmin, learningStyle, agrégalos aquí
};

type Company = {
  id: string;
  name: string;
};

export default function ClientRegisterForm(props: { companies: Company[] }) {
  const { companies } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  const roles = Object.values(Role); // ← Obtiene los valores del enum Role

  // Ajusta la firma de “registerUser” a los parámetros correctos,
  // usando valores por defecto para los que no vengan del formulario
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");

    const { name, lastname, email, password, role, company } = data;
    const streaks = 0; // Valor por defecto o ajusta según tu lógica
    const exp = 0; // Valor por defecto
    const isAdmin = false;
    const learningStyle = LearningStyle.Nulo; // Valor por defecto

    // Llamada a tu acción asíncrona con los parámetros requeridos
    const resp = await registerUser(
      name,
      lastname,
      email,
      password,
      streaks,
      exp,
      isAdmin,
      role,
      company,
      learningStyle
    );

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    // Si todo sale bien, iniciar sesión
    await login(email.toLowerCase(), password);
    window.location.replace("/app");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 dark:bg-neutral-800 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center">
            <span className="text-gray-900 dark:text-white">Crear</span>{" "}
            <span className="text-primaryper">una cuenta</span>
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
            Regístrate para comenzar tu viaje de aprendizaje
          </p>
        </div>

        {/* Error global si el registro falla */}
        {errorMessage && (
          <p className="text-sm text-center text-red-500">{errorMessage}</p>
        )}

        {/* Formulario con tu diseño original */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div className="flex -space-x-px">
              <div className="flex-1 w-1/2 min-w-0">
                <Label htmlFor="name" className="text-gray-500">
                  Nombre
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  className={clsx(
                    "block w-full px-3 py-2 border bg-white placeholder-gray-500 text-gray-900 rounded-tl-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm",
                    {
                      "border-red-500": errors.name,
                      "border-gray-300": !errors.name,
                    }
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex-1 w-1/2 min-w-0">
                <Label htmlFor="lastname" className="text-gray-500">
                  Apellidos
                </Label>
                <Input
                  id="lastname"
                  type="text"
                  placeholder="Apellidos"
                  {...register("lastname", {
                    required: "Los apellidos son obligatorios",
                  })}
                  className={clsx(
                    "block w-full px-3 py-2 border bg-white placeholder-gray-500 text-gray-900 rounded-tr-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm",
                    {
                      "border-red-500": errors.lastname,
                      "border-gray-300": !errors.lastname,
                    }
                  )}
                />
                {errors.lastname && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-500">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Correo electrónico"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Correo inválido",
                  },
                })}
                className={clsx(
                  "block w-full px-3 py-2 border bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm",
                  {
                    "border-red-500": errors.email,
                    "border-gray-300": !errors.email,
                  }
                )}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-500">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                })}
                className={clsx(
                  "block w-full px-3 py-2 border bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm",
                  {
                    "border-red-500": errors.password,
                    "border-gray-300": !errors.password,
                  }
                )}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="role" className="text-gray-500">
                Puesto
              </Label>
              <Select
                onValueChange={(value) => setValue("role", value as Role)}
              >
                <SelectTrigger
                  className={clsx(
                    "w-full px-3 py-2 border bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm",
                    {
                      "border-red-500": errors.role,
                      "border-gray-300": !errors.role,
                    }
                  )}
                >
                  <SelectValue placeholder="Selecciona tu puesto" />
                </SelectTrigger>
                <SelectContent className="bg-white border-none dark:bg-neutral-800">
                  {roles.map((p) => (
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
              {errors.role && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="company" className="text-gray-500">
                Empresa
              </Label>
              <Select onValueChange={(value) => setValue("company", value)}>
                <SelectTrigger
                  className={clsx(
                    "w-full px-3 py-2 border bg-white placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-focus focus:border-primary-focus sm:text-sm",
                    {
                      "border-red-500": errors.company,
                      "border-gray-300": !errors.company,
                    }
                  )}
                >
                  <SelectValue placeholder="Selecciona tu empresa" />
                </SelectTrigger>
                <SelectContent className="bg-white border-none dark:bg-neutral-800">
                  {companies.map((e) => (
                    <SelectItem
                      key={e.id}
                      value={e.id}
                      className="data-[highlighted]:bg-primaryper data-[highlighted]:text-white"
                    >
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              name="submit"
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-xl bg-primaryper hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus"
              aria-label="Registrarse"
            >
              Registrarse
            </Button>
          </div>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800 dark:text-white">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login">
          <div className="p-2 mt-4 text-center border-2 border-primaryper hover:bg-primary-hover rounded-xl hover:text-white">
            Ingresar con tu cuenta
          </div>
        </Link>
      </div>
    </div>
  );
}
