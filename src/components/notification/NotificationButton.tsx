'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent, Button } from '@/components'
import { NOTIFICATIONS } from '@/data'
import { NotificationList } from './NotificationList'

export const NotificationButton = () => {
  const [unreadCount, setUnreadCount] = useState<number>(
    NOTIFICATIONS.filter((n) => !n.read).length
  )

  const markAllAsRead = (): void => {
    setUnreadCount(0)
    // Llamada al API para marcar todas como leídas, si aplica
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full -top-1 -right-1 bg-primaryper">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 border-none w-80">
        <NotificationList
          notifications={NOTIFICATIONS}
          markAllAsRead={markAllAsRead}
        />
      </PopoverContent>
    </Popover>
  )
}