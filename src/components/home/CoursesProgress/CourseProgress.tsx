"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Card, CardContent, Progress } from "@/components";
import { useSession } from "next-auth/react";
import { getCoursesInProgress } from "@/actions/course/get-courses";
import { BookOpen } from "lucide-react";
import Link from "next/link";

// Importar estilos de Swiper
import "swiper/css";
import "swiper/css/pagination";

export const CoursesProgress = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      if (session?.user?.id) {
        const coursesData = await getCoursesInProgress(session.user.id);
        setCourses(coursesData);
        setLoading(false);
      }
    };

    loadCourses();
  }, [session]);

  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No tienes cursos en progreso</p>
      </div>
    );
  }

  return (
    <div className="mb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Mis Lecciones en Progreso
      </h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        centeredSlides={true}
        loop={courses.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-primaryper",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            centeredSlides: false,
          },
        }}
        className="pb-10"
      >
        {courses.map((courseProgress) => (
          <SwiperSlide key={courseProgress.courseId}>
            <Card className="relative h-full bg-white dark:bg-neutral-900 border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-violet-100 dark:bg-violet-900/20 rounded-xl">
                    <BookOpen className="w-7 h-7 text-primaryper" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {courseProgress.course.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {courseProgress.course.lessons.length} lecciones
                        </p>
                      </div>
                      <div className="px-3 py-1.5 text-sm font-bold text-white rounded-lg bg-primaryper">
                        {courseProgress.progress}%
                      </div>
                    </div>
                  </div>
                </div>

                <Progress
                  title="Progreso del curso"
                  value={courseProgress.progress}
                  className="h-2.5 mb-6 bg-gray-100 dark:bg-neutral-700"
                />

                <Link
                  href={`/app/courses/${courseProgress.courseId}`}
                  className="block w-full py-3 px-4 bg-primaryper hover:bg-primary-hover text-white font-medium rounded-xl transition-colors duration-200 dark:bg-[#7375F3] dark:hover:bg-primaryper text-center"
                >
                  Continuar
                </Link>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
