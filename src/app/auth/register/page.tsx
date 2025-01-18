import { getAllCompanies } from "@/actions";
import ClientRegisterForm from "./ui/ClientRegisterForm";

export default async function RegisterPage() {
  // Llamada al servidor para obtener empresas
  const companies = await getAllCompanies();
  // Si getAllCompanies() retorna null para errores, usar un array vacío
  const safeCompanies = companies || [];

  return <ClientRegisterForm companies={safeCompanies} />;
}
