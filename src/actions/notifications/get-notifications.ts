"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getNotifications(userId: string) {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: {
          select: {
            title: true,
          },
        },
        lesson: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('No se pudieron cargar las notificaciones');
  }
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    await prisma.notification.update({
      where: {
        id: notificationId,
      },
      data: {
        isRead: true,
      },
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('No se pudo marcar la notificación como leída');
  }
} 