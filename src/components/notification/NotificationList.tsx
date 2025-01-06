import { INotification } from "@/interface"
import { Button } from "../ui/button"
import { NotificationItem } from "./NotificationItem"


interface NotificationListProps {
  notifications: INotification[]
  markAllAsRead: () => void
}

export function NotificationList({
  notifications,
  markAllAsRead,
}: NotificationListProps) {
  return (
    <div className="overflow-hidden bg-white rounded-md shadow-lg dark:bg-neutral-800">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Notificaciones</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          className="text-sm text-primaryper hover:text-primary-hover dark:text-primaryper dark:hover:text-primary-hover"
        >
          Marcar todo como leído
        </Button>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notif) => (
          <NotificationItem
            key={notif.id}
            notification={notif}
          />
        ))}
      </div>
    </div>
  )
}