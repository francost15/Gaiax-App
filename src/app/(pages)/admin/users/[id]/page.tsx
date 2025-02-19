"use client";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/actions";
import { use } from "react";
import { 
  ArrowLeft,
  Mail,
  Building2,
  Trophy,
  BookOpen,
  Target,
  Award
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components";

export default function UserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails(resolvedParams.id);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [resolvedParams.id]);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin"
          className="flex items-center gap-2 text-gray-500 hover:text-primaryper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al dashboard</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información Principal */}
        <Card className="p-6 col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-primaryper/10 flex items-center justify-center mb-4">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-primaryper">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user.name} {user.lastname}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 bg-primaryper/10 text-primaryper rounded-full text-sm">
                {user.role}
              </span>
            </div>
            <div className="w-full border-t border-gray-200 dark:border-neutral-700 pt-4">
              <div className="flex items-center gap-2 text-gray-500 mb-2">
                <Building2 className="w-4 h-4" />
                <span>{user.company.name}</span>
              </div>
              <div className="text-sm text-gray-500">
                {user.company.address}
              </div>
            </div>
          </div>
        </Card>

        {/* Estadísticas y Progreso */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Estadísticas Generales</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatItem 
                icon={<Trophy className="w-5 h-5 text-primaryper" />}
                label="Experiencia"
                value={`${user.exp} XP`}
              />
              <StatItem 
                icon={<BookOpen className="w-5 h-5 text-green-500" />}
                label="Cursos Completados"
                value={user.stats.completedCourses}
              />
              <StatItem 
                icon={<Target className="w-5 h-5 text-orange-500" />}
                label="En Progreso"
                value={user.stats.coursesInProgress}
              />
              <StatItem 
                icon={<Award className="w-5 h-5 text-purple-500" />}
                label="Logros"
                value={user.stats.achievements}
              />
            </div>
          </Card>

          {user.learningPreferences && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Preferencias de Aprendizaje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Formatos Preferidos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.learningPreferences.formats.map((format: string) => (
                      <span 
                        key={format}
                        className="px-3 py-1 bg-primaryper/10 text-primaryper rounded-full text-sm"
                      >
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Estilo de Aprendizaje
                  </h3>
                  <p className="text-gray-900 dark:text-white">
                    {user.learningPreferences.learningStyleKolb}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Progreso de Cursos */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Progreso en Cursos</h2>
            <div className="space-y-4">
              {user.progress.map((course: any) => (
                <div key={course.courseTitle} className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{course.courseTitle}</span>
                    <span className="text-sm text-primaryper">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-neutral-600 rounded-full">
                    <div
                      className="h-full bg-primaryper rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const StatItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-sm text-gray-500">{label}</span>
    </div>
    <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
); 