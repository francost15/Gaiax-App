'use client'

import { useState } from 'react'
import { Input,Avatar,AvatarFallback ,Button,Label,Textarea } from "@/components"
import { Camera } from 'lucide-react'

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: "Franco Alessandro Sanchez Trinidad",
    email: "franco@gmail.com",
    role: "Desarrollador",
    company: "WimxMovil",
    bio: "Desarrollador apasionado por el aprendizaje continuo y la innovación tecnológica."
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí enviarías los datos actualizados al backend
    console.log('Profile updated:', profile)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 dark:border-neutral-700 border-neutral-200 group-hover:border-primaryper transition-all duration-300">
            {/* <AvatarImage src="/placeholder-avatar.jpg" alt={profile.name} /> */}
            <AvatarFallback className="text-2xl bg-primaryper">FA</AvatarFallback>
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
          <Label htmlFor="name" className="text-gray-700 dark:text-white">Nombre completo</Label>
          <Input 
            id="name" 
            name="name" 
            value={profile.name} 
            onChange={handleChange} 
            className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white" 
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-white">Correo electrónico</Label>
          <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role" className="text-gray-700 dark:text-white">Rol</Label>
          <Input id="role" name="role" value={profile.role} onChange={handleChange} className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company" className="text-gray-700 dark:text-white">Empresa</Label>
          <Input id="company" name="company" value={profile.company} onChange={handleChange} className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio" className="text-gray-700 dark:text-white">Biografía</Label>
          <Textarea 
            id="bio" 
            name="bio" 
            value={profile.bio} 
            onChange={handleChange} 
            className="bg-white dark:bg-neutral-800 border-gray-300 dark:border-neutral-700 text-gray-900 dark:text-white" 
          />
        </div>
        <Button title='Guardar' type="submit" className="w-full bg-primaryper hover:bg-primary-hover text-white">Guardar cambios</Button>
      </form>
    </div>
  )
}

