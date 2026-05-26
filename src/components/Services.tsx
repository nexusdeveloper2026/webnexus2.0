"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Gestión Contable",
    desc: "Automatiza tu contabilidad con registros inteligentes, balances en tiempo real y reportes financieros automáticos.",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    title: "IA Predictiva",
    desc: "Anticipa tendencias, detecta anomalías y toma decisiones informadas con modelos de IA entrenados para tu negocio.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "Facturación Electrónica",
    desc: "Emite facturas electrónicas compliant con SENIAT, controla tu inventario y sincroniza con tu contabilidad al instante.",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Multi Empresa",
    desc: "Administra múltiples empresas desde un solo panel. Consolidación de estados financieros y reportes globales.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "CRM Inteligente",
    desc: "Gestiona tus clientes, automatiza seguimientos y descubre oportunidades de venta con análisis predictivo de IA.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    title: "Soporte & Consultoría",
    desc: "Acompañamiento dedicado con expertos en implementación, migración de datos y capacitación de tu equipo.",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

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
    <section id="servicios" ref={ref} className="relative py-20 sm:py-28" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Servicios</span>
          <h2 className="services-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Todo lo que tu empresa necesita
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Un ecosistema completo de soluciones administrativas potenciadas con inteligencia artificial.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="service-card bg-white rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} /></svg>
              </div>
              <h3 className="font-bold text-text mb-2">{s.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
