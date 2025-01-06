import { QuickAction } from "@/interface";
import {
  BookOpen,
  Users,
  BarChart,
  Settings,
  Calendar,
  MessageSquare,
  FileText,
  HelpCircle,
} from "lucide-react";

export const quickActions: QuickAction[] = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Iniciar capacitación",
    description: "Comienza un nuevo curso",
    href: "/cursos",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Gestionar equipo",
    description: "Administra usuarios y grupos",
    href: "/equipo",
  },
  {
    icon: <BarChart className="w-6 h-6" />,
    title: "Ver reportes",
    description: "Analiza el progreso",
    href: "/reportes",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Calendario",
    description: "Programa sesiones",
    href: "/calendario",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Mensajes",
    description: "Centro de comunicación",
    href: "/mensajes",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Recursos",
    description: "Material de apoyo",
    href: "/recursos",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Configuración",
    description: "Ajusta la plataforma",
    href: "/configuracion",
  },
  {
    icon: <HelpCircle className="w-6 h-6" />,
    title: "Ayuda",
    description: "Centro de soporte",
    href: "/ayuda",
  },
];
