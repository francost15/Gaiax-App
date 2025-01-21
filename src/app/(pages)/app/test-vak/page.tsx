import { Toaster } from "sonner";
import VAKTest from "./card-test-vak/vak-test";
import { auth } from "@/auth.config";

export default async function VAKTestPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Test de Estilo de Aprendizaje VAK
      </h1>
      <VAKTest userId={userId} />
      <Toaster position="top-right" richColors />
    </div>
  );
}
