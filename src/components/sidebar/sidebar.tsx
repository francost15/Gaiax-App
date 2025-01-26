"use client";
import React from "react";
import { MdHome } from "react-icons/md";
import { BookOpen, ChartLine } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { usePathname } from "next/navigation"; // Solo para Next.js 13

const menuItems = [
  { icon: MdHome, label: "Inicio", href: "/app" },
  { icon: BookOpen, label: "Mis Cursos", href: "/app/courses/recommended" },
  { icon: ChartLine, label: "Mi progreso", href: "/app/profile" },
];

export function Sidebar() {
  const pathname = usePathname(); // Hook de Next.js 13 para obtener la ruta actual

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-white dark:bg-neutral-900 shadow-lg sticky top-0">
      <div className="p-2 ">
        <Logo />
      </div>
      <nav className="flex-1  space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none hover:bg-gray-200 dark:hover:bg-neutral-800 ${
                isActive ? "border-primaryper border-l-4" : ""
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
