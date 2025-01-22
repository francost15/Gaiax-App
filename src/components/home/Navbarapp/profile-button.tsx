import { LogOut, Settings, User, HelpCircle, Moon, Sun } from "lucide-react";
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
} from "@/components";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Role } from "@/interface";

interface Props {
  name: string;
  email: string;
  role: string;
}
export const ProfileButton = ({ name, email, role }: Props) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          title="perfil"
          role="button"
          tabIndex={0}
          aria-label="Abrir menu del perfil"
          className="transition-opacity cursor-pointer hover:opacity-80"
        >
          <AvatarFallback className="text-white bg-primaryper">
            FA
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 p-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-neutral-800 dark:border-neutral-700"
      >
        <DropdownMenuLabel className="p-4 mb-2 rounded-md bg-gray-50 dark:bg-neutral-900">
          <div className="flex items-center space-x-3">
            <Avatar
              role="button"
              tabIndex={0}
              aria-label="Abrir menu del perfil"
              className="w-10 h-10"
            >
              <AvatarFallback className="text-white bg-primaryper">
                FA
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {email}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {role}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/app/profile">
            <DropdownMenuItem className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700">
              <User className="w-4 h-4 mr-2 text-primaryper" />
              <span>Perfil</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/app/settings">
            <DropdownMenuItem className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700">
              <Settings className="w-4 h-4 mr-2 text-primaryper" />
              <span>Configuración</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-neutral-700" />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700">
              <Sun className="w-4 h-4 mr-2 text-primaryper" />
              <span>Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="bg-white border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700"
              >
                <Sun className="w-4 h-4 mr-2 text-primaryper" />
                <span>Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700"
              >
                <Moon className="w-4 h-4 mr-2 text-primaryper" />
                <span>Oscuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700"
              >
                <Settings className="w-4 h-4 mr-2 text-primaryper" />
                <span>Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuItem className="rounded-md focus:bg-gray-100 dark:focus:bg-neutral-700">
            <HelpCircle className="w-4 h-4 mr-2 text-primaryper" />
            <span>Ayuda</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-neutral-700" />
        <DropdownMenuItem
          className="text-red-600 rounded-md dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20"
          onSelect={() => signOut()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
