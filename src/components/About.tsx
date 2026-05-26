"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Innovación", desc: "Desarrollamos tecnología de punta para resolver problemas reales del tejido empresarial venezolano." },
  { title: "Compromiso", desc: "Nos dedicamos al éxito de nuestros clientes con soporte y acompañamiento constante." },
  { title: "Excelencia", desc: "Cada línea de código está pensada para ofrecer la mejor experiencia y rendimiento." },
  { title: "Visión Local", desc: "Entendemos el mercado venezolano y creamos soluciones que se adaptan a su realidad." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", { scrollTrigger: { trigger: ".about-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8, ease: "power2.out" });
      gsap.from(".about-card", { scrollTrigger: { trigger: ".about-card", start: "top 85%" }, opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: "power2.out" });
      gsap.from(".value-card", { scrollTrigger: { trigger: ".values-grid", start: "top 85%" }, opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="nosotros" ref={ref} className="relative py-20 sm:py-28 bg-surface" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Nosotros</span>
          <h2 className="about-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Transformando la gestión empresarial en Venezuela
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            En Nexus Technology creemos que la tecnología debe estar al servicio de las personas.
            Por eso creamos el primer ERP con inteligencia artificial nativa diseñado para el mercado venezolano.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="about-card bg-white rounded-2xl p-8 shadow-sm border border-border/50">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Objetivo</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Democratizar el acceso a herramientas de gestión empresarial avanzadas, impulsadas por inteligencia artificial,
              para que empresas de todos los tamaños en Venezuela puedan competir y crecer en la era digital.
            </p>
          </div>

          <div className="about-card bg-white rounded-2xl p-8 shadow-sm border border-border/50">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Misión</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Proveer soluciones tecnológicas inteligentes que optimicen la gestión administrativa de las empresas,
              automatizando procesos y generando insights accionables a través de inteligencia artificial.
            </p>
          </div>

          <div className="about-card bg-white rounded-2xl p-8 shadow-sm border border-border/50">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-text mb-2">Visión</h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Ser la plataforma de gestión empresarial líder en Venezuela y referente en Latinoamérica
              por nuestra innovación en inteligencia artificial aplicada a la administración de negocios.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-center text-lg font-bold text-text mb-8">Nuestros Valores</h3>
          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="value-card bg-white rounded-xl p-6 shadow-sm border border-border/50 text-center">
                <h4 className="font-bold text-primary mb-2">{v.title}</h4>
                <p className="text-text-secondary text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
