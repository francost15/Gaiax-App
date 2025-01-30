import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components";
import { CheckCircle, Book, Zap, RefreshCw } from "lucide-react";

interface LearningProfileResultProps {
  results: {
    learningStyle: string;
    recommendations: string[];
  };
  onReset: () => void;
}

export default function LearningProfileResult({
  results,
  onReset,
}: LearningProfileResultProps) {
  return (
    <div
      className="border-none overflow-hidden transition-all duration-300 transform
                 opacity-0 scale-95 animate-fade-in-up"
    >
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Tu Perfil de Aprendizaje Personalizado
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 relative z-10">
          <div
            className="transition-all duration-300 transform opacity-0 translate-y-3 
                       animate-fade-in-up delay-100"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
              <Book className="mr-2 h-6 w-6 text-primaryper" />
              Estilo de Aprendizaje: {results.learningStyle}
            </h2>
          </div>

          <div
            className="space-y-4 mb-6 transition-all duration-300 transform opacity-0 
                       translate-y-3 animate-fade-in-up delay-200"
          >
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
              <Zap className="mr-2 h-6 w-6 text-primaryper" />
              Recomendaciones:
            </h3>
            <ul className="space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <li
                  key={index}
                  className={`flex items-start transition-all duration-300 transform opacity-0 translate-x-3 
                             animate-fade-in-left delay-[${(
                               0.3 +
                               index * 0.1
                             ).toFixed(1)}s]`}
                >
                  <CheckCircle className="mr-2 h-5 w-5 text-primaryper flex-shrink-0 mt-1" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {recommendation}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="transition-all duration-300 transform opacity-0 translate-y-3 
                       animate-fade-in-up delay-300"
          >
            <Button
              onClick={onReset}
              className="w-full bg-primaryper hover:bg-[#5558DD] text-white transition-all 
                         duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Realizar el cuestionario nuevamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
