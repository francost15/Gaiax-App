"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#suscripciones", label: "Planes" },
    { href: "/app", label: "Iniciar Sesión" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-black/80 backdrop-blur-md" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-end items-center">
          {/* Links de navegación para desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`relative text-sm font-medium ${
                  link.href === "/app/login"
                    ? "px-4 py-2 bg-primaryper text-white rounded-lg hover:bg-primaryper/90 transition-colors"
                    : "text-gray-300 hover:text-white transition-colors"
                }`}
                whileHover={link.href !== "/app/login" ? { y: -2 } : {}}
              >
                {link.href !== "/app/login" && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primaryper"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Botón de menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`block text-center py-2 ${
                  link.href === "/app/login"
                    ? "bg-primaryper text-white rounded-lg"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                whileHover={{ x: 10 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
} 