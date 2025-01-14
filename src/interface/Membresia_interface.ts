// interfaces/Membresia.ts
// Define los tipos de membresías disponibles para las empresas.

import { Company } from "./Empresa_interface";

// Membership
export interface Membership {
  id: string;
  name: string;
  description: string;
  price: number;
  limitUsers: number;
  companies: Company[];
}
