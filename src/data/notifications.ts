import { Notificacion } from "@/interface";

export const NOTIFICATIONS: Notificacion[] = [
  {
    id: 1,
    title: "¡Nueva lección disponible!",
    description: "Gestión de Equipos Remotos ya está disponible",
    time: "Hace 5 minutos",
    read: false,
  },
  {
    id: 2,
    title: "¡Felicitaciones!",
    description: "Has completado tu racha de 7 días",
    time: "Hace 2 horas",
    read: false,
  },
  {
    id: 3,
    title: "Recordatorio",
    description: "Continúa tu lección de Marketing Digital",
    time: "Hace 1 día",
    read: true,
  },
];
