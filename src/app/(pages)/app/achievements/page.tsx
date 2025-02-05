import { AchievementFilter, AchievementList } from "@/components";

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Coloca el filtro arriba para mejorar la UI cuando tengas un sidebar */}
      <AchievementFilter />
      <AchievementList />
    </div>
  );
}
