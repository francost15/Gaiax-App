import { CardDemo, Button } from '@/components';

export const HeroHome = () => {

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="grid grid-cols-1 px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8 gap-x-8 gap-y-16 lg:grid-cols-2">
        <div data-aos="fade-right">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            <span className="block ">
              Desata el potencial oculto de tu Empresa
            </span>
            <span className="block mt-2 text-blue-600">
              con nuestra IA
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Potencia el aprendizaje de tu equipo con capacitación adaptativa basada en IA y el modelo VARK.
          </p>
          <div className="flex items-center mt-10 gap-x-6">
            <Button size="lg" className="transition-colors duration-300 bg-blue-600 hover:bg-blue-700">
              Comenzar ahora
            </Button>
            <Button variant="outline" size="lg" className="transition-colors duration-300">
              Conoce más
            </Button>
          </div>
        </div>
        <div data-aos="fade-left" data-aos-delay="200">
          <CardDemo />
        </div>
      </div>
    </div>
  );
};