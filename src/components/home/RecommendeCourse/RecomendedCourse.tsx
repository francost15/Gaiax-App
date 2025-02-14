"use client";

import { useEffect, useState } from "react";
import { useId } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useSession } from "next-auth/react";
import { getRecommendedCourses } from "@/actions/course/get-courses";

import "swiper/css";
import "swiper/css/pagination";
import { CourseCard } from "./CourseCard";
import { CourseSkeleton } from "@/components";

export const RecommendedCourses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const sectionId = useId();

  useEffect(() => {
    const loadCourses = async () => {
      if (session?.user?.id) {
        const recommendedCourses = await getRecommendedCourses(session.user.id);
        setCourses(recommendedCourses);
        setLoading(false);
      }
    };

    loadCourses();
  }, [session]);

  if (loading) {
    return (
      <>
        <CourseSkeleton />
      </>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p>No hay cursos recomendados disponibles</p>
      </div>
    );
  }

  return (
    <section className="mb-12 px-4 sm:px-6 lg:px-8" aria-labelledby={sectionId}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h2
          id={sectionId}
          className="text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0"
        >
          Cursos Recomendados
        </h2>

        <Link
          href="/app/courses/recommended"
          className="text-sm font-semibold text-primaryper hover:text-[#5558DD] dark:text-[#7375F3] dark:hover:text-[#8385F5] transition-all"
        >
          Ver todos los cursos
        </Link>
      </div>

      <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
        Lecciones cortas y efectivas para mejorar tus habilidades
      </p>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={16}
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
          1024: {
            slidesPerView: 3,
            centeredSlides: false,
          },
        }}
        className="pb-10"
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
