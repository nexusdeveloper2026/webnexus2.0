"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#tecnologias", label: "Tecnologías" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <div className="flex items-center gap-10">
          <a href="#inicio" className="flex items-center shrink-0">
            <img src="/logo.png" alt="NEXUS Technology Logo" className="h-8 md:h-10 w-auto object-contain" />
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <div className="relative">
            {/* Anillo de pulso */}
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-secondary opacity-60 animate-ping" />
            <a
              href="#contacto"
              className="relative bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-all shadow-md shadow-primary/20"
            >
              Solicitar Soporte
            </a>
          </div>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          <span className={`block w-6 h-0.5 bg-text transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-text transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-text transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-4 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center"
          >
            Solicitar Demo
          </a>
        </div>
      )}
    </header>
  );
}
