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
      isAdmin: boolean;
      companyId: string;
      learningStyle: string;
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
    isAdmin: boolean;
    companyId: string;
    learningStyle: string;
  }
}
