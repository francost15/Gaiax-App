import {
  Trophy,
  Clock,
  Target,
  DollarSign,
  Clock3,
  PieChart,
  Award,
  Briefcase,
  Code,
  Lightbulb,
  Zap,
  Cpu,
  LineChart,
} from "lucide-react";
import { StatCard, CourseProgress, RecommendedCourse } from "@/interface";

export const STATS_DATA: StatCard[] = [
  { icon: Trophy, label: "Logros", value: 12 },
  { icon: Clock, label: "Minutos Hoy", value: 45 },
  { icon: Target, label: "Completadas", value: 23 },
  { icon: Trophy, label: "Tu posicion", value: 5 },
];

export const COURSES_IN_PROGRESS: CourseProgress[] = [
  {
    title: "Gestión Financiera para PyMEs",
    timeRemaining: "3 minutos restantes",
    progress: 60,
    icon: Award,
  },
  {
    title: "Marketing Digital Básico",
    timeRemaining: "5 minutos restantes",
    progress: 40,
    icon: Award,
  },
  {
    title: "Liderazgo Efectivo",
    timeRemaining: "10 minutos restantes",
    progress: 25,
    icon: Briefcase,
  },
  {
    title: "Introducción a la Inteligencia Artificial",
    timeRemaining: "7 minutos restantes",
    progress: 75,
    icon: Cpu,
  },
  {
    title: "Estrategias de Negociación",
    timeRemaining: "4 minutos restantes",
    progress: 50,
    icon: Zap,
  },
];

export const RECOMMENDED_COURSES: RecommendedCourse[] = [
  {
    title: "Estrategias de Ventas B2B",
    duration: "10 min",
    xp: 50,
    icon: DollarSign,
    description: "Aprende técnicas efectivas para vender a otras empresas",
    category: "Negocios",
  },
  {
    title: "Gestión del Tiempo para Emprendedores",
    duration: "8 min",
    xp: 40,
    icon: Clock3,
    description: "Optimiza tu productividad con técnicas de gestión del tiempo",
    category: "Liderazgo",
  },
  {
    title: "Fundamentos de Contabilidad",
    duration: "12 min",
    xp: 60,
    icon: PieChart,
    description: "Domina los conceptos básicos de contabilidad para tu negocio",
    category: "Finanzas",
  },
  {
    title: "Innovación y Creatividad en los Negocios",
    duration: "15 min",
    xp: 70,
    icon: Lightbulb,
    description:
      "Desarrolla habilidades para fomentar la innovación en tu empresa",
    category: "Negocios",
  },
  {
    title: "Introducción al Machine Learning",
    duration: "20 min",
    xp: 80,
    icon: Cpu,
    description: "Descubre los fundamentos del aprendizaje automático",
    category: "Tecnología",
  },
  {
    title: "Análisis de Datos para Toma de Decisiones",
    duration: "18 min",
    xp: 75,
    icon: LineChart,
    description: "Aprende a utilizar datos para tomar decisiones informadas",
    category: "Tecnología",
  },
  {
    title: "Programación Básica para Emprendedores",
    duration: "25 min",
    xp: 90,
    icon: Code,
    description:
      "Introduce la programación en tu conjunto de habilidades empresariales",
    category: "Tecnología",
  },
  {
    title: "Estrategias de Marketing Digital",
    duration: "15 min",
    xp: 65,
    icon: Zap,
    description: "Aprende las últimas técnicas de marketing digital",
    category: "Marketing",
  },
];
