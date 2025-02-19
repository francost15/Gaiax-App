"use client";
import React from "react";
import { MdHome } from "react-icons/md";
import { BookOpen, ChartLine, Settings } from "lucide-react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { usePathname } from "next/navigation"; // Solo para Next.js 13

import { RiFocus2Line } from "react-icons/ri";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname(); // Hook de Next.js 13 para obtener la ruta actual
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen bg-white dark:bg-neutral-900 sticky top-0">
      <div className="p-2">
        <Logo/>
      </div>
      <nav className="flex-1 space-y-2">
        <Link
          href="/app"
          className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none hover:bg-gray-200 dark:hover:bg-neutral-800 ${
            pathname === "/app" ? "border-primaryper border-l-4" : ""
          }`}
        >
          <MdHome className="w-5 h-5" />
          <span>Inicio</span>
        </Link>
        <Link
          href="/app/courses/recommended"
          className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none hover:bg-gray-200 dark:hover:bg-neutral-800 ${
            pathname === "/app/courses/recommended"
              ? "border-primaryper border-l-4"
              : ""
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Mis Cursos</span>
        </Link>
        <Link
          href="/app/profile"
          className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none hover:bg-gray-200 dark:hover:bg-neutral-800 ${
            pathname === "/app/profile" ? "border-primaryper border-l-4" : ""
          }`}
        >
          <ChartLine className="w-5 h-5" />
          <span>Mi progreso</span>
        </Link>
        <Link
          href="/app/chatbot"
          className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none hover:bg-gray-200 dark:hover:bg-neutral-800 ${
            pathname === "/app/chatbot" ? "border-primaryper border-l-4" : ""
          }`}
        >
          <RiFocus2Line className="w-5 h-5" />
          <span>XpertAI</span>
        </Link>

        {/* Enlace al Panel Admin solo visible para administradores */}
        {isAdmin && (
          <Link
            href="/admin"
            className={`flex items-center space-x-6 p-4 rounded-xl rounded-l-none 
              hover:bg-gray-200 dark:hover:bg-neutral-800 
              ${pathname.startsWith("/admin") ? "border-primaryper border-l-4" : ""}
              group transition-all duration-300`}
          >
            <div className="relative">
              <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primaryper rounded-full" />
            </div>
            <span>Panel Admin</span>
          </Link>
        )}
      </nav>
    </aside>
  );
}
