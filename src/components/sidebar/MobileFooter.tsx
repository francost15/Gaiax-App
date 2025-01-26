"use client";
import React from "react";
import { MdHome } from "react-icons/md";
import { BookOpen, ChartLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Solo para Next.js 13

const mobileMenuItems = [
  { icon: MdHome, label: "Inicio", href: "/app" },
  { icon: BookOpen, label: "Mis Cursos", href: "/app/courses/recommended" },
  { icon: ChartLine, label: "Mi progreso", href: "/app/profile" },
];

export function MobileFooter() {
  const pathname = usePathname(); // Hook de Next.js 13 para obtener la ruta actual

  return (
    <footer className=" lg:hidden fixed bottom-0 left-0 right-0 h-16 z-50 bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700 flex justify-around items-center">
      {mobileMenuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center w-full h-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800 ${
              isActive
                ? "bg-gray-300 dark:bg-neutral-800 border-primaryper border-t-4"
                : ""
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </footer>
  );
}
