import { LucideIcon } from "lucide-react";

export interface StatCard {
  icon: LucideIcon;
  label: string;
  value: number | string;
}

export interface CourseProgress {
  title: string;
  timeRemaining: string;
  progress: number;
  icon: LucideIcon;
}

export interface RecommendedCourse {
  title: string;
  duration: string;
  xp: number;
  icon: LucideIcon;
  description: string; // Añadimos esta propiedad
}

export interface UserProfile {
  name: string;
  avatar: string;
  initials: string;
  streak: number;
  level: number;
  progress: number;
  lessonsCompleted: number;
  lessonsTotal: number;
}
