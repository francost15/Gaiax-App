'use client'

import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

export const UpButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      title="Ir arriba"
      className={`fixed z-50 p-3 text-white rounded-full shadow-lg bottom-4 right-4 bg-primaryper hover:bg-primary-hover
                  transform transition-opacity duration-300 ${
                    visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <FaChevronUp />
    </button>
  );
}