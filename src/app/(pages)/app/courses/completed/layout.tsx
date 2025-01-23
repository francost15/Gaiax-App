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
    <div className="text-gray-900 bg-gray-50 dark:bg-neutral-800 dark:text-gray-100 ">
      <main className="min-h-screen ">{children}</main>
    </div>
  );
}
