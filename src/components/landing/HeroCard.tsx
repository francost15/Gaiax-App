"use client";
import { motion } from "framer-motion";
import { 
  FaBolt, FaUserShield, FaBrain, FaChartLine, 
  FaRobot, FaUsers, FaMedal, FaLightbulb 
} from "react-icons/fa";

export default function HeroCard() {
  const ServiceData = [
    {
      title: "IA Personalizada",
      description: "Algoritmos adaptativos que personalizan el aprendizaje según el perfil y progreso de cada empleado.",
      icon: <FaRobot className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
      highlight: "Nuevo"
    },
    {
      title: "Aprendizaje Práctico",
      description: "Simulaciones interactivas y casos reales que permiten aplicar lo aprendido inmediatamente.",
      icon: <FaBrain className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
      highlight: "Popular"
    },
    {
      title: "Análisis Avanzado",
      description: "Métricas detalladas y seguimiento del progreso para optimizar la capacitación.",
      icon: <FaChartLine className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
    },
    {
      title: "Seguridad Empresarial",
      description: "Protección de datos y contenido confidencial con estándares de nivel empresarial.",
      icon: <FaUserShield className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
    },
    {
      title: "Aprendizaje Colaborativo",
      description: "Fomenta la interacción y el intercambio de conocimientos entre empleados.",
      icon: <FaUsers className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
    },
    {
      title: "Gamificación Efectiva",
      description: "Sistema de recompensas y logros que mantiene la motivación y el compromiso.",
      icon: <FaMedal className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent mb-6">
            ¿Por qué elegir GAIAX?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Revolucionamos la capacitación empresarial con tecnología de punta y metodologías probadas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ServiceData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl
                            border border-primaryper/10 hover:border-primaryper/30
                            transition-all duration-300 h-full
                            hover:shadow-[0_0_30px_rgba(93,93,255,0.15)]">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    {service.icon}
                    {service.highlight && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primaryper to-purple-500 
                                     text-white text-xs px-2 py-1 rounded-full">
                        {service.highlight}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -left-4 top-1/2 w-32 h-32 bg-primaryper/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-4 bottom-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
} 