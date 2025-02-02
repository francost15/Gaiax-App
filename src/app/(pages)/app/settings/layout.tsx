import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración",
  description: "Personaliza tu experiencia de aprendizaje en gX Learning.",
};

export default function LayoutSettings({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
