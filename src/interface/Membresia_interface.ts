// interfaces/Membresia.ts
// Define los tipos de membresías disponibles para las empresas.
export interface Membresia {
  id: number; // Identificador único de la membresía.
  tipo: string; // Tipo de membresía (e.g., Básica, Premium).
  especificaciones?: string; // Detalles adicionales sobre la membresía.
  limiteUsuarios: number; // Número máximo de usuarios permitidos bajo esta membresía.
}
