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
    ],
  },
  {
    section: "Intereses y Prioridades",
    questions: [
      {
        text: "¿Qué habilidades te gustaría desarrollar o mejorar? (Selecciona hasta 3 opciones)",
        type: "multipleChoice",
        maxSelections: 4,
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
];
