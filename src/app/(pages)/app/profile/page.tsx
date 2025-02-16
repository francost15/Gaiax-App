import Link from "next/link";
import ProfileAchievements from "./cards_profile/archievements_profile";
import ProfileCourses from "./cards_profile/courses_profile";
import ProfileHeader from "./cards_profile/header_profile";
import ProfileStats from "./cards_profile/stats_profile";
import { auth } from "@/auth.config";
import {
  getAllAchievements,
  getCompanyById,
  getCompletedCoursesByUser,
  getUserAchievementsById,
} from "@/actions";
import { ActivityChart } from "@/components/ActivityChart";
import { EmptyState } from "@/components/EmptyState";
import { BookOpen, Flame, Trophy, Clock, CheckCircle, Target } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserStats } from "@/actions/stats/get-user-stats";
import { getActivityData } from "@/actions/stats/get-activity-data";

export default async function ProfilePage() {
  // obtener sesion del usuario
  const session = await auth();
  const companyId = session?.user.companyId;
  const company = companyId ? await getCompanyById(companyId) : null;
  const userId = session?.user.id ?? "";
  const archievements = (await getUserAchievementsById(userId)).map(
    (achievement) => ({
      ...achievement,
      date: achievement.date.toISOString(),
    })
  );
  const allArchievements = await getAllAchievements(userId);
  const completedCourses = await getCompletedCoursesByUser(userId);

  // Obtener estadísticas
  const stats = await getUserStats();
  const activityData = await getActivityData('week');

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900/20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header y Stats Section */}
        <div className="grid gap-6 lg:grid-cols-[2fr,3fr]">
          {/* Left Column: Header */}
          <div className="space-y-6">
            <ProfileHeader
              name={session ? `${session.user.name} ${session.user.lastname}` : ""}
              role={session?.user.role ?? ""}
              email={session?.user.email ?? ""}
              company={company ? company.name : ""}
              image={session?.user.image ?? ""}
              level={session?.user.exp ?? 0}
              xp={session?.user.exp ?? 0}
            />

     
          </div>

          {/* Right Column: Activity Chart */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Actividad de Aprendizaje
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Últimos 7 días de actividad
                </p>
              </div>
              <Select defaultValue="week">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mes</SelectItem>
                  <SelectItem value="year">Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[240px]">
              <ActivityChart data={activityData} />
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-blue-500/10">
                <Clock className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tiempo de Estudio
                </h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.studyTimeHours ?? 0}h
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Basado en lecciones completadas
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-green-500/10">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Cursos Completados
                </h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.completedCourses ?? 0}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                100% completados
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-primaryper/10">
                <Target className="w-5 h-5 text-primaryper" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  En Progreso
                </h4>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats?.coursesInProgress ?? 0}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cursos activos
              </p>
            </div>
          </div>
        </div>

        {/* Courses and Achievements */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Cursos Completados */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Cursos Completados
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Últimos cursos finalizados
                  </p>
                </div>
                {completedCourses.length > 0 && (
                  <Link
                    href="/app/courses/completed"
                    className="text-sm font-medium text-primaryper hover:text-primary-hover transition-colors"
                  >
                    Ver todos
                  </Link>
                )}
              </div>
            </div>
            <div className="p-6">
              {completedCourses.length === 0 ? (
                <EmptyState
                  icon={BookOpen}
                  title="Sin cursos completados"
                  description="¡Comienza tu viaje de aprendizaje hoy!"
                  action={{
                    label: "Explorar cursos",
                    href: "/app/courses/recommended"
                  }}
                />
              ) : (
                <ProfileCourses completedCourses={completedCourses} />
              )}
            </div>
          </div>

          {/* Logros */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Logros Desbloqueados
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Tus últimos logros
                  </p>
                </div>
                {archievements.length > 0 && (
                  <Link
                    href="/app/achievements"
                    className="text-sm font-medium text-primaryper hover:text-primary-hover transition-colors"
                  >
                    Ver todos
                  </Link>
                )}
              </div>
            </div>
            <div className="p-6">
              {archievements.length === 0 ? (
                <EmptyState
                  icon={Trophy}
                  title="Sin logros aún"
                  description="¡Completa cursos para desbloquear logros!"
                />
              ) : (
                <ProfileAchievements achievements={archievements} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
