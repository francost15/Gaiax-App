"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // <-- para redirigir en cliente
import { signOut } from "next-auth/react"; // <-- para cerrar sesión si usas NextAuth
import { useVAKStore } from "@/store";
import { LearningStyle } from "@/interface";
import { updateUserStyleLearning } from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@/components";

interface Props {
  userId?: string;
  dominant: string;
}

export const Testvak_alert = ({ userId, dominant }: Props) => {
  const router = useRouter();
  const setShouldShowToast = useVAKStore((state) => state.setShouldShowToast);
  const isDialogOpen = useVAKStore((state) => state.isDialogOpen);
  const setIsDialogOpen = useVAKStore((state) => state.setIsDialogOpen);

  const handleSaveStyle = useCallback(() => {
    setIsDialogOpen(true);
  }, [setIsDialogOpen]);

  const handleConfirmSave = useCallback(async () => {
    try {
      setIsDialogOpen(false);

      if (!userId) {
        toast.error("No se encontró el usuario para actualizar.");
        return;
      }

      // 1) Actualizar estilo de aprendizaje
      const result = await updateUserStyleLearning(
        userId,
        dominant as LearningStyle
      );
      if (result.ok) {
        toast.success(result.message);
        setShouldShowToast(true);
        // 2) Redirigir al home ("/") después de guardar
        signOut(); // Llama a signOut() para desconectar y enviarlo a /api/auth/signin
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("No se pudo actualizar el estilo de aprendizaje.");
    }
  }, [router, userId, dominant, setIsDialogOpen, setShouldShowToast]);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full bg-primaryper hover:bg-primary-hover text-white"
          onClick={handleSaveStyle}
        >
          Guardar Aprendizaje
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-neutral-900 border-none bg-neutral-100">
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Quieres guardar tu estilo de aprendizaje?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Reconoceremos tu estilo predominante ({dominant}) y adaptaremos el
            contenido a tu preferencia.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-none hover:bg-red-600/60 dark:hover:bg-red-600/20 border-red-600 text-red-600 hover:text-white rounded-xl"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primaryper hover:bg-primary-hover rounded-xl text-white"
            onClick={handleConfirmSave}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
