import { AdminModule } from "@/components/admin/AdminModule";

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 p-4 sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Panel de Administración
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminModule title="Usuarios" description="Gestiona los usuarios de la plataforma" />
        <AdminModule title="Cursos" description="Administra los cursos disponibles" />
        <AdminModule title="Reportes" description="Genera reportes de actividad" />
        {/* Agrega más módulos aquí según sea necesario */}
      </div>
    </div>
  );
}; 