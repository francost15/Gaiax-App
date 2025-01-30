import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test",
  description: "Personaliza tu experiencia de aprendizaje en gX Learning.",
};

export default function LayoutTestApp({
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
