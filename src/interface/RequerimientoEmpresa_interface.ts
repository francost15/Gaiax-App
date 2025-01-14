// interfaces/RequerimientoEmpresa.ts
// Representa los requerimientos de capacitación de una empresa.
export interface RequerimientoEmpresa {
  id: number; // Identificador único del requerimiento.
  empresaId: number; // Referencia a la empresa que tiene este requerimiento.
  categoria: string; // Categoría de capacitación requerida por la empresa.
}
