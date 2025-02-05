import { auth } from "@/auth.config";
import {
  FloatingCardChecker,
  Footer,
  MobileFooter,
  NavbarApp,
  NavbarMobileApp,
  Sidebar,
} from "@/components";
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

  return (
    <div className="flex min-h-screen text-gray-900 bg-white dark:bg-neutral-900 dark:text-gray-100">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenedor principal a la derecha */}
      <div className="flex flex-col flex-1 w-full">
        {/* Navbar para pantallas grandes */}
        <NavbarApp
          name={session.user.name + " " + session.user.lastname}
          email={session.user.email}
          role={session.user.role}
        />

        {/* Navbar para pantallas pequeñas */}
        <NavbarMobileApp
          name={session.user.name + " " + session.user.lastname}
          email={session.user.email}
          role={session.user.role}
        />

        {/* Verificar y mostrar FloatingCard si es necesario */}
        <FloatingCardChecker />

        {/* Contenido principal */}
        <main className="flex-1">{children}</main>

        {/* Footer móvil */}
        <MobileFooter />

        {/* Footer principal */}
        <Footer />
      </div>
    </div>
  );
}
