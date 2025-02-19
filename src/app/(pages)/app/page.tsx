"use client";
import {

  RecommendedCourses,
  WelcomeSection,
} from "@/components";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <WelcomeSection name={user?.name ?? ""} lastname={user?.lastname ?? ""}  />
      <RecommendedCourses />
    </div>
  );
}
