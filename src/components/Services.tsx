"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Desarrollo de Software",
    desc: "Diseño de aplicaciones a la medida, integración de sistemas y fábrica de software.",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
  },
  {
    title: "Desarrollo de APP Móviles",
    desc: "Creación de aplicaciones móviles nativas e híbridas para iOS y Android con experiencias de usuario intuitivas y alto rendimiento.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "Infraestructura y Negocio",
    desc: "Soluciones de negocio (ERP, CRM, BI), migración a la nube y mesas de ayuda (Service Desk).",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
  {
    title: "Seguridad",
    desc: "Servicios de ciberseguridad, planes de continuidad (DRP) e instalación de sistemas de seguridad electrónica y videovigilancia.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    title: "Asesoría y Acompañamiento Tecnológico",
    desc: "Soporte técnico especializado, consultoría en transformación digital y acompañamiento continuo para garantizar la adopción exitosa de tecnología en tu empresa.",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    title: "Consultoría SGI",
    desc: "Diseño, digitalización y auditoría de sistemas de gestión normativos.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

const cardHover = {
  y: -8,
  boxShadow: "0 12px 45px -8px rgba(62, 181, 172, 0.3)",
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

const iconHover = {
  scale: 1.15,
  transition: { type: "spring" as const, stiffness: 300, damping: 15 },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-title", { scrollTrigger: { trigger: ".services-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from(".service-card", { scrollTrigger: { trigger: ".service-card", start: "top 85%" }, opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="servicios" ref={ref} className="relative py-20 sm:py-28 bg-gradient-to-b from-surface via-primary/[0.02] to-surface" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-72 h-72 rounded-full bg-accent/[0.03] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-2xl sm:text-3xl tracking-widest uppercase">Servicios</span>
          <h2 className="services-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Todo lo que tu empresa necesita
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Un ecosistema completo de soluciones tecnologicas potenciadas con nuestra inteligencia artificial NEX-IA.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div key={s.title} className="service-card bg-gradient-to-br from-[#1D3D8E] to-secondary rounded-2xl p-8 shadow-sm relative overflow-hidden group" whileHover={cardHover}>
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4" whileHover={iconHover}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
                </motion.div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
