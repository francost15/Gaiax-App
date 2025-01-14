// interfaces/Empresa.ts
// Representa una empresa que utiliza la plataforma.
export interface Empresa {
  id: number; // Identificador único de la empresa.
  nombre: string; // Nombre de la empresa.
  direccion: string; // Dirección física de la empresa.
  telefono: string; // Número de teléfono de contacto de la empresa.
  membresiaId: number; // Referencia a la membresía asociada a la empresa.
}
