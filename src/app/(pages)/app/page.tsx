"use client";
import {
  CoursesProgress,
  ProgressOverview,
  RecommendedCourses,
  WelcomeSection,
} from "@/components";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <WelcomeSection name={user?.name ?? ""} lastname={user?.lastname ?? ""} />
      <ProgressOverview xp={user?.exp ?? 0} lesson={0} progress={0} />
      <CoursesProgress />
      <RecommendedCourses />
    </div>
  );
}
