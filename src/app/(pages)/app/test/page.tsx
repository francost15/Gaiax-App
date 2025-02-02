import { Toaster } from "sonner";
import { auth } from "@/auth.config";
// Asegúrate de importar el componente de test, no el de la pregunta.
import LearningProfileTest from "./card-test/test-app";

export default async function TestPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  return (
    <div>
      <LearningProfileTest userId={userId} />
      <Toaster position="top-right" richColors />
    </div>
  );
}
