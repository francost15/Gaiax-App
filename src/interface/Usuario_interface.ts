// interfaces/Usuario.ts

import { EstiloAprendizaje } from "./EstiloAprendizaje_interface";

// Representa un usuario de la plataforma, que puede ser un empleado de una empresa.
export interface Usuario {
  id: number; // Identificador único del usuario.
  nombre: string; // Nombre del usuario.
  apellido: string; // Apellido del usuario.
  direccion: string; // Dirección física del usuario.
  telefono: string; // Número de teléfono del usuario.
  email: string; // Correo electrónico del usuario.
  password: string; // Contraseña del usuario (debe ser almacenada de forma segura).
  puesto: string; // Puesto o rol del usuario dentro de la empresa.
  empresaId: number; // Referencia a la empresa a la que pertenece el usuario.
  estiloAprendizaje: EstiloAprendizaje; // Estilo de aprendizaje preferido del usuario.
  rachaDias: number; // Número de días consecutivos de actividad del usuario.
  puntaje: number; // Puntos acumulados por el usuario.
  esAdministrador: boolean; // Indica si el usuario tiene privilegios de administrador.
}
