import Link from "next/link";
import ProfileAchievements from "./cards_profile/archievements_profile";
import ProfileCourses from "./cards_profile/courses_profile";
import ProfileHeader from "./cards_profile/header_profile";
import ProfileStats from "./cards_profile/stats_profile";



export default function ProfilePage() {
  return (
    <div className=" bg-gray-50 dark:bg-neutral-800 min-h-screen transition-colors duration-300">
      <h1 className="sr-only">Mi Perfil</h1>
      <div className="grid gap-8 [&>*]:bg-white [&>*]:dark:bg-neutral-900 [&>*]:p-6 [&>*]:rounded-lg [&>*]:shadow-md [&>*]:transition-all [&>*]:duration-300">
        <ProfileHeader />
        <ProfileStats />
        <div className="grid gap-8 lg:grid-cols-2 bg-gray-200 dark:bg-neutral-800 rounded-lg p-6">
          <div className="relative">
            <ProfileCourses />
            <Link 
            title="Ver más cursos"
              href="/cursos" 
              className="absolute top-6 right-6 text-primaryper hover:bg-primary-hover transition-colors px-3 py-1 rounded-full  hover:bg-primary-hover/10"
            >
              Ver más
            </Link>
          </div>
          <div className="relative">
            <ProfileAchievements />
            <Link
            title="Ver más logros"
              href="/logros" 
              className="absolute top-6 right-6 text-primaryper hover:bg-primary-hover transition-colors px-3 py-1 rounded-full hover:bg-primary-hover/10"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

