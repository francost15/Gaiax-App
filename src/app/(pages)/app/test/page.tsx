import { Toaster } from "sonner";
import { auth } from "@/auth.config";
import TestApp from "./card-test/test-app";

export default async function TestPage() {
  const session = await auth();
  const userId = session?.user?.id ?? "";

  return (
    <div>
      <TestApp />
      <Toaster position="top-right" richColors />
    </div>
  );
}
