"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserDetails(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
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

    if (!user) return null;

    return {
      ...user,
      stats: {
        completedCourses: user.UserProgress.filter(p => p.progress === 100).length,
        coursesInProgress: user.UserProgress.filter(p => p.progress < 100).length,
        totalLessonsCompleted: user.UserProgress.reduce((acc, curr) => 
          acc + curr.lessonsCompleted.filter(l => l.completed).length, 0),
        achievements: user.UserArchivement.length,
      },
      progress: user.UserProgress.map(p => ({
        courseTitle: p.course.title,
        progress: p.progress,
        lessonsCompleted: p.lessonsCompleted.length,
        totalLessons: p.course.lessons?.length || 0,
      }))
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
} 