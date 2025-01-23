import { AchievementFilter, AchievementList } from "@/components";

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/4">
          <AchievementFilter />
        </aside>
        <main className="w-full md:w-3/4">
          <AchievementList />
        </main>
      </div>
    </div>
  );
}
