"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getLesson } from "@/actions/lesson/get-lesson";
import { LessonContent } from "@/components/lessons/LessonContent";
import { Lesson } from "@/interfaces/Lesson.interface";
import { LoadingSpinner } from "@/components";

export default function LessonPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        if (!session?.user?.id) return;
        const data = await getLesson(params.id as string, session.user.id);
        if (!data) {
          setError("Lección no encontrada");
          return;
        }
        setLesson(data);
      } catch (error) {
        setError("Error cargando la lección");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [params.id, session?.user?.id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!lesson) return <div>Lección no encontrada</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 p-4 sm:p-8">
      <LessonContent lesson={lesson} />
    </div>
  );
} 