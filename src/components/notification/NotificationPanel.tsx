"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bell, Check, X, BookOpen, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';
import { getNotifications, markNotificationAsRead } from '@/actions/notifications/get-notifications';

interface Notification {
  id: string;
  title: string;
  message: string;
  notificationType: string;
  isRead: boolean;
  createdAt: Date;
  course?: { title: string } | null;
  lesson?: { title: string } | null;
}

export function NotificationPanel() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      loadNotifications();
    }
  }, [session]);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await getNotifications(session?.user?.id as string);
      setNotifications(data || []); // Aseguramos que siempre sea un array
      setUnreadCount(data?.filter(n => !n.isRead).length || 0);
    } catch (error) {
      console.error('Error loading notifications:', error);
      toast.error('Error al cargar notificaciones');
      setNotifications([]); // En caso de error, establecemos un array vacío
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      toast.error('Error al marcar notificación como leída');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'CourseAssigned':
        return <GraduationCap className="w-5 h-5 text-primaryper" />;
      case 'LessonCompleted':
        return <BookOpen className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primaryper text-white text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-full ml-2 top-0 w-80 max-h-[32rem] overflow-y-auto 
          bg-white dark:bg-neutral-900 rounded-xl shadow-lg 
          border border-gray-200 dark:border-neutral-700 z-50
          transform transition-all duration-200 ease-in-out"
        >
          <div className="sticky top-0 p-4 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notificaciones
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-neutral-700">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Cargando notificaciones...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No hay notificaciones
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.notificationType)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {notification.message}
                      </p>
                      {(notification.course || notification.lesson) && (
                        <p className="mt-1 text-xs text-primaryper">
                          {notification.course?.title || notification.lesson?.title}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-full transition-colors"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
