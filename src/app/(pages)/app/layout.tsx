import { Chatbot, NavbarApp, Sidebar, FloatingCard } from "@/components";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { LearningStyle } from "@/interface";

export default async function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  const showFloatingCard = session.user.learningStyle === LearningStyle.Nulo;

  return (
    <div className="text-gray-900 bg-gray-50 dark:bg-neutral-800 dark:text-gray-100">
      <Sidebar />
      <div>
        <NavbarApp />
        <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
          {showFloatingCard && <FloatingCard />}
          {children}
        </main>
      </div>
      <Chatbot />
    </div>
  );
}
