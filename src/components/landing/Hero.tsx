"use client";

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center h-screen px-6 sm:px-12" id="inicio">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-6 lg:pr-20 text-center sm:text-left">
          <h1 data-aos="fade-up" className="text-6xl sm:text-7xl font-extrabold text-[#5b5ee6] tracking-wide">
            GAIAX
          </h1>
          <h2 data-aos="fade-up" className="text-4xl sm:text-5xl font-bold leading-tight">
            Transformando la Capacitación en PYMES con IA
          </h2>
          <p data-aos="fade-up" data-aos-delay="300" className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            La solución inteligente que revoluciona el aprendizaje en pequeñas y medianas empresas.
          </p>
          <div data-aos="fade-up" data-aos-delay="500" className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <button className="px-6 py-3 text-lg font-semibold text-white bg-[#5b5ee6] hover:bg-[#4a4dd4] rounded-lg shadow-md transition-all transform hover:scale-105">
              Comenzar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 