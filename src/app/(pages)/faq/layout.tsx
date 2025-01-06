import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaiax - Preguntas Frecuentes",
  description: "Plataforma de aprendizaje adaptativo basada en IA",
//   opwn grap sirve para que las redes sociales puedan mostrar la información de la página
  openGraph: {
    title: 'Gaiax - Preguntas Frecuentes",',
    description: 'Plataforma de aprendizaje adaptativo basada en IA',
    type: 'website',
    locale: 'es_ES',
  }

};

export default function FaqLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>{children}</section>
  }