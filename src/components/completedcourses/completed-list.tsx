"use client";

import CompletedCoursesCard from "./completed-card";

// Datos de ejemplo para los logros
const coursesData = [
  {
    id: 1,
    title: "Primer Curso Completado",
    description: "Completaste tu primer curso en la plataforma.",
    date: "15/05/2023",
    points: 100,
  },
  {
    id: 2,
    title: "Racha de 7 Días",
    description:
      "Mantuviste una racha de aprendizaje durante 7 días consecutivos.",
    date: "22/06/2023",
    points: 50,
  },
  {
    id: 3,
    title: "Maestro del Código",
    description: "Completaste todos los desafíos de programación del mes.",
    date: "10/07/2023",
    points: 200,
  },
  {
    id: 4,
    title: "Colaborador Estrella",
    description: "Ayudaste a 10 compañeros en el foro de la comunidad.",
    date: "05/08/2023",
    points: 150,
  },
  {
    id: 5,
    title: "Innovador Tecnológico",
    description:
      "Completaste la serie de cursos sobre Inteligencia Artificial.",
    date: "20/09/2023",
    points: 300,
  },
];

export const CompletedCoursesList = () => {
  const completedcourses = coursesData;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {completedcourses.map((completedcourses) => (
          <CompletedCoursesCard
            key={completedcourses.id}
            {...completedcourses}
          />
        ))}
      </div>
    </div>
  );
};
