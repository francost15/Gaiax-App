"use client";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-[#5b5ee6] mb-4">GAIAX</h3>
            <p className="text-gray-400">
              Transformando la capacitación empresarial con IA
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-gray-400 hover:text-[#5b5ee6]">Inicio</a></li>
              <li><a href="#nosotros" className="text-gray-400 hover:text-[#5b5ee6]">Nosotros</a></li>
              <li><a href="#suscripciones" className="text-gray-400 hover:text-[#5b5ee6]">Planes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#5b5ee6]">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#5b5ee6]">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#5b5ee6]">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GAIAX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 