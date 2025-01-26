import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos completados",
  description: "Cursos completados de la plataforma Gaiax",
};

export default function LayoutCoursesCompleted({
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
