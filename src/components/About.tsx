"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  { title: "Integridad y Confidencialidad", desc: "Al gestionar la ciberseguridad, los datos y el control de acceso físico de nuestros clientes, actuamos bajo los más estrictos principios éticos. La información de nuestros clientes es invulnerable y protegida. " },
  { title: "Compromiso", desc: "Nos dedicamos al éxito de nuestros clientes con soporte y acompañamiento constante." },
  { title: "Excelencia", desc: "Cada línea de código está pensada para ofrecer la mejor experiencia y rendimiento." },
  { title: "Visión Local", desc: "Entendemos el mercado venezolano y creamos soluciones que se adaptan a su realidad." },
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

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-title", { opacity: 0, y: 30 }, { scrollTrigger: { trigger: ref.current, start: "top 80%" }, opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
      gsap.fromTo(".about-card", { opacity: 0, y: 30 }, { scrollTrigger: { trigger: ref.current, start: "top 75%" }, opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" });
      gsap.fromTo(".value-card", { opacity: 0, y: 20 }, { scrollTrigger: { trigger: ".values-grid", start: "top 85%" }, opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="nosotros" ref={ref} className="relative py-20 sm:py-28 bg-gradient-to-b from-primary/[0.04] via-surface to-surface" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-secondary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/[0.04] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
          <motion.div
            className="about-card bg-gradient-to-br from-[#1D3D8E] to-secondary rounded-2xl p-8 shadow-sm relative overflow-hidden group"
            whileHover={cardHover}
          >
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <motion.div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5" whileHover={iconHover}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2">Objetivo</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Consolidar a Nexus Technology como el proveedor integral de referencia en soluciones tecnológicas y de seguridad, logrando la certificación y el mantenimiento de un Sistema de Gestión Integrado bajo las normas ISO 9001 e ISO 27001, para garantizar la máxima confiabilidad en el desarrollo de software, la adaptabilidad en la infraestructura y ciberseguridad, y la eficacia operativa en la instalación de sistemas de seguridad integral, asegurando la continuidad del negocio de nuestros clientes y la sostenibilidad financiera de la organización.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-card bg-gradient-to-br from-[#1D3D8E] to-secondary rounded-2xl p-8 shadow-sm relative overflow-hidden group"
            whileHover={cardHover}
          >
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <motion.div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5" whileHover={iconHover}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2">Misión</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Nexus Technology impulsa la transformación, continuidad y seguridad de nuestros clientes mediante la entrega de soluciones integrales de base tecnológica, desarrollo de software y sistemas de seguridad física y digital. 
                Nos comprometemos a diseñar e implementar procesos eficientes y seguros, garantizando la adaptabilidad operativa y el crecimiento sostenible de sus negocios.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="about-card bg-gradient-to-br from-[#1D3D8E] to-secondary rounded-2xl p-8 shadow-sm relative overflow-hidden group"
            whileHover={cardHover}
          >
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <motion.div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5" whileHover={iconHover}>
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
              </motion.div>
              <h3 className="text-lg font-bold text-white mb-2">Visión</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                En Nexus Technology queremos ser reconocidos como el aliado estratégico líder en la integración de tecnología, sistemas de seguridad integral, ciberseguridad y sistemas de gestión. 
                Nos proyectamos como una organización modelo en excelencia operativa, capaz de anticipar las demandas del mercado tecnológico y de proteger el entorno físico y digital de las empresas con los más altos estándares de calidad y seguridad.
              </p>
            </div>
          </motion.div>
        </div>

        <div>
          <h3 className="text-center text-lg font-bold text-text mb-8">Nuestros Valores</h3>
          <div className="values-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <motion.div
                key={v.title}
                className="value-card bg-secondary/10 rounded-xl p-6 shadow-sm border border-secondary/20 text-center"
                whileHover={{ y: -6, boxShadow: "0 8px 30px -6px rgba(62, 181, 172, 0.2)", borderColor: "rgba(62, 181, 172, 0.4)", transition: { type: "spring" as const, stiffness: 300, damping: 20 } }}
              >
                <h4 className="font-bold text-secondary mb-2">{v.title}</h4>
                <p className="text-text-secondary text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
