// seed.ts

import { PrismaClient } from "@prisma/client";

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
      email: "carlos.gomez@example.com",
      password: "password123",
      streaks: 5,
      exp: 100,
      role: "employee",
      companyId: companyA.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "María",
      lastname: "López",
      email: "maria.lopez@example.com",
      password: "password123",
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
      password: "password123",
      streaks: 7,
      exp: 150,
      role: "employee",
      companyId: companyB.id,
    },
  });

  // 4. Crear Preferencias de Aprendizaje
  await prisma.learningPreferences.create({
    data: {
      userId: user1.id,
      formats: ["Videos cortos.", "Texto interactivo."],
      learningStyleKolb: "Activo",
      availableTime: 10,
      goals: ["Mejorar habilidades técnicas específicas."],
      improvementAreas: [
        "Comunicación efectiva.",
        "Liderazgo y gestión de equipos.",
      ],
      skillLevel: 3,
    },
  });

  await prisma.learningPreferences.create({
    data: {
      userId: user2.id,
      formats: ["Lecturas profundas.", "Podcasts."],
      learningStyleKolb: "Reflexivo",
      availableTime: 15,
      goals: ["Desarrollar habilidades de liderazgo y gestión."],
      improvementAreas: [
        "Gestión del tiempo y productividad.",
        "Inteligencia emocional y manejo del estrés.",
      ],
      skillLevel: 4,
    },
  });

  await prisma.learningPreferences.create({
    data: {
      userId: user3.id,
      formats: ["Juegos y desafíos.", "Flashcards."],
      learningStyleKolb: "Pragmático",
      availableTime: 5,
      goals: ["Aumentar la productividad y eficiencia."],
      improvementAreas: [
        "Resolución de problemas y pensamiento crítico.",
        "Creatividad e innovación.",
      ],
      skillLevel: 2,
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

  // 6. Crear Contenido
  const content1 = await prisma.content.create({
    data: {
      title: "Introducción a la Programación",
      description: "Aprende los conceptos básicos de programación.",
      url: "https://example.com/intro-programacion",
      exp: 20,
      type: "Texto interactivo.",
      categoryId: categoryTech.id,
    },
  });

  const content2 = await prisma.content.create({
    data: {
      title: "Liderazgo Efectivo",
      description: "Desarrolla habilidades para liderar equipos con éxito.",
      url: "https://example.com/liderazgo-efectivo",
      exp: 30,
      type: "Videos cortos.",
      categoryId: categoryManagement.id,
    },
  });

  // 7. Crear Cursos
  const course1 = await prisma.course.create({
    data: {
      title: "Fundamentos de Programación",
      description: "Curso básico para iniciar en el mundo de la programación.",
      url: "https://example.com/fundamentos-programacion",
      exp: 100,
      categoryId: categoryTech.id,
      learningObjectives: [
        "Entender conceptos básicos",
        "Escribir código simple",
      ],
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Habilidades de Liderazgo",
      description: "Mejora tus capacidades para liderar equipos.",
      url: "https://example.com/habilidades-liderazgo",
      exp: 120,
      categoryId: categoryManagement.id,
      learningObjectives: ["Comunicación efectiva", "Gestión de equipos"],
    },
  });

  // 8. Crear Lecciones
  const lesson1 = await prisma.lesson.create({
    data: {
      title: "Variables y Tipos de Datos",
      description: "Aprende sobre variables y cómo utilizarlas.",
      url: "https://example.com/variables-tipos",
      exp: 20,
      courseId: course1.id,
      learningObjectives: ["Declarar variables", "Entender tipos de datos"],
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: "Control de Flujo",
      description: "Conoce las estructuras condicionales y bucles.",
      url: "https://example.com/control-flujo",
      exp: 20,
      courseId: course1.id,
      learningObjectives: ["Escribir condicionales", "Implementar bucles"],
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      title: "Estilos de Liderazgo",
      description: "Descubre los diferentes estilos y cuándo aplicarlos.",
      url: "https://example.com/estilos-liderazgo",
      exp: 30,
      courseId: course2.id,
      learningObjectives: [
        "Identificar estilos",
        "Aplicar en situaciones reales",
      ],
    },
  });

  // 9. Crear Progreso del Usuario en Cursos y Lecciones
  const userProgress1 = await prisma.userProgress.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
      progress: 50,
    },
  });

  await prisma.userLessonProgress.create({
    data: {
      userId: user1.id,
      lessonId: lesson1.id,
      completed: true,
      completedAt: new Date(),
      userProgressId: userProgress1.id,
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

  // 11. Crear Notificaciones
  await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        title: "¡Felicidades!",
        message: 'Has obtenido el logro "Primer Paso".',
        notificationType: "Logro",
        isRead: false,
      },
      {
        userId: user1.id,
        title: "Nueva Lección Disponible",
        message: 'Continúa con tu curso "Fundamentos de Programación".',
        notificationType: "Recordatorio",
        isRead: false,
        courseId: course1.id,
      },
    ],
  });

  // 12. Crear Feedback
  await prisma.feedback.create({
    data: {
      userId: user1.id,
      lessonId: lesson1.id,
      feedbackType: "UserComment",
      content: "La lección fue muy clara y fácil de seguir.",
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
