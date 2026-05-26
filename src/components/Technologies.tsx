"use client";

import { useEffect, useRef } from "react";
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
    <section id="tecnologias" ref={ref} className="relative py-20 sm:py-28 bg-surface" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div key={t.name} className="tech-item bg-white rounded-xl p-5 text-center shadow-sm border border-border/50 hover:border-primary/20 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-sm">{t.name[0]}</span>
              </div>
              <h3 className="font-bold text-text text-sm">{t.name}</h3>
              <p className="text-text-secondary text-xs mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
