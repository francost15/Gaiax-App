"use client";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components";
import { useRouter } from "next/navigation";

export const FloatingCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsVisible(false);
    router.push("/app/test");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <Card className="dark:bg-neutral-900 bg-white dark:text-white text-gray-900 border-none shadow-2xl rounded-lg w-full max-w-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Atención</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <p className="mb-8 text-center text-xl">
            Te invitamos a completar este cuestionario. Nos ayudará a
            identificar tus preferencias de aprendizaje y a personalizar tu
            experiencia en GaiaX de manera óptima.
          </p>
          <Button
            onClick={handleButtonClick}
            className="w-full bg-primaryper text-white hover:bg-primary-hover rounded-xl py-4 text-xl font-semibold transition-transform transform hover:scale-105"
          >
            Ir al Test VAK
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
