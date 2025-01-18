"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

interface ProfileSettingsProps {
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function ProfileSettings({
  isEditing,
  onEdit,
  onCancel,
  onSave,
}: ProfileSettingsProps) {
  const [profile, setProfile] = useState({
    name: "Franco Alessandro Sanchez Trinidad",
    email: "franco@gmail.com",
    role: "Desarrollador",
    company: "WimxMovil",
    bio: "Desarrollador apasionado por el aprendizaje continuo y la innovación tecnológica.",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 border-neutral-700 group-hover:border-[#6366F1] transition-all duration-300">
            <AvatarImage src="/placeholder-avatar.jpg" alt={profile.name} />
            <AvatarFallback className="text-2xl bg-[#6366F1]">
              FA
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
            <Camera className="text-white" />
          </div>
        </div>
        <Button
          variant="outline"
          className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:bg-neutral-800 dark:text-white dark:border-gray-700 dark:hover:bg-neutral-700"
        >
          Cambiar foto
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-gray-700 dark:text-white">
            Nombre completo
          </Label>
          {isEditing ? (
            <Input
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white"
            />
          ) : (
            <span className="text-gray-900 dark:text-white">
              {profile.name}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-white">
            Correo electrónico
          </Label>
          {isEditing ? (
            <Input
              id="email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white"
            />
          ) : (
            <span className="text-gray-900 dark:text-white">
              {profile.email}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role" className="text-gray-700 dark:text-white">
            Rol
          </Label>
          {isEditing ? (
            <Input
              id="role"
              name="role"
              value={profile.role}
              onChange={handleChange}
              className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white"
            />
          ) : (
            <span className="text-gray-900 dark:text-white">
              {profile.role}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company" className="text-gray-700 dark:text-white">
            Empresa
          </Label>
          {isEditing ? (
            <Input
              id="company"
              name="company"
              value={profile.company}
              onChange={handleChange}
              className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white"
            />
          ) : (
            <span className="text-gray-900 dark:text-white">
              {profile.company}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio" className="text-gray-700 dark:text-white">
            Biografía
          </Label>
          {isEditing ? (
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white"
            />
          ) : (
            <span className="text-gray-900 dark:text-white">{profile.bio}</span>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          {isEditing ? (
            <>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#6366F1] hover:bg-[#5558DD] text-white"
              >
                Guardar cambios
              </Button>
            </>
          ) : (
            <Button
              type="button"
              onClick={onEdit}
              className="bg-[#6366F1] hover:bg-[#5558DD] text-white"
            >
              Editar perfil
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
