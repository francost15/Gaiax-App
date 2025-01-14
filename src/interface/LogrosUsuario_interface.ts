// interfaces/LogrosUsuario.ts
// Relaciona los logros obtenidos por los usuarios.
export interface LogrosUsuario {
  id: number; // Identificador único de la relación.
  usuarioId: number; // Referencia al usuario que obtuvo el logro.
  logroId: number; // Referencia al logro obtenido.
  fechaObtenido: Date; // Fecha en que el usuario obtuvo el logro.
}
