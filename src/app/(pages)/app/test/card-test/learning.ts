export const questions = [
  {
    section: "Objetivos y Motivaciones",
    questions: [
      {
        text: "¿Cuál es tu principal objetivo al utilizar GaiaX? (Selecciona hasta 2 opciones)",
        type: "multipleChoice",
        maxSelections: 2,
        answers: [
          "Mejorar habilidades técnicas específicas.",
          "Desarrollar habilidades de liderazgo y gestión.",
          "Aumentar la productividad y eficiencia.",
          "Expandir conocimientos generales del negocio.",
          "Fortalecer habilidades de comunicación y trabajo en equipo.",
          "Innovar y fomentar la creatividad.",
        ],
      },
    ],
  },
  {
    section: "Estilo y Preferencias de Aprendizaje",
    questions: [
      {
        text: "Tiempo disponible diario para capacitación:",
        type: "singleChoice",
        answers: [
          "5 minutos.",
          "10 minutos.",
          "15 minutos.",
          "Más de 15 minutos.",
        ],
      },
      // {
      //   text: "¿En qué momento del día prefieres realizar las actividades de GaiaX?",
      //   type: "singleChoice",
      //   answers: ["Mañana.", "Tarde.", "Noche.", "Varía según mi agenda."],
      // },
      {
        text: "Formato(s) preferido(s) para aprender: (Puedes elegir más de uno)",
        type: "multipleChoice",
        answers: [
          "Texto interactivo.",
          "Flashcards.",
          "Podcasts.",
          "Simulaciones prácticas.",
          "Videos cortos.",
          "Juegos y desafíos.",
          "Lecturas profundas.",
        ],
      },
      {
        text: "¿Cómo te describirías en situaciones de aprendizaje?",
        type: "singleChoice",
        answers: [
          "Prefiero experimentar y actuar rápidamente. (Activo)",
          "Me gusta observar y reflexionar antes de actuar. (Reflexivo)",
          "Analizo teorías y conceptos a fondo. (Teórico)",
          "Busco aplicar soluciones prácticas y efectivas. (Pragmático)",
        ],
      },
    ],
  },
  {
    section: "Autovaloración y Estilos de Trabajo",
    questions: [
      {
        text: "Califica tu nivel actual en habilidades técnicas necesarias para tu trabajo (1 = Básico, 5 = Experto):",
        type: "rating",
        min: 1,
        max: 5,
      },
      // {
      //   text: "En un equipo, sueles asumir el rol de: (Selecciona uno)",
      //   type: "singleChoice",
      //   answers: [
      //     "Generador de ideas y soluciones creativas.",
      //     "Organizador que estructura y planifica.",
      //     "Ejecutador que lleva las ideas a la acción.",
      //     "Especialista técnico que resuelve problemas complejos.",
      //     "Facilitador que promueve la colaboración y comunicación.",
      //   ],
      // },
      // {
      //   text: "Ante un nuevo proyecto o tarea, prefiero:",
      //   type: "singleChoice",
      //   answers: [
      //     "Aprender haciendo y experimentando sobre la marcha.",
      //     "Investigar y comprender todos los detalles antes de empezar.",
      //     "Seguir métodos y prácticas comprobadas.",
      //     "Innovar y probar enfoques no convencionales.",
      //   ],
      // },
    ],
  },
  {
    section: "Intereses y Prioridades",
    questions: [
      // {
      //   text: "Clasifica las siguientes actividades según tu interés (1 = Más interesante, 5 = Menos interesante):",
      //   type: "ranking",
      //   options: [
      //     "Retos y desafíos gamificados.",
      //     "Recursos multimedia interactivos (videos, animaciones).",
      //     "Ejercicios prácticos y casos reales.",
      //     "Quizzes o pruebas rápidas.",
      //     "Proyectos colaborativos en equipo.",
      //   ],
      // },
      {
        text: "¿Qué habilidades te gustaría desarrollar o mejorar? (Selecciona hasta 3 opciones)",
        type: "multipleChoice",
        maxSelections: 3,
        answers: [
          "Habilidades técnicas específicas",
          "Comunicación efectiva.",
          "Resolución de problemas y pensamiento crítico.",
          "Liderazgo y gestión de equipos.",
          "Creatividad e innovación.",
          "Gestión del tiempo y productividad.",
          "Inteligencia emocional y manejo del estrés.",
          "Conocimiento del mercado y tendencias del sector.",
        ],
      },
    ],
  },
  {
    section: "Preferencias Tecnológicas y Accesibilidad",
    questions: [
      // {
      //   text: "¿Qué dispositivos utilizas con mayor frecuencia para aprender? (Puedes elegir más de uno)",
      //   type: "multipleChoice",
      //   answers: [
      //     "Smartphone.",
      //     "Tablet.",
      //     "Ordenador portátil.",
      //     "Ordenador de escritorio.",
      //   ],
      // },
      {
        text: "¿Tienes acceso a audio durante tus tiempos de aprendizaje?",
        type: "singleChoice",
        answers: [
          "Sí, siempre.",
          "Sí, pero con limitaciones.",
          "No, prefiero contenido sin audio.",
        ],
      },
      // {
      //   text: "¿Requieres alguna adaptación o consideración especial para tu aprendizaje?",
      //   type: "openEnded",
      //   placeholder: "Especifica si necesitas alguna adaptación",
      // },
    ],
  },
  {
    section: "Contexto Laboral y Expectativas",
    questions: [
      {
        text: "¿Qué conocimientos o habilidades ha destacado tu empresa como prioritarias? (Puedes mencionarlas según la comunicación de tu empresa)",
        type: "openEnded",
        placeholder: "Escribe las habilidades prioritarias para tu empresa",
      },
      {
        text: "¿Cómo crees que GaiaX puede apoyarte en tu desarrollo profesional?",
        type: "singleChoice",
        answers: [
          "Acelerando mi aprendizaje en áreas clave.",
          "Proporcionando herramientas para aplicar en mi trabajo.",
          "Conectándome con compañeros para aprender juntos.",
          "Ofreciendo flexibilidad para aprender a mi propio ritmo.",
        ],
      },
    ],
  },
];
