import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking",
  description: "Ranking de la app",
};

export default function LayoutRanking({
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
