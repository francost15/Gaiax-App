// seed.ts

import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Eliminar datos existentes en el orden correcto para evitar conflictos de claves foráneas
  await prisma.userArchivement.deleteMany({});
  await prisma.userLessonProgress.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.testResult.deleteMany({});
  await prisma.learningPreferences.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.content.deleteMany({});
  await prisma.requirementCompany.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.membership.deleteMany({});
  await prisma.company.deleteMany({});
  await prisma.achievement.deleteMany({});

  // Ahora, insertamos datos de ejemplo

  // Hashear contraseñas
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword1 = await bcryptjs.hash("Francost15", salt);
  const hashedPassword2 = await bcryptjs.hash("password123", salt);
  const hashedPassword3 = await bcryptjs.hash("password123", salt);

  // 1. Crear Membresías
  const basicMembership = await prisma.membership.create({
    data: {
      name: "Basic",
      description: "Plan básico para pequeñas empresas.",
      price: 50.0,
      limitUsers: 50,
    },
  });

  const premiumMembership = await prisma.membership.create({
    data: {
      name: "Premium",
      description: "Plan premium para empresas en crecimiento.",
      price: 150.0,
      limitUsers: 200,
    },
  });

  // 2. Crear Empresas
  const companyA = await prisma.company.create({
    data: {
      name: "Tech Solutions",
      address: "Avenida Siempre Viva 123",
      phone: "555-1234-567",
      membershipId: basicMembership.id,
    },
  });

  const companyB = await prisma.company.create({
    data: {
      name: "Innovate Corp",
      address: "Calle Falsa 456",
      phone: "555-9876-543",
      membershipId: premiumMembership.id,
    },
  });

  // 3. Crear Usuarios
  const user1 = await prisma.user.create({
    data: {
      name: "Carlos",
      lastname: "Gómez",
      email: "ti43243@uvp.edu.mx",
      password: hashedPassword1, // Contraseña hasheada
      streaks: 5,
      exp: 100,
      role: "admin",
      companyId: companyA.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "María",
      lastname: "López",
      email: "maria.lopez@example.com",
      password: hashedPassword2, // Contraseña hasheada
      streaks: 3,
      exp: 80,
      role: "manager",
      companyId: companyA.id,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Juan",
      lastname: "Pérez",
      email: "juan.perez@example.com",
      password: hashedPassword3, // Contraseña hasheada
      streaks: 7,
      exp: 150,
      role: "employee",
      companyId: companyB.id,
    },
  });

  // 5. Crear Categorías
  const categoryTech = await prisma.category.create({
    data: {
      name: "Tecnología",
      description: "Cursos relacionados con habilidades tecnológicas.",
    },
  });

  const categoryManagement = await prisma.category.create({
    data: {
      name: "Gestión",
      description: "Cursos enfocados en habilidades de gestión y liderazgo.",
    },
  });

  // 10. Crear Logros y Asociarlos a Usuarios
  const achievement1 = await prisma.achievement.create({
    data: {
      name: "Primer Paso",
      description: "Has completado tu primera lección.",
      exp: 10,
    },
  });

  await prisma.userArchivement.create({
    data: {
      userId: user1.id,
      achievementId: achievement1.id,
      date: new Date(),
    },
  });

  // 13. Crear Requerimientos de Empresa
  await prisma.requirementCompany.create({
    data: {
      name: "Capacitación en Programación",
      description:
        "Necesitamos que el equipo desarrolle habilidades básicas de programación.",
      companyId: companyA.id,
      categoryId: categoryTech.id,
      skillsDesired: ["Lógica de programación", "Resolución de problemas"],
    },
  });

  console.log("Base de datos inicializada con datos de ejemplo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
