"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Trophy, PlayCircle, Lock, CheckCircle, ArrowLeft } from "lucide-react";
import { SkeletonCourseMenu,CourseNotFound } from "@/components";
import { getCourseDetail } from "@/actions";


export default function CoursePage() {
  const { data: session } = useSession();
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadCourse = async () => {
      if (session?.user?.id && params.id) {
        try {
          const courseData = await getCourseDetail(params.id as string, session.user.id);
          setCourse(courseData);
        } catch (error) {
          console.error("Error cargando curso:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadCourse();
  }, [params?.id, session]);

  if (loading) {
    return <SkeletonCourseMenu />;
  }

  if (!course) {
    return <CourseNotFound />
  }

  const currentProgress = course.UserProgress?.[0]?.progress || 0;

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-neutral-900 min-h-screen">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-4 sm:mb-6">
        <Link
          href="/app"
          className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
      </div>

      {/* Header Section */}
      <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
        {/* Category, XP and Progress Banner */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white rounded-full bg-gradient-to-r from-primaryper to-[#7375F3] shadow-lg shadow-primaryper/20">
            {course.category?.name || "Sin categoría"}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-amber-400/10 text-amber-400 font-bold rounded-full border border-amber-400/20">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{course.exp} XP</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500/10 text-green-400 font-bold rounded-full border border-green-500/20">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm">{currentProgress}%</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
            {course.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {course.description}
          </p>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="max-w-3xl mx-auto">
        <div className="space-y-3 sm:space-y-4">
          {course.lessons.map((lesson: any, index: number) => {
            const isCompleted = lesson.UserLessonProgress?.[0]?.completed;
            const isLocked = index > 0 && !course.lessons[index - 1].UserLessonProgress?.[0]?.completed;

            return (
              <div key={lesson.id} className="group animate-fadeIn">
                <Link
                  href={isLocked ? "#" : `/app/lesson/${lesson.id}`}
                  className={`
                    w-full p-4 sm:p-5 rounded-xl transition-all flex items-center justify-between
                    ${isCompleted
                      ? "bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                      : isLocked
                        ? "bg-gray-100 dark:bg-neutral-800/50 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-neutral-700/50"
                        : "bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-700"}
                  `}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative flex-shrink-0">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-700/50">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5" />
                        ) : (
                          <span className="text-lg font-bold">{index + 1}</span>
                        )}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 overflow-hidden">
                      <span className="font-medium text-sm sm:text-base block truncate">
                        {lesson.title}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <div className="px-2 py-0.5 bg-amber-100 dark:bg-amber-400/10 rounded-md flex items-center gap-1 flex-shrink-0">
                          <Trophy className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                          <span className="text-xs font-semibold text-amber-500 dark:text-amber-400">
                            {lesson.exp} XP
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setExpandedLessons(prev => ({
                              ...prev,
                              [lesson.id]: !prev[lesson.id]
                            }));
                          }}
                          className={`
                            text-xs px-2 py-0.5 rounded-md transition-all flex-shrink-0
                            ${expandedLessons[lesson.id]
                              ? "bg-primaryper text-white"
                              : "bg-gray-200 dark:bg-neutral-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-700"}
                          `}
                        >
                          {expandedLessons[lesson.id] ? "Ver menos" : "Ver más"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <PlayCircle
                    className={`w-8 h-8 transition-transform group-hover:scale-110 
                      ${isLocked ? "opacity-50" : "group-hover:text-primaryper"}`}
                  />
                </Link>

                {expandedLessons[lesson.id] && (
                  <div className="mt-3 overflow-hidden animate-slideDown">
                    <div className="p-5 bg-gray-50 dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700">
                      {/* Score Card */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-400/10 dark:to-amber-500/5 rounded-lg border border-amber-200 dark:border-amber-400/20">
                        <div className="flex items-center justify-between">
                          <h4 className="text-amber-700 dark:text-amber-400 font-semibold">Puntos disponibles</h4>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                            <span className="text-xl font-bold text-amber-500 dark:text-amber-400">{lesson.exp} XP</span>
                          </div>
                        </div>
                      </div>

                      {/* Descripción */}
                      <div className="mb-6">
                        <h4 className="text-gray-900 dark:text-gray-200 font-semibold mb-3 flex items-center gap-2">
                          <span className="w-1 h-6 bg-primaryper rounded-full"></span>
                          Descripción de la lección
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-3 border-l-2 border-gray-200 dark:border-neutral-700">
                          {lesson.description}
                        </p>
                      </div>

                      {/* Objetivos de aprendizaje */}
                      {lesson.learningObjectives?.length > 0 && (
                        <div>
                          <h4 className="text-gray-900 dark:text-gray-200 font-semibold mb-3 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primaryper rounded-full"></span>
                            Objetivos de aprendizaje
                          </h4>
                          <ul className="grid gap-3 pl-3 border-l-2 border-gray-200 dark:border-neutral-700">
                            {lesson.learningObjectives.map((objective: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-600 dark:text-gray-400"
                              >
                                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-700/50 flex-shrink-0 mt-0.5">
                                  <span className="text-sm">{i + 1}</span>
                                </div>
                                <span className="leading-relaxed">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
