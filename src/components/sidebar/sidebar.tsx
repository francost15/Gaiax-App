"use client";
import React, { useEffect, useState } from "react";
import {
  BookOpen,
  ChartLine,
  Settings,
  HelpCircle,
  Shield,
} from "lucide-react";
import { MdHome } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store";
import { useSession } from "next-auth/react";
import { Logo } from "../ui/logo";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Solo para Next.js 13

const menuItems = [
  { icon: MdHome, label: "Inicio", href: "/app" },
  { icon: BookOpen, label: "Mis Cursos", href: "/app/courses/recommended" },
  { icon: ChartLine, label: "Mi progreso", href: "/app/profile" },
  { icon: Settings, label: "Configuración", href: "/app/settings" },
  { icon: HelpCircle, label: "Ayuda", href: "/help" },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";
  const pathname = usePathname(); // Next.js 13

  // Detectar el tamaño de la ventana para forzar la apertura en pantallas grandes
  const [isLargeDevice, setIsLargeDevice] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.innerWidth >= 1024); // 1024px => lg
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determinar si mostramos el sidebar (abierto en pantallas grandes o si el usuario lo abrió)
  const showSidebar = isLargeDevice || isSideMenuOpen;

  return (
    <div>
      {/* Overlay en pantallas pequeñas */}
      {!isLargeDevice && isSideMenuOpen && (
        <>
          <div className="fixed inset-0" onClick={closeMenu} />
          <div
            onClick={closeMenu}
            className="fixed top-0 left-0 z-10 w-screen h-screen fade-in"
          />
        </>
      )}

      <aside
        data-sidebar
        className={cn(
          "z-50 w-64 flex flex-col bg-white dark:bg-neutral-900",
          // En pantallas grandes usamos `sticky top-0`; en pantallas pequeñas, `fixed top-0 left-0`
          isLargeDevice
            ? "sticky top-0 h-screen"
            : "fixed top-0 left-0 h-screen",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-2">
          <Logo />
        </div>

        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center p-3 space-x-2  text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-800",
                  isActive && " border-primaryper border-l-4"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center p-2 space-x-2 text-gray-700 rounded-md dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700"
            >
              <Shield className="w-5 h-5" />
              <span>Admin</span>
            </Link>
          )}
        </nav>
      </aside>
    </div>
  );
};
