'use client'

import { Label, Switch } from "@/components"

export default function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Preferencias de notificación</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 dark:bg-neutral-800 bg-neutral-100 rounded-lg">
          <Label htmlFor="email-notifications" className="flex flex-col cursor-pointer">
            <span className="font-medium text-neutral-900 dark:text-white">Notificaciones por correo</span>
            <span className="text-sm text-gray-400">Recibe actualizaciones sobre tu progreso</span>
          </Label>
          <Switch 
          id="email-notifications" 
          className="bg-blue-500 dark:bg-blue-700" />
        </div>
        <div className="flex items-center justify-between p-4 dark:bg-neutral-800 bg-neutral-100 rounded-lg">
          <Label htmlFor="push-notifications" className="flex flex-col cursor-pointer">
            <span className="font-medium text-neutral-900 dark:text-white">Notificaciones push</span>
            <span className="text-sm text-gray-400">Recibe recordatorios en tu dispositivo</span>
          </Label>
          <Switch id="push-notifications" />
        </div>
        <div className="flex items-center justify-between p-4 dark:bg-neutral-800 bg-neutral-100 rounded-lg">
          <Label htmlFor="course-updates" className="flex flex-col cursor-pointer">
            <span className="font-medium text-neutral-900 dark:text-white">Actualizaciones de cursos</span>
            <span className="text-sm text-gray-400">Sé notificado cuando se añada nuevo contenido</span>
          </Label>
          <Switch id="course-updates" />
        </div>
      </div>
    </div>
  )
}

