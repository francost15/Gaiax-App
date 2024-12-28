import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaiax - Demo Gratis",
  description: "Plataforma de aprendizaje adaptativo basada en IA",
//   opwn grap sirve para que las redes sociales puedan mostrar la información de la página
  openGraph: {
    title: 'Gaiax - Demo Gratis',
    description: 'Plataforma de aprendizaje adaptativo basada en IA',
    type: 'website',
    locale: 'es_ES',
  }

};

export default function DemoLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>{children}</section>
  }