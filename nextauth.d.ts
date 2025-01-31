import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      lastname: string;
      email: string;
      role: string;
      image?: string;
      streaks: number;
      exp: number;
      companyId: string;
      learningPreferences?: {
        formats: string[];
        learningStyleKolb: string;
        availableTime: number;
        goals: string[];
        strengths: string[];
        skillLevel?: number;
        improvementAreas: string[];
      };
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
    image?: string;
    streaks: number;
    exp: number;
    companyId: string;
    learningPreferences?: {
      formats: string[];
      learningStyleKolb: string;
      availableTime: number;
      goals: string[];
      strengths: string[];
      skillLevel?: number;
      improvementAreas: string[];
    };
  }
}
