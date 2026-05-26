"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Carlos Méndez",
    role: "CEO, Grupo Empresarial Méndez",
    text: "NEXUS ERP transformó por completo nuestra gestión administrativa. La IA nos ayuda a prever problemas antes de que ocurran.",
  },
  {
    name: "María Fernanda López",
    role: "Directora Financiera, CorpBanca",
    text: "La consolidación multi empresa nos ahorró horas de trabajo manual. La facturación electrónica integrada es un game changer.",
  },
  {
    name: "José Gregorio Rivas",
    role: "Gerente de Operaciones, Distribuidora Rivas",
    text: "Implementamos NEXUS ERP en 3 empresas simultáneamente. El soporte y la migración de datos fueron impecables.",
  },
  {
    name: "Ana Carolina Silva",
    role: "CFO, Importadora Silva C.A.",
    text: "Los reportes financieros con IA nos dan una claridad que nunca habíamos tenido. Recomendado al 100%.",
  },
  {
    name: "Pedro Luis Castillo",
    role: "CEO, TechSolutions VE",
    text: "Como empresa de tecnología, somos exigentes. NEXUS ERP superó nuestras expectativas en todos los niveles.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-title", { scrollTrigger: { trigger: ".test-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8 });
    }, ref);

    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    const totalWidth = cards.reduce((sum, c) => sum + c.offsetWidth + 24, 0);
    const cloneWidth = totalWidth / 2;

    cards.forEach((c) => {
      const clone = c.cloneNode(true) as HTMLElement;
      track.appendChild(clone);
    });

    let x = 0;
    const speed = 0.3;

    const animate = () => {
      x -= speed;
      if (x <= -cloneWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(animate);
    };

    track.style.width = `${totalWidth}px`;
    let raf = requestAnimationFrame(animate);

    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="testimonios" ref={ref} className="relative py-20 sm:py-28 overflow-hidden" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Testimonios</span>
          <h2 className="test-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Empresas venezolanas confían en NEXUS ERP para impulsar su crecimiento.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-6" style={{ willChange: "transform" }}>
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex-shrink-0 w-[300px] sm:w-[380px] bg-white rounded-2xl p-6 shadow-sm border border-border/50"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-bold text-text text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
