import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user.role !== "admin") {
    redirect("/app");
  }
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
