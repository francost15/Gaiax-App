"use client";

import { useCallback, useEffect } from "react";
import { Eye, Ear, Hand } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  Progress_testVAK,
  Testvak_alert,
} from "@/components";
import { toast } from "sonner";
import { useVAKStore } from "@/store";
import { updateUserStyleLearning } from "@/actions";
import { LearningStyle } from "@/interface";

interface VAKResultProps {
  userId?: string; // Recibe el userId a través de props
  results: { V: number; A: number; K: number };
  onReset: () => void;
}

export default function VAKResult({
  userId,
  results,
  onReset,
}: VAKResultProps) {
  const shouldShowToast = useVAKStore((state) => state.shouldShowToast);
  const setShouldShowToast = useVAKStore((state) => state.setShouldShowToast);

  const total = results.V + results.A + results.K;
  const getPercentage = (value: number) => Math.round((value / total) * 100);

  // Ordena y toma solo el estilo dominante, ignorando empates

  const learningStyles = [
    { type: LearningStyle.Visual, value: results.V, icon: Eye },
    { type: LearningStyle.Auditivo, value: results.A, icon: Ear },
    { type: LearningStyle.Kinestesico, value: results.K, icon: Hand },
  ].sort((a, b) => b.value - a.value);

  const dominant = learningStyles[0];

  const handleSaveStyle = useCallback(async () => {
    // Solo llama a la acción si conoces el userId
    if (!userId) {
      toast.error("No se encontró el usuario para actualizar.");
      return;
    }

    // Llamada directa a la Server Action
    const result = await updateUserStyleLearning(userId, dominant.type);
    if (result.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }, [userId, dominant.type]);

  useEffect(() => {
    if (!shouldShowToast) return;
    toast.success(`Estilo de aprendizaje guardado: ${dominant.type}`, {
      description: "La IA adaptará tu experiencia a tus preferencias.",
    });
    setShouldShowToast(false);
  }, [shouldShowToast, dominant.type, setShouldShowToast]);

  return (
    <Card className="bg-white dark:bg-neutral-900 shadow-lg border-none">
      <CardContent className="p-6 pt-8">
        <p className="text-center mb-4 text-gray-600 dark:text-gray-400">
          Tu estilo predominante es{" "}
          <strong className="text-primaryper">{dominant.type}</strong> con{" "}
          {getPercentage(dominant.value)}%
        </p>

        {/* Descripción o más contenido */}
        {/* Barra de progreso */}
        <Progress_testVAK
          learningStyles={learningStyles}
          getPercentage={getPercentage}
        />

        {/* Acciones */}
        <div className="mt-6 space-y-2">
          <Testvak_alert dominant={dominant.type} userId={userId} />
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full border-primaryper dark:hover:bg-neutral-800/60 hover:bg-neutral-200/60"
          >
            Realizar el test nuevamente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
