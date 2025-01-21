import { Question } from "@/store";

export const questions: Question[] = [
  {
    text: "¿Cuándo conoces a alguien,después ¿Qué es lo que mas recuerdas de esa persona?",
    answers: [
      { text: "Su rostro", type: "V" },
      { text: "Su nombre", type: "A" },
      { text: "La impresión que te produjo", type: "K" },
    ],
  },
  {
    text: "Tienes que aprender un nuevo programa informático, ¿Qué haces?",
    answers: [
      {
        text: "Consultas el manual del uso de programa o buscas un tutorial en internet",
        type: "V",
      },
      { text: "Llamas a un amigo y le pides que te explique", type: "A" },
      {
        text: "Le dices a un amigo de quedar para que te ayude con el programa",
        type: "K",
      },
    ],
  },
  {
    text: "Prefieres a los formadores que utilizan:",
    answers: [
      { text: "Apuntes o diapositivas con imágenes", type: "V" },
      { text: "Conferencias de invitados,debates y fotros", type: "A" },
      { text: "Sesiones practicas,excursiones y trabajos de campo", type: "K" },
    ],
  },
  {
    text: "Un amigo te pide que cuides su jardín y sus animales de compañía durante su ausencia. Para aprender estas tareas,consideras que lo mejor será:",
    answers: [
      { text: "Ver como lo hace otra persona", type: "V" },
      { text: "Recibir instrucciones y aclararlas", type: "A" },
      { text: "Que alguien te acompañe mientras lo haces", type: "K" },
    ],
  },
  {
    text: "Tienes que realizar una presentación ante un grupo reducido de personas. Para sentirte más a gusto prefieres...",
    answers: [
      {
        text: "Tener a mano notas o una presentación que puedas consultar durante la presentación.",
        type: "V",
      },
      {
        text: "Conocer bien el discurso: tener claro qué vas a decir y cómo",
        type: "A",
      },
      { text: "Haben ensayado la presentación varias veces", type: "K" },
    ],
  },
  {
    text: "¿Con cuál de las siguientes aficiones disfrutas más?",
    answers: [
      { text: "Hacer fotos, dibujar, ver paisajes", type: "V" },
      { text: "Escuchar música,cantar,contar historias", type: "A" },
      { text: "Pasear, bailar, meditar", type: "K" },
    ],
  },
  {
    text: "A la hora de adquirir una nueva habilidad prefieres...",
    answers: [
      { text: "Ver un video tutorial", type: "V" },
      { text: "Leer un libro o manual", type: "A" },
      { text: "Practicar y hacer ejercicios", type: "K" },
    ],
  },
  {
    text: "Estas paseando por una calle llena de restaurantes y, para elegir dónde comer, te fijas en...",
    answers: [
      { text: "La decoración y el ambiente", type: "V" },
      { text: "La carta y los precios", type: "A" },
      { text: "La cantidad de gente que hay dentro", type: "K" },
    ],
  },
  {
    text: "Por lo general, eres una persona que pasas más tiempo...",
    answers: [
      { text: "Soñando con tus planes", type: "V" },
      {
        text: "Escuchando tus propios sentimientos y hablando contigo mismo(a)",
        type: "A",
      },
      { text: "Navegando en tus sentimientos", type: "K" },
    ],
  },
  {
    text: "Tienes que hacer la compra semanal, ¿Qué haces?",
    answers: [
      {
        text: "Abres la nevera y sacas una foto mental de lo que te falta",
        type: "V",
      },
      {
        text: "Haces una lista de la compra y la sigues al pie de la letra",
        type: "A",
      },
      {
        text: "Te dejas llevar por lo que te apetece en el momento y lo que piensas que necesitas",
        type: "K",
      },
    ],
  },
];
