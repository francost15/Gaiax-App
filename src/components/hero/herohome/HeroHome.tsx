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
            <span className="block mt-2 text-primaryper">
              con nuestra IA
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Potencia el aprendizaje de tu equipo con capacitación adaptativa basada en IA y el modelo VARK.
          </p>
          <div className="flex items-center mt-10 gap-x-6">
            <Button
            title='Comenzar ahora'
            size="lg" className="text-white transition-colors duration-300 bg-primaryper hover:bg-primary-hover">
              Comenzar ahora
            </Button>
            <Button 
            title='Conoce más sobre nuestra IA'
            variant="outline" size="lg" className="transition-colors duration-300 hover:text-primaryper ">
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