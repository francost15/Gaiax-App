"use client";
import { Input, Button, Label } from "@/components";

export default function PrivacitySettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {/* Cambiar contraseña */}
        <div className=" w-full">
          <Label htmlFor="password">Contraseña actual</Label>
          <Input
            id="password"
            type="password"
            placeholder="Contraseña actual"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="newpassword">Nueva contraseña</Label>
          <Input
            id="newpassword"
            type="password"
            placeholder="Nueva contraseña"
          />
          <Label htmlFor="confirmpassword">Confirmar contraseña</Label>
          <Input
            id="confirmpassword"
            type="password"
            placeholder="Confirmar contraseña"
          />
        </div>
      </div>
      <Button
        title="Guardar"
        type="submit"
        className="w-full bg-primaryper hover:bg-primary-hover text-white"
      >
        Guardar cambios
      </Button>
    </div>
  );
}
