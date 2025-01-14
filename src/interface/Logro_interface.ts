// interfaces/Logro.ts
// Define los logros que los usuarios pueden obtener.
export interface Logro {
  id: number; // Identificador único del logro.
  nombre: string; // Nombre del logro.
  descripcion: string; // Descripción del logro.
  puntos: number; // Puntos necesarios para obtener el logro.
}
