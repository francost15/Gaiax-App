import { Card, CardContent } from '@/components'
import { Cpu, BarChart2, Trophy } from 'lucide-react'
const features = [
    {
      name: 'Crea cursos en minutos',
      description: 'Con nuestra herramienta de autoría diseña todas las experiencias de aprendizaje que tu equipo necesite.',
      icon: Cpu,
    },
    {
      name: 'Gamifica tus cursos',
      description: 'Motiva a tus colaboradores con insignias, trivias, etc. e incrementa el porcentaje de finalización.',
      icon: Trophy,
    },
    {
      name: 'Obtén reportes y analíticas',
      description: 'Visualiza los avances, calificaciones y métricas de tus colaboradores en tiempo real.',
      icon: BarChart2,
    },
  ]
export const HeroFeatures = () => {
  return (
    <div className="py-24 bg-white sm:py-32">
    <div className="px-6 mx-auto max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto mb-16 text-center" data-aos="fade-up">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tecnología de punta a tu alcance
        </h2>
        <p className="text-lg text-gray-600">
          Herramientas innovadoras diseñadas para potenciar el aprendizaje en tu organización
        </p>
      </div>
      <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card 
            key={feature.name} 
            className="transition-all duration-300 ease-in-out bg-white border-none shadow-none hover:bg-blue-50 group"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <CardContent className="p-6">
              <div className="inline-block p-3 mb-6 transition-all duration-300 bg-blue-100 rounded-full group-hover:bg-blue-200">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">{feature.name}</h3>
              <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-blue-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
  )
}
