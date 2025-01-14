"use client";
import { CoursesProgress, ProgressOverview, RecommendedCourses, WelcomeSection } from "@/components"



const USER = {
  name: "Franco Alessandro",
  avatar: "",
  initials: "FA",
  streak: 7,
  level: 5,
  progress: 60,
  lessonsCompleted: 3,
  lessonsTotal: 5
}

export default function Dashboard() {
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <WelcomeSection  />
      <ProgressOverview user={USER} />
      <CoursesProgress />
      <RecommendedCourses />
    </div>
  )
}

