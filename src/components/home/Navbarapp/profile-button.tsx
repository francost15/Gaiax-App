"use client";

import { LogOut, Settings, User, HelpCircle, Moon, Sun, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Avatar,
  AvatarFallback,
  Badge,
} from "@/components";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Props {
  name: string;
  email: string;
  role: string;
}

export const ProfileButton = ({ name, email, role }: Props) => {
  const { setTheme } = useTheme();
  const initial = name.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="flex items-center gap-3 p-2 transition-all rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800 focus:outline-none" 
          aria-label="Menú de perfil"
        >
          <Avatar
            className="w-9 h-9 transition-all border-2 border-transparent hover:border-primaryper focus:border-primaryper select-none"
            aria-hidden="true"
          >
            <AvatarFallback 
              className="text-sm font-medium text-white bg-gradient-to-br from-primaryper to-[#7375F3] select-none"
            >
              {initial}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[280px] p-2 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 rounded-xl shadow-lg"
      >
        <div className="p-4 mb-2 space-y-3 bg-gradient-to-br from-primaryper/10 to-[#7375F3]/10 rounded-lg dark:bg-neutral-800/50">
          <div className="flex items-start gap-3">
            <Avatar className="w-10 h-10 border-2 border-white dark:border-neutral-700">
              <AvatarFallback className="text-sm font-medium text-white bg-gradient-to-br from-primaryper to-[#7375F3]">
                {initial}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
              <Badge 
                variant="secondary" 
                className="mt-2 text-xs bg-white/50 dark:bg-neutral-800/50"
              >
                {role}
              </Badge>
            </div>
          </div>
        </div>

        <DropdownMenuGroup>
          <Link href="/app/profile">
            <DropdownMenuItem className="flex items-center p-3 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800">
         
              <div className="flex flex-col">
                <span className="font-medium">Ver Mi Perfil</span>
            
              </div>
            </DropdownMenuItem>
          </Link>
          
          <Link href="/app/settings">
            <DropdownMenuItem className="flex items-center p-3 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800">
        
              <div className="flex flex-col">
                <span className="font-medium">Configuración</span>
             
              </div>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-neutral-800" />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center p-3 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800">
       
              <div className="flex flex-col">
                <span className="font-medium">Tema</span>
              
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-2 bg-white border rounded-xl border-gray-200 dark:bg-neutral-900 dark:border-neutral-800">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="flex items-center p-2 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800"
              >
                <Sun className="w-4 h-4 text-primaryper" />
                <span>Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="flex items-center p-2 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800"
              >
                <Moon className="w-4 h-4 text-primaryper" />
                <span>Oscuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="flex items-center p-2 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800"
              >
                <Settings className="w-4 h-4 text-primaryper" />
                <span>Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-neutral-800" />
        
        <DropdownMenuItem
          className="flex items-center p-3 text-sm rounded-lg cursor-pointer focus:bg-gray-100 dark:focus:bg-neutral-800 "
          onSelect={() => signOut()}
        >
          <div className="flex flex-col">
            <span className="font-medium text-red-600 hover:text-red-500">Cerrar sesión</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
