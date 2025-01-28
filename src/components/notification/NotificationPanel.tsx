"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface NotificationPanelProps {
  notifications: string[];
}

export const NotificationPanel = ({
  notifications,
}: NotificationPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={togglePanel}
        className="relative w-full flex rounded-xl  hover:bg-gray-200 dark:hover:bg-neutral-800"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-2 left-2 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primaryper rounded-full">
            {notifications.length}
          </span>
        )}
        <span className="ml-6">Notificaciones</span>
      </button>
      {isOpen && (
        <div
          className="absolute left-52 mt-2 w-96 p-4 bg-white border border-gray-200
                   rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700
                   transform origin-top-right transition-transform duration-300 ease-out scale-100"
        >
          <h3 className="mb-2 text-lg font-semibold">Notificaciones</h3>
          <ul className="space-y-2">
            {notifications.map((notification, index) => (
              <li
                key={index}
                className="p-2 bg-gray-100 rounded-md dark:bg-neutral-800"
              >
                {notification}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
