// interfaces/Empresa.ts

import { RequirementCompany } from "./RequerimientoEmpresa_interface";
import { User } from "./Usuario_interface";

// Representa una empresa que utiliza la plataforma.
export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  membershipId: string;
  users: User[];
  requirements: RequirementCompany[];
}
