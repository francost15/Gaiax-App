// interfaces/Leccion.ts

import { EstiloAprendizaje } from "./EstiloAprendizaje_interface";

// Define una lección individual dentro de un curso.
export interface Leccion {
  id: number; // Identificador único de la lección.
  cursoId: number; // Referencia al curso al que pertenece la lección.
  nombre: string; // Nombre de la lección.
  descripcion: string; // Descripción de la lección.
  tipo: EstiloAprendizaje; // Tipo de lección basado en el estilo de aprendizaje.
  url: string; // URL donde se puede acceder al contenido de la lección.
  exp: number; // Experiencia otorgada al completar la lección.
}
