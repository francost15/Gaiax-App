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
  return (
    <div className="min-h-screen transition-colors duration-300 ">
      <div className="grid gap-8 [&>*]:bg-white [&>*]:dark:bg-neutral-900 [&>*]:p-6 [&>*]:transition-all [&>*]:duration-300">
        <ProfileHeader
          name={session ? `${session.user.name} ${session.user.lastname}` : ""}
          role={session?.user.role ?? ""}
          email={session?.user.email ?? ""}
          company={company ? company.name : ""}
          image={session?.user.image ?? ""}
          level={session?.user.exp ?? 0}
          xp={session?.user.exp ?? 0}
        />
        <ProfileStats
          achievements={allArchievements.length}
          hours={0}
          coursescompleted={0}
          coursesinprogress={0}
        />
        <div className="grid gap-8 p-6  lg:grid-cols-2 ">
          <div className="relative">
            <ProfileCourses completedCourses={completedCourses} />
            <Link
              title="Ver más cursos"
              href="/app/courses/completed"
              className="absolute px-3 py-1 mt-6 transition-colors rounded-full sm:mt-1 top-6 right-6 text-primaryper hover:bg-primary-hover hover:bg-primary-hover/10"
            >
              Ver más
            </Link>
          </div>
          <div className="relative">
            <ProfileAchievements achievements={archievements} />
            <Link
              title="Ver más logros"
              href="/app/achievements"
              className="absolute px-3 py-1 mt-6 transition-colors rounded-full sm:mt-1 top-6 right-6 text-primaryper hover:bg-primary-hover hover:bg-primary-hover/10"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
