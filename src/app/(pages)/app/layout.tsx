import { auth } from "@/auth.config";
import {
  Chatbot,
  FloatingCard,
  MobileFooter,
  NavbarApp,
  Sidebar,
} from "@/components";
import { LearningStyle } from "@/interface";

import { redirect } from "next/navigation";

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
    <div className="flex min-h-screen text-gray-900 bg-gray-50 dark:bg-neutral-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-screen mx-auto">
        <NavbarApp
          name={session.user.name + " " + session.user.lastname}
          email={session.user.email}
          role={session.user.role}
        />
        <main className="flex-1">
          {showFloatingCard && <FloatingCard />}
          {children}
        </main>
        <MobileFooter />
      </div>
      <Chatbot />
    </div>
  );
}
