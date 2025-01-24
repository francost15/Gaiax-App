import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export enum LearningStyle {
  Visual = "Visual",
  Auditivo = "Auditivo",
  Kinestesico = "Kinestesico",
  Nulo = "Nulo",
}

export enum Role {
  admin = "admin",
  manager = "manager",
  supervisor = "supervisor",
  employee = "employee",
  intern = "intern",
  hr = "hr", // Recursos Humanos
  it = "it", // Tecnología de la Información
  sales = "sales", // Ventas
  marketing = "marketing", // Marketing
  finance = "finance", // Finanzas
  support = "support", // Soporte
  other = "other",
}

// Datos iniciales
const memberships = [
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

const companies = [
  {
    name: "TechCorp",
    address: "123 Silicon Valley",
    phone: "1234567890",
    membershipId: "", // Se asignará dinámicamente
  },
];

const users = [
  {
    name: "Franco",
    lastname: "Sanchez",
    email: "franco@example.com",
    password: bcrypt.hashSync("rojito33"),
    streaks: 5,
    exp: 100,
    role: Role.admin,
    companyId: "", // Se asignará dinámicamente
    learningStyle: LearningStyle.Visual,
  },
];

const categories = [
  {
    name: "Programación",
    description: "Cursos y contenido de desarrollo de software",
  },
  { name: "Diseño", description: "Material para diseño gráfico y UX/UI" },
];

const contents = [
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
