"use client";
import { Input, Button, Label } from "@/components";

export default function PrivacitySettings() {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-4">
        {/* Cambiar contraseña */}
        <div>
          <Label htmlFor="password">Contraseña actual</Label>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña actual"
            className="mt-1 block w-full rounded-xl border-gray-400 dark:border-neutral-700 focus:border-blue-500"
          />
        </div>
        <div>
          <Label htmlFor="newpassword">Nueva contraseña</Label>
          <Input
            id="newpassword"
            type="password"
            placeholder="Nueva contraseña"
            className="mt-1 block w-full rounded-xl border-gray-400 dark:border-neutral-700 focus:border-primary-focus"
          />
        </div>
        <div>
          <Label htmlFor="confirmpassword">Confirmar contraseña</Label>
          <Input
            id="confirmpassword"
            type="password"
            placeholder="Confirmar contraseña"
            className="mt-1 block w-full rounded-xl border-gray-400 dark:border-neutral-700 focus:border-primary-focus"
          />
        </div>
      </div>
      <Button
        title="Guardar"
        type="submit"
        className="w-full bg-primaryper hover:bg-primary-hover text-white mt-6"
      >
        Guardar cambios
      </Button>
    </div>
  );
}
