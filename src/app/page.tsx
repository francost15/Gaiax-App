"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";

// Componentes
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HeroCard from "@/components/landing/HeroCard";
import AboutGaiax from "@/components/landing/AboutGaiax";
import ODSSection from "@/components/landing/ODSSection";
 import SubscriptionPlans from "@/components/landing/SubscriptionPlans";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen">
      {/* Hero Section con Overlay Mejorado */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black z-0" />
        
        {/* Efecto de partículas o brillos */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        
        {/* Gradiente superior */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primaryper/20 to-transparent" />
        
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </div>

      {/* Divisor con gradiente */}
      <div className="relative h-24 bg-gradient-to-b from-black to-transparent">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-0 h-1 bg-gradient-to-r from-primaryper via-purple-500 to-primaryper"
        />
      </div>

      {/* Secciones principales con efecto de desplazamiento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        {/* Separador con línea brillante */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryper to-transparent my-12" />
        
        <HeroCard />
        
        {/* Separador con línea brillante */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primaryper to-transparent my-12" />
        
        <ODSSection />
      </motion.div>
      <SubscriptionPlans />
      {/* Footer con gradiente superior */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent to-black" />
        <Footer />
      </div>
    </div>
  );
}

