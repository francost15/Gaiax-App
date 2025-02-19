import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import { AdminSidebar } from "@/components";

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
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1">
        {children}
        <Toaster />
      </main>
    </div>
  );
}
