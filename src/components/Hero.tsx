"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <div className="hero-badge inline-flex items-center gap-2 bg-primary/10 text-primary text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Próximo lanzamiento
        </div>

        <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-text mb-4 sm:mb-6">
          <span className="text-primary">NEXUS ERP</span>
          <br />
          <span className="text-xl sm:text-2xl lg:text-3xl font-normal text-text-secondary">
            El único Sistema Administrativo
            <br />
            <span className="font-semibold text-primary">Multi empresa con IA nativa</span> en Venezuela
          </span>
        </h1>

        <p className="hero-sub text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10">
          Transforma la gestión de tu empresa con inteligencia artificial integrada.
          Automatización, análisis predictivo y control total en una sola plataforma.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contacto"
            className="bg-primary text-white text-base font-semibold px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Solicita una Demo
          </a>
          <a
            href="#nosotros"
            className="border border-border text-text-secondary text-base font-semibold px-8 py-3.5 rounded-xl hover:border-primary hover:text-primary transition-all"
          >
            Conoce más
          </a>
        </div>

        <div className="hero-sub mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-text-secondary/60 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            IA Nativa
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Multi Empresa
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            En la Nube
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Hecho en Venezuela
          </span>
        </div>
      </div>
    </section>
  );
}
