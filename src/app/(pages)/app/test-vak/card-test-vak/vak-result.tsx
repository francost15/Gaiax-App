import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Ear, Hand } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface VAKResultProps {
  results: {
    V: number;
    A: number;
    K: number;
  };
  onReset: () => void;
}

export default function VAKResult({ results, onReset }: VAKResultProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldShowToast, setShouldShowToast] = useState(false);
  const total = results.V + results.A + results.K;
  const getPercentage = (value: number) => Math.round((value / total) * 100);

  const learningStyles = [
    { type: "Visual", value: results.V, icon: Eye, color: "text-[#6366F1]" },
    { type: "Auditivo", value: results.A, icon: Ear, color: "text-[#6366F1]" },
    {
      type: "Kinestésico",
      value: results.K,
      icon: Hand,
      color: "text-[#6366F1]",
    },
  ].sort((a, b) => b.value - a.value);

  const dominantStyles = learningStyles.filter(
    (style) => style.value === learningStyles[0].value
  );
  const isDominantStyleTied = dominantStyles.length > 1;

  const getLearningStyleDescription = useCallback((style: string) => {
    switch (style) {
      case "Visual":
        return "Los aprendices visuales procesan mejor la información a través de imágenes, gráficos y diagramas. Son excelentes en recordar caras y lugares, y suelen tener una buena orientación espacial.";
      case "Auditivo":
        return "Los aprendices auditivos prefieren escuchar y hablar para aprender. Destacan en la música, los idiomas y tienen buena memoria para conversaciones y sonidos.";
      case "Kinestésico":
        return "Los aprendices kinestésicos aprenden mejor a través de la experiencia física y el movimiento. Son hábiles en deportes, baile y suelen tener buena coordinación mano-ojo.";
      default:
        return "";
    }
  }, []);

  const handleSavelearning = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleConfirmSave = useCallback(() => {
    // Aquí iría la lógica para guardar realmente el estilo de aprendizaje
    setShouldShowToast(true);
    setIsDialogOpen(false);
  }, []);

  useEffect(() => {
    if (shouldShowToast) {
      const toastMessage = isDominantStyleTied
        ? `Estilos de aprendizaje guardados exitosamente: ${dominantStyles
            .map((s) => s.type)
            .join(", ")}`
        : `Estilo de aprendizaje guardado exitosamente: ${dominantStyles[0].type}`;

      toast.success(toastMessage, {
        description:
          "La IA adaptará el contenido a tu(s) estilo(s) predominante(s)",
      });
      setShouldShowToast(false);
    }
  }, [shouldShowToast, isDominantStyleTied, dominantStyles]);

  return (
    <Card className="bg-white dark:bg-neutral-900 shadow-lg border-none">
      <CardContent className="p-6 pt-8">
        {isDominantStyleTied ? (
          <p className="text-center mb-4 text-gray-600 dark:text-gray-400">
            Tus estilos predominantes son{" "}
            <strong className="text-[#6366F1]">
              {dominantStyles.map((s) => s.type).join(" y ")}
            </strong>{" "}
            con un {getPercentage(dominantStyles[0].value)}% cada uno
          </p>
        ) : (
          <p className="text-center mb-4 text-gray-600 dark:text-gray-400">
            Tu estilo predominante es{" "}
            <strong className="text-[#6366F1]">{dominantStyles[0].type}</strong>{" "}
            con un {getPercentage(dominantStyles[0].value)}%
          </p>
        )}
        {isDominantStyleTied ? (
          <div className="text-sm text-center mb-8 text-gray-600 dark:text-gray-400">
            {dominantStyles.map((style, index) => (
              <p key={style.type} className={index > 0 ? "mt-4" : ""}>
                <strong>{style.type}:</strong>{" "}
                {getLearningStyleDescription(style.type)}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center mb-8 text-gray-600 dark:text-gray-400">
            {getLearningStyleDescription(dominantStyles[0].type)}
          </p>
        )}
        <div className="space-y-6 mb-8">
          {learningStyles.map(({ type, value, icon: Icon, color }) => (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon className={`w-5 h-5 mr-2 ${color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {type}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {getPercentage(value)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div
                  className="h-1.5 rounded-full bg-[#6366F1]"
                  style={{ width: `${getPercentage(value)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full bg-[#6366F1] hover:bg-[#5558DD] text-white"
                onClick={handleSavelearning}
              >
                Guardar Aprendizaje
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="dark:bg-neutral-950 border-none bg-neutral-100 ">
              <AlertDialogHeader>
                <AlertDialogTitle className="">
                  ¿Estás seguro de guardar tu{isDominantStyleTied ? "s" : ""}{" "}
                  estilo{isDominantStyleTied ? "s" : ""} de aprendizaje?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Una vez guardado, la IA reconocerá tu
                  {isDominantStyleTied ? "s" : ""} estilo
                  {isDominantStyleTied ? "s" : ""} de aprendizaje predominante
                  {isDominantStyleTied ? "s" : ""} (
                  {dominantStyles.map((s) => s.type).join(", ")}) y adaptará el
                  contenido y las actividades a tu
                  {isDominantStyleTied ? "s" : ""} forma
                  {isDominantStyleTied ? "s" : ""} preferida
                  {isDominantStyleTied ? "s" : ""} de aprender.
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
                  Confirmar y Guardar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            onClick={onReset}
            variant="outline"
            className="w-full mt-4 border-primaryper dark:hover:bg-neutral-800/60 hover:bg-neutral-200/60"
          >
            Realizar el test nuevamente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
