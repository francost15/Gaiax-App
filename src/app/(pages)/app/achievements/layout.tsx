import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logros",
  description: "Personaliza tu perfil en gX Learning.",
};

export default function LayoutAchievements({
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
