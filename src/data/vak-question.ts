import { Question } from "@/store";

export const questions: Question[] = [
  {
    text: "Cuando estoy aprendiendo algo nuevo, prefiero:",
    answers: [
      { text: "Ver diagramas, gráficos o videos", type: "V" },
      { text: "Escuchar explicaciones y discutir el tema", type: "A" },
      { text: "Hacer ejercicios prácticos y experimentar", type: "K" },
    ],
  },
  {
    text: "Cuando quiero recordar información, suelo:",
    answers: [
      { text: "Visualizar imágenes o esquemas en mi mente", type: "V" },
      { text: "Repetir la información en voz alta o en mi cabeza", type: "A" },
      { text: "Asociarla con sensaciones o movimientos", type: "K" },
    ],
  },
  {
    text: "Al explicar algo a alguien, tiendo a:",
    answers: [
      { text: "Mostrar imágenes o dibujar diagramas", type: "V" },
      { text: "Explicar verbalmente con detalle", type: "A" },
      { text: "Usar gestos y demostraciones físicas", type: "K" },
    ],
  },
  {
    text: "Cuando estoy en una reunión o clase, prefiero:",
    answers: [
      { text: "Tomar notas detalladas o hacer esquemas", type: "V" },
      { text: "Escuchar atentamente sin tomar muchas notas", type: "A" },
      { text: "Moverme o hacer algo con las manos", type: "K" },
    ],
  },
  {
    text: "Al leer un libro o artículo, me concentro más en:",
    answers: [
      { text: "Las descripciones visuales y los gráficos", type: "V" },
      { text: "Los diálogos y las explicaciones escritas", type: "A" },
      { text: "Las partes que describen acciones o sensaciones", type: "K" },
    ],
  },
];
