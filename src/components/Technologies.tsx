"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techs = [
  { name: "React", desc: "Frontend moderno y reactivo" },
  { name: "Node.js", desc: "Backend escalable y eficiente" },
  { name: "Python", desc: "IA y machine learning" },
  { name: "PostgreSQL", desc: "Base de datos robusta" },
  { name: "Docker", desc: "Contenedores y despliegue" },
  { name: "AWS", desc: "Infraestructura en la nube" },
  { name: "TensorFlow", desc: "Modelos de IA avanzados" },
  { name: "Redis", desc: "Caché y tiempo real" },
];

const cardHover = {
  y: -8,
  boxShadow: "0 12px 45px -8px rgba(62, 181, 172, 0.3)",
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

export default function Technologies() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tech-title", { scrollTrigger: { trigger: ".tech-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from(".tech-item", { scrollTrigger: { trigger: ".tech-item", start: "top 85%" }, opacity: 0, y: 20, duration: 0.4, stagger: 0.06, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tecnologias" ref={ref} className="relative py-20 sm:py-28 bg-gradient-to-b from-primary/[0.05] via-primary/[0.02] to-surface" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-secondary/[0.05] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Tecnologías</span>
          <h2 className="tech-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Potenciado por tecnología de punta
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Utilizamos las mejores herramientas y frameworks para construir un producto robusto, escalable y seguro.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {techs.map((t) => (
            <motion.div key={t.name} className="tech-item bg-secondary rounded-xl p-5 text-center shadow-sm" whileHover={cardHover}>
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-sm">{t.name[0]}</span>
              </div>
              <h3 className="font-bold text-white text-sm">{t.name}</h3>
              <p className="text-white/70 text-xs mt-1">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
