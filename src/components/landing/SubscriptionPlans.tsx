"use client";
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaBuilding, FaMoneyBillWave, FaBriefcase, FaCheck } from "react-icons/fa";

const subscriptionPlans = [
  {
    title: "Plan Solidario",
    price: "$800",
    period: "MXN/mes",
    description: "Ideal para micro y pequeñas empresas",
    features: [
      "Hasta 10 empleados",
      "Flashcards y quizzes interactivos",
      "Estadísticas en tiempo real",
      "Descuento para zonas marginadas",
    ],
    icon: <FaUsers className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
    highlight: "Popular"
  },
  {
    title: "Plan Crecimiento",
    price: "$2,500",
    period: "MXN/mes",
    description: "Para PYMEs en expansión",
    features: [
      "11-50 empleados",
      "Simulaciones y podcasts",
      "Reportes detallados",
      "Asesoría personalizada",
      "Bonificación por impacto social",
    ],
    icon: <FaChartLine className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
    isPopular: true
  },
  {
    title: "Plan Transformación",
    price: "$5,500",
    period: "MXN/mes",
    description: "Empresas en consolidación",
    features: [
      "Más de 50 empleados",
      "Gamificación avanzada",
      "Integración con ERP/LMS",
      "Soporte prioritario 24/7",
      "Programa de becas incluido",
    ],
    icon: <FaBuilding className="text-6xl text-primaryper group-hover:scale-110 transition-transform duration-300" />,
  },
];

export default function SubscriptionPlans() {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white py-20 relative overflow-hidden" id="suscripciones">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent mb-6">
            Planes de Suscripción
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Soluciones flexibles y escalables para impulsar el crecimiento de tu empresa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8
                            border border-primaryper/10 hover:border-primaryper/30
                            transition-all duration-300 h-full
                            hover:shadow-[0_0_30px_rgba(93,93,255,0.15)]
                            ${plan.isPopular ? 'border-primaryper border-2' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primaryper to-purple-500 text-white px-4 py-1 rounded-full text-sm">
                      {plan.highlight}
                    </span>
                  </div>
                )}

                <div className="flex flex-col items-center text-center space-y-6">
                  {plan.icon}
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent">
                      {plan.title}
                    </h3>
                    <p className="text-gray-400 mt-2">{plan.description}</p>
                  </div>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <FaCheck className="text-primaryper mr-2 flex-shrink-0" />
                        <span className="text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 px-8 bg-gradient-to-r from-primaryper to-purple-500 
                             text-white rounded-xl font-medium
                             hover:opacity-90 transition-all duration-300"
                  >
                    Comenzar Ahora
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Elementos decorativos */}
        <div className="absolute -left-4 top-1/2 w-32 h-32 bg-primaryper/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-4 bottom-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
} 