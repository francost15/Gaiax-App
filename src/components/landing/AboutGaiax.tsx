"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBullseye, FaEye, FaRocket, FaHandshake } from "react-icons/fa";

export default function AboutGaiax() {
  const stats = [
    { number: "93%", label: "Satisfacción" },
    { number: "+1000", label: "Empleados Capacitados" },
    { number: "45%", label: "Mejora en Productividad" },
    { number: "28min", label: "Tiempo Promedio por Lección" },
  ];

  return (
    <section className="relative text-white" id="nosotros">
      {/* Primera sección: Quiénes Somos */}
      <div className="py-20 px-6 sm:px-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 items-center gap-12"
          >
            <div className="text-center sm:text-left space-y-6">
              <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent">
                ¿Quiénes Somos?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                Gaiax es una plataforma impulsada por inteligencia artificial, diseñada para revolucionar la capacitación en pequeñas y medianas empresas.
              </p>
              
              {/* Estadísticas */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-primaryper/10 to-purple-500/10 
                              p-4 rounded-xl border border-primaryper/10"
                  >
                    <div className="font-bold text-2xl text-primaryper">{stat.number}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10">
                <Image 
                  src="/lexi.png"
                  alt="Lexi - Asistente IA"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              {/* Efectos decorativos */}
              <div className="absolute inset-0 bg-gradient-to-r from-primaryper/20 to-purple-500/20 blur-3xl rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Segunda sección: Misión y Visión */}
      <div className="py-20 px-6 sm:px-12 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent text-center mb-16"
          >
            Nuestra Misión y Valores
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaBullseye />,
                title: "Misión",
                description: "Brindar herramientas tecnológicas innovadoras que optimicen la capacitación en PYMES."
              },
              {
                icon: <FaEye />,
                title: "Visión",
                description: "Hacer que cada pyme en México crezca a través del talento de su gente."
              },
              {
                icon: <FaRocket />,
                title: "Innovación",
                description: "Constantemente mejorando y adaptando nuestra tecnología."
              },
              {
                icon: <FaHandshake />,
                title: "Compromiso",
                description: "Dedicados al éxito y crecimiento de nuestros clientes."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl
                               border border-primaryper/10 hover:border-primaryper/30
                               transition-all duration-300
                               hover:shadow-[0_0_30px_rgba(93,93,255,0.15)]">
                  <div className="text-primaryper text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute -left-4 top-1/2 w-32 h-32 bg-primaryper/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-4 bottom-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
} 