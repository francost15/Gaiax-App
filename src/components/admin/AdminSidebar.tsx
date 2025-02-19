"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../ui/logo";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Brain,
  BarChart2,
  Building2,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      label: "Usuarios",
    },
    {
      href: "/admin/courses",
      icon: <BookOpen className="w-5 h-5" />,
      label: "Cursos",
    },
    {
      href: "/admin/generatecourses",
      icon: <Brain className="w-5 h-5" />,
      label: "Generar Cursos",
    },
    {
      href: "/admin/analytics",
      icon: <BarChart2 className="w-5 h-5" />,
      label: "Análisis",
    },
    {
      href: "/admin/companies",
      icon: <Building2 className="w-5 h-5" />,
      label: "Empresas",
    },
  ];

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-white dark:bg-neutral-900 sticky top-0 border-r border-gray-200 dark:border-neutral-800">
      <div className="p-4 border-b border-gray-200 dark:border-neutral-800">
        <Logo  />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Panel Administrativo</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none
              hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-200
              ${pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href)) 
                ? "border-primaryper border-l-4 bg-gray-100 dark:bg-neutral-800" 
                : ""
              }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-neutral-800">
        <Link
          href="/app"
          className="flex items-center space-x-6 p-4 rounded-xl 
            hover:bg-gray-200 dark:hover:bg-neutral-800 transition-all duration-200"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Volver a la App</span>
        </Link>
      </div>
    </aside>
  );
} 