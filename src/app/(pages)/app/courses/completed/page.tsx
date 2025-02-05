import { CompletedCoursesFilter, CompletedCoursesList } from "@/components";

export default function CompletedCoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Filtro colocado arriba */}
        <CompletedCoursesFilter />
        {/* Lista colocada debajo */}
        <CompletedCoursesList />
      </div>
    </div>
  );
}
