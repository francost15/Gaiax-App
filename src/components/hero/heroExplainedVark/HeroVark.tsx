import { Card, CardContent } from "@/components";
import { Eye, Ear, BookOpen, Hand } from 'lucide-react';

const varkStyles = [
  { 
    name: 'Visual', 
    icon: Eye, 
    description: 'Aprende con imágenes y diagramas',
  },
  { 
    name: 'Auditivo', 
    icon: Ear, 
    description: 'Prefiere escuchar y discutir',
  },
  { 
    name: 'Lectura/Escritura', 
    icon: BookOpen, 
    description: 'Aprende leyendo y escribiendo',
  },
  { 
    name: 'Kinestésico', 
    icon: Hand, 
    description: 'Aprende haciendo y experimentando',
  },
];

export const HeroVark = () => {
  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Modelo VARK
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nuestra IA adapta el contenido a cada usuario según su estilo de aprendizaje, 
            maximizando la retención y el compromiso de cada miembro de tu equipo.
          </p>
        </div>
        <div className="grid max-w-2xl grid-cols-2 gap-8 mx-auto sm:gap-10 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {varkStyles.map((style) => (
            <Card key={style.name} className="transition-all duration-300 ease-in-out bg-white border-none shadow-none group ">
              <CardContent className="flex flex-col items-center h-full p-6 text-center">
                <div className="p-3 mb-6 transition-all duration-300 bg-blue-100 rounded-full group-hover:bg-blue-200">
                  <style.icon className="w-8 h-8 text-primaryper" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 ">{style.name}</h3>
                <p className="text-sm text-gray-600 transition-colors duration-300 ">{style.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};