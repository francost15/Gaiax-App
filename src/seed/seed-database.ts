import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export enum LearningStyle {
  Visual = "Visual",
  Auditivo = "Auditivo",
  Kinestesico = "Kinestesico",
}

export enum Role {
  admin = "admin",
  user = "user",
}

// Company
export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  membershipId: string;
  users: User[];
  requirements: RequirementCompany[];
}

// Membership
export interface Membership {
  id: string;
  name: string;
  description: string;
  price: number;
  limitUsers: number;
  companies: Company[];
}

// User
export interface User {
  id: string;
  name: string;
  lastname: string;
  direction?: string | null;
  phone: string;
  email: string;
  password: string;
  streaks: number;
  exp: number;
  isAdmin: boolean;
  role: Role;
  companyId: string;
  learningStyle: LearningStyle;
  UserArchivement: UserArchivement[];
  UserProgress: UserProgress[];
  UserLessonProgress: UserLessonProgress[];
}

// Category
export interface Category {
  id: string;
  name: string;
  description: string;
  contents: Content[];
  courses: Course[];
  requirements: RequirementCompany[];
}

// Content
export interface Content {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  type: LearningStyle;
  categoryId: string;
}

// RequirementCompany
export interface RequirementCompany {
  id: string;
  name: string;
  description: string;
  companyId: string;
  categoryId: string;
}

// Achievement
export interface Achievement {
  id: string;
  name: string;
  description: string;
  exp: number;
  users: UserArchivement[];
}

// UserArchivement
export interface UserArchivement {
  id: string;
  userId: string;
  achievementId: string;
  date: Date;
}

// Course
export interface Course {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  categoryId: string;
  lessons: Lesson[];
  UserProgress: UserProgress[];
}

// Lesson
export interface Lesson {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  exp: number;
  courseId: string;
  userProgressId?: string | null;
  UserLessonProgress: UserLessonProgress[];
}

// UserLessonProgress
export interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: Date | null;
  userProgressId?: string | null;
}

// UserProgress
export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonsCompleted: UserLessonProgress[];
  progress: number;
  Lesson: Lesson[];
}

// Datos iniciales
const memberships: Omit<Membership, "id" | "companies">[] = [
  {
    name: "Basic",
    description: "Acceso limitado a recursos y cursos.",
    price: 19.99,
    limitUsers: 10,
  },
  {
    name: "Pro",
    description: "Acceso completo a recursos y cursos.",
    price: 49.99,
    limitUsers: 50,
  },
];

const companies: Omit<Company, "id" | "users" | "requirements">[] = [
  {
    name: "TechCorp",
    address: "123 Silicon Valley",
    phone: "1234567890",
    membershipId: "", // Se asignará dinámicamente
  },
];

const users: Omit<
  User,
  "id" | "UserArchivement" | "UserProgress" | "UserLessonProgress"
>[] = [
  {
    name: "Franco",
    lastname: "Sanchez",
    direction: "Calle 1, Ciudad",
    phone: "5551234567",
    email: "franco@example.com",
    password: bcrypt.hashSync("rojito33"),
    streaks: 5,
    exp: 100,
    isAdmin: false,
    role: Role.user,
    companyId: "", // Se asignará dinámicamente
    learningStyle: LearningStyle.Visual,
  },
];

const categories: Omit<
  Category,
  "id" | "contents" | "courses" | "requirements"
>[] = [
  {
    name: "Programación",
    description: "Cursos y contenido de desarrollo de software",
  },
  { name: "Diseño", description: "Material para diseño gráfico y UX/UI" },
];

const contents: Omit<Content, "id">[] = [
  {
    title: "Introducción a JavaScript",
    description: "Curso básico de JavaScript para principiantes.",
    url: "https://example.com/javascript",
    exp: 50,
    type: LearningStyle.Visual,
    categoryId: "", // Se asignará dinámicamente
  },
];

// Función principal para insertar datos
async function main() {
  console.log("Seeding database...");

  // Crear membresías
  for (const membership of memberships) {
    const createdMembership = await prisma.membership.create({
      data: membership,
    });
    companies[0].membershipId = createdMembership.id;
  }

  // Crear empresas
  for (const company of companies) {
    const createdCompany = await prisma.company.create({
      data: company,
    });
    users[0].companyId = createdCompany.id;
  }

  // Crear usuarios
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  // Crear categorías
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
        // No agregamos contents, courses o requirements en esta fase
      },
    });
    contents[0].categoryId = createdCategory.id;
  }

  // Crear contenidos
  for (const content of contents) {
    await prisma.content.create({
      data: content,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
