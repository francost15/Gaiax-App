// interfaces/Usuario.ts
// Representa un usuario de la plataforma, que puede ser un empleado de una empresa.

import { LearningStyle, Role } from "./enum";
import { UserProgress } from "./ProgresoUsuario_interface";
import { UserArchivement } from "./UserArchivement";
import { UserLessonProgress } from "./Usuario_leccion_progreso_interface";

// User
export interface User {
  id: string;
  name: string;
  lastname: string;
  direction?: string | null;
  phone: string;
  email: string;
  password: string;
  streaks: number;
  exp: number;
  isAdmin: boolean;
  role: Role;
  companyId: string;
  learningStyle: LearningStyle;
  UserArchivement: UserArchivement[];
  UserProgress: UserProgress[];
  UserLessonProgress: UserLessonProgress[];
}
