"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

function getTimeLeft() {
  const launch = new Date();
  launch.setDate(launch.getDate() + 90);
  launch.setHours(0, 0, 0, 0);
  const diff = Math.max(0, launch.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => {
      gsap.from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" });
      gsap.from(".hero-title", { opacity: 0, y: 40, duration: 1, ease: "power3.out" });
      gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: "power2.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, delay: 0.4, ease: "power2.out" });
      gsap.from(".hero-img-left>div", { opacity: 0, scale: 0.85, duration: 1, ease: "power2.out" });
      gsap.from(".hero-img-right>div", { opacity: 0, scale: 0.85, duration: 1, delay: 0.15, ease: "power2.out" });
    };

    window.addEventListener("video-popup-closed", handler, { once: true });
    return () => window.removeEventListener("video-popup-closed", handler);
  }, []);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-transparent"
      style={{ zIndex: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.07] via-primary/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-secondary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      {/* Grid Layout Container */}
      <div className="relative w-full max-w-[1600px] mx-auto flex flex-col lg:grid lg:grid-cols-[1fr_minmax(auto,750px)_1fr] min-h-[100dvh] lg:min-h-screen z-10">

        {/* Imagen Izquierda (Empresario) */}
        <div className="hero-img-left hidden lg:block relative w-full h-full z-20 group">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/empresario.png"
              alt="Empresario"
              width={800}
              height={1200}
              unoptimized
              priority
              className="absolute -right-4 lg:-right-12 xl:-right-20 top-1/2 -translate-y-1/2 h-[650px] lg:h-[750px] xl:h-[850px] w-auto max-w-none object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-[calc(50%+20px)]"
            />
          </div>
        </div>

        {/* Contenido Central */}
        <div className="text-center pt-20 pb-12 lg:py-32 w-full px-3 sm:px-6 lg:px-8 self-center relative z-10">
          <div className="bg-white/50 backdrop-blur-xl rounded-3xl shadow-sm border border-white/20 p-4 sm:p-10 lg:p-12 max-w-2xl mx-auto">
            <div className="hero-badge inline-flex flex-wrap items-center justify-center gap-2 bg-primary/10 text-primary text-[10px] sm:text-sm font-semibold px-3 py-1.5 rounded-full mb-4 sm:mb-8">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="hidden sm:inline">Lanzamiento en:</span>
              {timeLeft !== null && (
                <span className="bg-primary text-white text-[9px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full font-mono tabular-nums tracking-wider whitespace-nowrap">
                  {String(timeLeft.days).padStart(2, "0")}d {String(timeLeft.hours).padStart(2, "0")}h {String(timeLeft.minutes).padStart(2, "0")}m
                </span>
              )}
            </div>

            <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-text mb-3 sm:mb-6">
              <span className="text-primary">NEXUS ERP</span>
            </h1>

            <p className="hero-sub text-sm sm:text-lg text-text-secondary max-w-2xl mx-auto mb-6 sm:mb-10">
              El único sistema administrativo ERP Multi-Empresa con IA nativa en Venezuela.
              Prepárate para llevar tu negocio al siguiente nivel con <span className="text-primary">NEXUS ERP</span>.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contacto"
                className="bg-gradient-to-r from-primary to-secondary text-white text-base font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Ingresa a la Pre-Venta
              </a>
              <a
                href="https://www.youtube.com/watch?v=9HaU8NjH7bI"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border text-text-secondary text-base font-semibold px-8 py-3.5 rounded-xl hover:border-primary hover:text-primary transition-all inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Ver Presentación
              </a>
            </div>

            <div className="hero-sub mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-text-secondary/80 text-[10px] sm:text-sm font-medium">
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                IA Nativa
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Multi Empresa
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Multi Moneda
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Multi Sucursales
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Multi Almacenes
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Local + Cloud
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Homologado SENIAT
              </span>
            </div>

            <div className="hero-sub mt-6 sm:mt-10 p-3 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/60 shadow-inner">
              <div className="flex items-start gap-2 sm:gap-3 mb-1 sm:mb-2">
                <svg className="w-5 h-5 sm:w-8 sm:h-8 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M5 3h14v4l-7 5-7-5V3z" />
                  <path d="M5 21h14v-4l-7-5-7 5v4z" />
                  <path d="M5 3h14" />
                  <path d="M5 21h14" />
                </svg>
                <p className="text-amber-800 font-extrabold text-[11px] sm:text-base tracking-tight">
                  PRE-VENTA EXCLUSIVA — Los primeros <span className="text-amber-600 underline decoration-wavy decoration-amber-400">20 registros</span><span className="hidden sm:inline"> obtienen</span> <span className="text-amber-600">3 MESES GRATIS</span>
                </p>
              </div>
              <p className="text-amber-700/80 text-[10px] sm:text-sm font-medium ml-7 sm:ml-9">
                Sin compromiso, cancela cuando quieras.
              </p>
            </div>
          </div>
        </div>

        {/* Imagen Derecha (Edificio) */}
        <div className="hero-img-right hidden lg:block relative w-full h-full z-30 group">
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src="/edificio.png"
              alt="Edificio"
              width={800}
              height={1000}
              unoptimized
              priority
              className="absolute -left-4 lg:-left-16 xl:-left-24 top-1/2 -translate-y-1/2 h-[400px] lg:h-[500px] xl:h-[600px] w-auto max-w-none object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:-translate-y-[calc(50%+20px)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
