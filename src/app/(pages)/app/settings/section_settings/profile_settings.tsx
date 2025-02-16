"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Target } from "lucide-react";
import { getProfileData } from "@/actions/profile/get-profile-data";
import { toast } from "sonner";
import { updateProfile } from "@/actions/profile/update-profile";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface ProfileData {
  name: string;
  lastname: string;
  email: string;
  role: string;
  company: string;
  image: string;
  exp: number;
}

export default function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    lastname: "",
    email: "",
    role: "",
    company: "",
    image: "",
    exp: 0
  });
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfileData();
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        toast.error("Error al cargar el perfil");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.promise(
      (async () => {
        await updateProfile({
          name: profile.name,
          lastname: profile.lastname,
          email: profile.email,
        });
        setIsEditing(false);
        router.refresh();

        return new Promise<void>((resolve) => {
          setTimeout(async () => {
            await signOut({ 
              redirect: true,
              callbackUrl: "/auth/login"
            });
            resolve();
          }, 2000);
        });
      })(),
      {
        loading: 'Actualizando perfil...',
        success: 'Perfil actualizado correctamente. Cerrando sesión...',
        error: 'Error al actualizar el perfil',
        duration: 2000
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primaryper" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Información Personal
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Actualiza tu información y cómo te ven otros
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-primaryper hover:bg-primary-hover text-white"
          >
            Editar perfil
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {/* Avatar y Nivel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8">
          {/* Avatar Section */}
          <div className="flex items-start gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-neutral-100 dark:border-neutral-800 group-hover:border-primaryper transition-all duration-300">
                <AvatarImage src={profile.image || "/placeholder-avatar.jpg"} alt={profile.name} />
                <AvatarFallback className="text-2xl bg-primaryper text-white">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                <Camera className="text-white w-6 h-6" />
              </div>
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-medium text-gray-900 dark:text-white">
                Foto de perfil
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Esta foto será visible para todos los miembros de tu organización
              </p>
              <div className="flex gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Cambiar foto
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </div>

          {/* Nivel/Exp Section */}
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Nivel {Math.floor(profile.exp / 100)}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile.exp} XP totales
                </p>
              </div>
              <div className="p-3 bg-primaryper/10 rounded-lg">
                <Target className="w-6 h-6 text-primaryper" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Progreso</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {profile.exp % 100}/100 XP
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                <div
                  className="bg-primaryper h-2 rounded-full transition-all"
                  style={{ width: `${(profile.exp % 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                Nombre
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="bg-white dark:bg-neutral-800"
                  placeholder="Tu nombre"
                />
              ) : (
                <div className="p-2 text-gray-900 dark:text-white">
                  {profile.name}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname" className="text-gray-700 dark:text-gray-300">
                Apellidos
              </Label>
              {isEditing ? (
                <Input
                  id="lastname"
                  name="lastname"
                  value={profile.lastname}
                  onChange={handleChange}
                  className="bg-white dark:bg-neutral-800"
                  placeholder="Tus apellidos"
                />
              ) : (
                <div className="p-2 text-gray-900 dark:text-white">
                  {profile.lastname}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                Correo electrónico
              </Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="bg-white dark:bg-neutral-800"
                />
              ) : (
                <div className="p-2 text-gray-900 dark:text-white">
                  {profile.email}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">
                Rol
              </Label>
              <div className="p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-700">
                {profile.role}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                El rol es asignado por tu organización
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 dark:text-gray-300">
                Empresa
              </Label>
              <div className="p-2 bg-gray-50 dark:bg-neutral-800 rounded-lg text-gray-900 dark:text-white border border-gray-200 dark:border-neutral-700">
                {profile.company}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Perteneces a esta organización
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-neutral-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-primaryper hover:bg-primary-hover text-white"
              >
                Guardar cambios
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
