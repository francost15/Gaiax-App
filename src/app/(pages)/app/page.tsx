import { CoursesProgress, ProgressOverview, RecommendedCourses, WelcomeSection } from "@/components";





export default async function Dashboard() {

  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <WelcomeSection />
      <ProgressOverview />
      <CoursesProgress />
      <RecommendedCourses />
    </div>
  );
}