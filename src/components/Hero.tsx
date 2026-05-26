"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function getDaysLeft() {
  const launch = new Date();
  launch.setDate(launch.getDate() + 90);
  launch.setHours(0, 0, 0, 0);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((launch.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    setDaysLeft(getDaysLeft());
    const interval = setInterval(() => setDaysLeft(getDaysLeft()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", { opacity: 0, y: 40, duration: 1, ease: "power3.out" });
      gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, delay: 0.3, ease: "power2.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, delay: 0.6, ease: "power2.out" });
      gsap.from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.6, delay: 0.2, ease: "back.out(1.7)" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-white"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-primary/[0.02] to-white pointer-events-none" />
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-secondary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      {/* Grid Layout Container */}
      <div className="relative w-full max-w-[1600px] mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_minmax(auto,750px)_1fr] min-h-screen z-10">

        {/* Imagen Izquierda (Empresario) */}
        <div className="hero-img-left hidden lg:block relative w-full h-full pointer-events-none z-20">
          <img
            src="/empresario.png"
            alt="Empresario"
            className="absolute -right-12 xl:-right-20 bottom-0 h-[80vh] xl:h-[90vh] w-auto max-w-none object-contain drop-shadow-2xl origin-bottom-right"
          />
        </div>

        {/* Contenido Central */}
        <div className="text-center py-24 lg:py-32 w-full px-4 sm:px-6 lg:px-8 self-center relative z-10">
          <div className="hero-badge inline-flex items-center gap-3 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Próximo lanzamiento
            {daysLeft !== null && (
              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {daysLeft} días
              </span>
            )}
          </div>

          <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-text mb-4 sm:mb-6">
            <span className="text-primary">NEXUS ERP</span>
          </h1>

          <p className="hero-sub text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10">
            El único sistema administrativo ERP Multi-Empresa con IA nativa en Venezuela.
            Prepárate para llevar tu negocio al siguiente nivel con <span className="text-primary">NEXUS ERP</span>.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contacto"
              className="bg-gradient-to-r from-primary to-secondary text-white text-base font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              Solicita tu prueba GRATIS
            </a>
            <a
              href="https://www.youtube.com/watch?v=9HaU8NjH7bI"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-text-secondary text-base font-semibold px-8 py-3.5 rounded-xl hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Ver Video
            </a>
          </div>

          <div className="hero-sub mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-2 text-text-secondary/80 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              IA Nativa
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Multi Empresa
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Multi Moneda
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Multi Sucursales
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Multi Almacenes
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Servidor local + Cloud
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Homologado ante el SENIAT
            </span>
          </div>
        </div>

        {/* Imagen Derecha (Edificio) */}
        <div className="hero-img-right hidden lg:block relative w-full h-full pointer-events-none">
          <img
            src="/edificio.png"
            alt="Edificio"
            className="absolute left-4 xl:left-8 bottom-0 h-[80vh] xl:h-[90vh] w-auto max-w-none object-contain drop-shadow-2xl origin-bottom-left"
          />
        </div>
      </div>
    </section>
  );
}
