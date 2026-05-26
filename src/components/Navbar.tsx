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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <a href="#inicio" className="flex items-center gap-2">
          <img src="/logo.svg" alt="NEXUS Technology" className="w-8 h-8" />
          <span className="font-bold text-lg text-primary">NEXUS</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-text-secondary hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Solicitar Demo
          </a>
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
            className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg text-center"
          >
            Solicitar Demo
          </a>
        </div>
      )}
    </header>
  );
}
