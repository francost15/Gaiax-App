import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos recomendados",
  description: "Cursos recomendados de la plataforma Gaiax",
};

export default function LayoutCoursesRecomended({
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
