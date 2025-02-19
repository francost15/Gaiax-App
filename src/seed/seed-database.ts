// seed.ts

import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Eliminar datos existentes en el orden correcto
  await prisma.userArchivement.deleteMany({});
  await prisma.userLessonProgress.deleteMany({});
  await prisma.userProgress.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.feedback.deleteMany({});
  await prisma.testResult.deleteMany({});
  await prisma.learningPreferences.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.content.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.requirementCompany.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.achievement.deleteMany({});
  await prisma.membership.deleteMany({});
  await prisma.company.deleteMany({});

  // 2. Crear Membresías
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

  // 3. Crear Empresas
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

  // 4. Crear Categorías
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




  // 8. Crear Usuarios
  // Hashear contraseñas
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword2 = await bcryptjs.hash("password123", salt);
  const hashedPassword3 = await bcryptjs.hash("password123", salt);



  const user2 = await prisma.user.create({
    data: {
      name: "María",
      lastname: "López",
      email: "maria.lopez@example.com",
      password: hashedPassword2,
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
      password: hashedPassword3,
      streaks: 7,
      exp: 150,
      role: "employee",
      companyId: companyB.id,
    },
  });

  // 9. Crear LearningPreferences para Usuarios
  

  // 10. Crear Achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      name: "Primer Paso",
      description: "Has completado tu primera lección.",
      exp: 10,
    },
  });

  const achievement2 = await prisma.achievement.create({
    data: {
      name: "Curso Completado",
      description: "Has completado un curso completo.",
      exp: 50,
    },
  });

  // 11. Asociar Achievements a Usuarios
  await prisma.userArchivement.createMany({
    data: [
      {
        userId: user2.id,
        achievementId: achievement1.id,
        date: new Date(),
      },
      {
        userId: user3.id,
        achievementId: achievement1.id,
        date: new Date(),
      },
    ],
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
