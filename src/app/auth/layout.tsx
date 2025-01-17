import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { NavbarAuth } from "@/components";

export const metadata: Metadata = {
  title: "Gaiax - Auth",
  description: "Plataforma de aprendizaje adaptativo basada en IA",
  //   opwn grap sirve para que las redes sociales puedan mostrar la información de la página
  openGraph: {
    title: "Gaiax - App",
    description: "Plataforma de aprendizaje adaptativo basada en IA",
    type: "website",
    locale: "es_ES",
  },
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) {
    redirect("/app");
  }
  return (
    <div>
      <NavbarAuth />
      {children}
    </div>
  );
}
