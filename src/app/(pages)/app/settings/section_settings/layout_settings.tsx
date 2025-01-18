"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, User } from "lucide-react";
import ProfileSettings from "./profile_settings";
import PrivacitySettings from "./changepassword";
import { toast } from "sonner";
const tabs = [
  { id: "profile", label: "Perfil", icon: User, component: ProfileSettings },
  {
    id: "password",
    label: "Privacidad",
    //icono de config
    icon: Settings,
    component: PrivacitySettings,
  },
];

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || ProfileSettings;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <nav className="sm:w-64 bg-white dark:bg-neutral-800 p-4 border-r border-gray-200 dark:border-gray-700">
          <ul className="space-y-2">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? "bg-[#6366F1] text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex-grow p-6 bg-white dark:bg-neutral-900">
          {activeTab === "profile" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (isEditing ? "-edit" : "-view")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveComponent
                  isEditing={isEditing}
                  onEdit={() => setIsEditing(true)}
                  onCancel={() => setIsEditing(false)}
                  onSave={() => {
                    setIsEditing(false);
                    toast.success("Perfil actualizado exitosamente");
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
          {activeTab !== "profile" && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <ActiveComponent
                  isEditing={isEditing}
                  onEdit={() => setIsEditing(true)}
                  onCancel={() => setIsEditing(false)}
                  onSave={() => {
                    setIsEditing(false);
                    toast.success("Perfil actualizado exitosamente");
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
