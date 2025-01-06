'use client'


import { Button } from '@/components'
import { INotification } from '@/interface'

interface NotificationItemProps {
  notification: INotification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { title, description, time, read } = notification

  return (
    <div
      className={`p-4 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors ${
        read ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <div className="flex items-center mt-2 space-x-2">
            <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
            {!read && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs rounded-xl text-primaryper hover:bg-primary-hover dark:text-primaryper hover:text-white"
              >
                Marcar como leído
              </Button>
            )}
          </div>
        </div>
        {!read && (
          <div className="flex-shrink-0 w-2 h-2 mt-1 rounded-full bg-primaryper" />
        )}
      </div>
    </div>
  )
}