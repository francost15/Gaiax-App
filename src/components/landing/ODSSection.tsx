"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const odsData = [
  {
    id: 4,
    title: "Educación de Calidad",
    description: "Garantizar una educación inclusiva, equitativa y de calidad",
    image: "/ODS4.jpg"
  },

  {
    id: 9,
    title: "Industria e Innovación",
    description: "Construir infraestructura resiliente y fomentar la innovación",
    image: "/ODS9.png"
  },

];

export default function ODSSection() {
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
            Objetivos de Desarrollo Sostenible
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprometidos con los ODS de la ONU para construir un futuro más sostenible y equitativo
          </p>
        </motion.div>
        
        <div className="flex justify-center items-center gap-12 flex-wrap max-w-4xl mx-auto">
          {odsData.map((ods, index) => (
            <motion.div 
              key={ods.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(93, 93, 255, 0.2)"
              }}
              className="group w-full sm:w-[300px]"
            >
              <div className="relative aspect-square mb-4 bg-gradient-to-br from-primaryper/10 to-purple-500/10 rounded-2xl overflow-hidden 
                            transition-all duration-300 group-hover:from-primaryper/20 group-hover:to-purple-500/20
                            border border-primaryper/10 group-hover:border-primaryper/30"
              >
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <Image
                    src={ods.image}
                    alt={`ODS ${ods.id} - ${ods.title}`}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    priority={index < 2}
                  />
                </div>
              </div>
              <div className="text-center transform transition-all duration-300 group-hover:translate-y-1">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primaryper to-purple-500 bg-clip-text text-transparent mb-2">
                  {ods.title}
                </h3>
                <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1">
                  {ods.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements mejorados */}
        <div className="absolute -left-4 top-1/2 w-32 h-32 bg-primaryper/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-4 bottom-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
    </section>
  );
} 