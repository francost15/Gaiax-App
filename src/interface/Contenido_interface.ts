// interfaces/Contenido.ts

import { EstiloAprendizaje } from "./EstiloAprendizaje_interface";

// Define el contenido educativo disponible en la plataforma.
export interface Contenido {
  id: number; // Identificador único del contenido.
  tipo: EstiloAprendizaje; // Tipo de contenido basado en el estilo de aprendizaje.
  descripcion: string; // Descripción del contenido.
  url: string; // URL donde se puede acceder al contenido.
  exp: number; // Experiencia otorgada al completar el contenido.
  categoria: string; // Categoría a la que pertenece el contenido.
}
