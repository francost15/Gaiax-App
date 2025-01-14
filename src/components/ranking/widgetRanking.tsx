import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { TrophyIcon as TrophyFilled } from 'lucide-react'
import { EstiloAprendizaje, Usuario } from '@/interface'

// Mock data for the top 3 in the leaderboard
const topThree: Usuario[] = [
    {
      id: 1,
      nombre: 'Ana García',
      apellido: 'García',
      direccion: '',
      telefono: '',
      email: '',
      password: '',
      puesto: '',
      empresaId: 1,
      estiloAprendizaje: EstiloAprendizaje.auditivo,
      rachaDias: 15,
      puntaje: 1200,
      esAdministrador: false
    },
    {
      id: 2,
      nombre: 'Carlos Rodríguez',
      apellido: 'Rodríguez',
      direccion: '',
      telefono: '',
      email: '',
      password: '',
      puesto: '',
      empresaId: 1,
      estiloAprendizaje: EstiloAprendizaje.visual,
      rachaDias: 12,
      puntaje: 1150,
      esAdministrador: false
    },
    {
      id: 3,
      nombre: 'María López',
      apellido: 'López',
      direccion: '',
      telefono: '',
      email: '',
      password: '',
      puesto: '',
      empresaId: 1,
      estiloAprendizaje: EstiloAprendizaje.kinestesico,
      rachaDias: 10,
      puntaje: 1100,
      esAdministrador: false
    }
  ]
// ...existing code...
export function RankingWidget() {


  return (
    <Link href="/app/ranking">
      <Card className="border-none bg-gradient-to-br from-primaryper rounded-xl to-[#4F46E5] hover:from-[#5558DD] hover:to-[#4338CA] text-white transition-colors duration-300 cursor-pointer w-full h-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrophyFilled className="h-6 w-6 text-yellow-300" />
              <div>
                <p className="text-xs font-semibold">Tu posición</p>
                <p className="text-2xl font-bold">6°</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs hidden sm:block">de {topThree.length + 1}</p>
              <p className="text-sm font-semibold hidden sm:block">Ver ranking</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

