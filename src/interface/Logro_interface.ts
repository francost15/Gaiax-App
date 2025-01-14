// interfaces/Logro.ts
// Define los logros que los usuarios pueden obtener.

import { UserArchivement } from "./UserArchivement";

// Achievement
export interface Achievement {
  id: string;
  name: string;
  description: string;
  exp: number;
  users: UserArchivement[];
}
