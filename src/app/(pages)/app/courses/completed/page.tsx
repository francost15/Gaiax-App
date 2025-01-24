import { CompletedCoursesFilter, CompletedCoursesList } from "@/components";

export default function CompletedCoursesPage() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full md:w-1/4">
          <CompletedCoursesFilter />
        </aside>
        <main className="w-full md:w-3/4">
          <CompletedCoursesList />
        </main>
      </div>
    </div>
  );
}
