import SettingsLayout from './section_settings/layout_settings'

export default function SettingsPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Configuración
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Administra tu cuenta y preferencias
          </p>
        </div>
        <SettingsLayout />
      </div>
    </div>
  )
}

