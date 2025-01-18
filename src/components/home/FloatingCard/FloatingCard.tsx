"use client";
import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components";
import { useRouter } from "next/navigation";

export const FloatingCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const handleButtonClick = () => {
    setIsVisible(false);
    router.push("/app/test-vak");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <Card className="dark:bg-neutral-900 bg-white dark:text-white text-gray-900  border-none shadow-lg rounded-lg w-96">
        <CardHeader>
          <CardTitle className="text-center">Atención</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Es necesario que completes el test VAK. Este test nos ayudará a
            determinar tu estilo de aprendizaje y personalizar tu experiencia de
            la mejor manera
          </p>
          <Button
            onClick={handleButtonClick}
            className="w-full bg-primaryper text-white hover:bg-primary-hover rounded-xl p-4"
          >
            Ir al Test VAK
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
