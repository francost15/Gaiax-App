// interfaces/ProgresoUsuario.ts
// Rastrea el progreso de un usuario en un curso.
export interface ProgresoUsuario {
  id: number; // Identificador único del progreso.
  usuarioId: number; // Referencia al usuario cuyo progreso se está rastreando.
  cursoId: number; // Referencia al curso en el que el usuario está progresando.
  leccionesCompletadas: number; // Número de lecciones completadas por el usuario.
  progreso: number; // Porcentaje de progreso en el curso.
}
