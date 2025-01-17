import { Metadata } from "next";
import { Toaster } from "sonner";
import VAKTest from "./card-test-vak/vak-test";

export const metadata: Metadata = {
  title: "Test de Estilo de Aprendizaje VAK | gX Learning",
  description:
    "Descubre tu estilo de aprendizaje predominante: Visual, Auditivo o Kinestésico.",
};

export default function VAKTestPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Test de Estilo de Aprendizaje VAK
      </h1>
      <VAKTest />
      <Toaster position="top-right" richColors />
    </div>
  );
}
