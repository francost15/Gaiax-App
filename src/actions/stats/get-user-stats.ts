"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth.config";

const prisma = new PrismaClient();

export async function getUserStats() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return [];

  try {
    // Primero obtenemos la compañía del usuario actual
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { companyId: true }
    });

    if (!currentUser) return [];

    // Luego obtenemos todos los usuarios de la misma compañía
    const users = await prisma.user.findMany({
      where: {
        companyId: currentUser.companyId
      },
      include: {
        company: true,
        learningPreferences: true,
        UserProgress: {
          include: {
            course: {
              include: {
                lessons: true
              }
            },
            lessonsCompleted: true,
          }
        },
        UserArchivement: {
          include: {
            achievement: true,
          }
        },
        testResults: {
          orderBy: {
            date: 'desc'
          },
          take: 5
        }
      }
    });

    const enrichedUsers = await Promise.all(users.map(async (user) => {
      // Calcular estadísticas adicionales
      const completedCourses = user.UserProgress.filter(p => p.progress === 100).length;
      const coursesInProgress = user.UserProgress.filter(p => p.progress < 100).length;
      const totalLessonsCompleted = user.UserProgress.reduce((acc, curr) => 
        acc + curr.lessonsCompleted.filter(l => l.completed).length, 0);
      
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        streaks: user.streaks,
        exp: user.exp,
        company: user.company,
        learningPreferences: user.learningPreferences,
        stats: {
          completedCourses,
          coursesInProgress,
          totalLessonsCompleted,
          achievements: user.UserArchivement.length,
          recentAchievements: user.UserArchivement.slice(0, 3).map(ua => ua.achievement.name),
          lastTestResults: user.testResults.slice(0, 3).map(test => ({
            testType: test.testType,
            score: test.score ?? 0,
            date: test.date.toISOString()
          })),
        },
        progress: user.UserProgress.map(p => ({
          courseTitle: p.course.title,
          progress: p.progress,
          lessonsCompleted: p.lessonsCompleted.length,
          totalLessons: p.course.lessons?.length || 0,
        }))
      };
    }));

    return enrichedUsers;
  } catch (error) {
    console.error("Error getting user stats:", error);
    return [];
  }
} 