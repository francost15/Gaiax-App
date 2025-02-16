"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Shield, Palette } from "lucide-react";
import ProfileSettings from "./profile_settings";
import PrivacitySettings from "./changepassword";
import { toast } from "sonner";


const tabs = [
  { 
    id: "profile", 
    label: "Perfil", 
    icon: User,
    description: "Información personal",
    component: ProfileSettings 
  },
  {
    id: "password",
    label: "Seguridad",
    icon: Shield,
    description: "Contraseña y autenticación",
    component: PrivacitySettings,
  },
  {
    id: "notifications",
    label: "Notificaciones",
    icon: Bell,
    description: "Preferencias de notificaciones",
    component: () => <div>Próximamente</div>,
  },
  {
    id: "appearance",
    label: "Apariencia",
    icon: Palette,
    description: "Tema y visualización",
    component: () => <div>Próximamente</div>,
  },
];

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("profile");

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || ProfileSettings;

  return (
    <div className="space-y-8">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 dark:border-neutral-800">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primaryper text-primaryper"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 lg:p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
            </div>

            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
