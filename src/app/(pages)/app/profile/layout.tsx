import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil",
  description: "Personaliza tu perfil en gX Learning.",
};

export default function LayoutProfile({
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
