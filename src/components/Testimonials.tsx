"use client";

import { useEffect, useRef, type JSX } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Laura Castillo",
    role: "CEO, Soluciones NovaTech",
    stars: 5,
    text: "El soporte técnico que recibimos es de primer nivel. Respuestas rápidas, soluciones efectivas y un equipo que realmente entiende de tecnología.",
  },
  {
    name: "Andrés Gil",
    role: "Directora Financiera, Grupo Horizonte",
    stars: 4.5,
    text: "La asesoría tecnológica nos ayudó a redefinir nuestra infraestructura digital. Ahora operamos con herramientas modernas y procesos optimizados.",
  },
  {
    name: "Valentina Rojas",
    role: "Gerente de Operaciones, Redes Conecta",
    stars: 4,
    text: "Implementamos la red de telecomunicaciones para 15 sucursales. La instalación fue rápida y el soporte técnico excepcional.",
  },
  {
    name: "Santiago Rivas",
    role: "CFO, Corporación Andina",
    stars: 5,
    text: "El sistema de videovigilancia con IA nos dio total tranquilidad. Las cámaras y el software de monitoreo superaron lo esperado.",
  },
  {
    name: "Camila Paredes",
    role: "CEO, NexumTech",
    stars: 4.5,
    text: "Diseñaron nuestra app mobile desde cero. El equipo entendió nuestra visión y entregaron una plataforma increíblemente fluida.",
  },
];

const cardHover = {
  y: -8,
  boxShadow: "0 12px 45px -8px rgba(62, 181, 172, 0.3)",
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

const CARD_W = 360;
const GAP = 24;
const STEP = CARD_W + GAP;

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(-STEP * testimonials.length);
  const speedRef = useRef(0.5);
  const rafRef = useRef(0);
  const lock = useRef(false);

  const total = testimonials.length;
  const duplicated = [...testimonials, ...testimonials, ...testimonials];
  const totalWidth = STEP * total;

  useEffect(() => {
    const track = trackRef.current;
    const carousel = carouselRef.current;
    if (!track || !carousel) return;

    const onEnter = () => { speedRef.current = 0.08; };
    const onLeave = () => { speedRef.current = 0.5; };
    carousel.addEventListener("mouseenter", onEnter);
    carousel.addEventListener("mouseleave", onLeave);

    const animate = () => {
      xRef.current -= speedRef.current;
      if (xRef.current <= -totalWidth * 2) xRef.current = -totalWidth;
      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      carousel.removeEventListener("mouseenter", onEnter);
      carousel.removeEventListener("mouseleave", onLeave);
    };
  }, [total, totalWidth]);

  const goPrev = () => {
    if (lock.current) return;
    lock.current = true;
    xRef.current = Math.min(xRef.current + STEP, -STEP);
    setTimeout(() => { lock.current = false; }, 300);
  };

  const goNext = () => {
    if (lock.current) return;
    lock.current = true;
    if (xRef.current <= -totalWidth * 1.5) {
      xRef.current = -totalWidth;
    }
    xRef.current -= STEP;
    setTimeout(() => { lock.current = false; }, 300);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".test-title", { scrollTrigger: { trigger: ".test-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from(".test-carousel", { scrollTrigger: { trigger: ".test-carousel", start: "top 85%" }, opacity: 0, y: 20, duration: 0.4, ease: "power2.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonios" ref={sectionRef} className="relative py-20 sm:py-28 bg-gradient-to-b from-surface via-accent/[0.02] to-surface" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-secondary/[0.03] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative">
        <div className="text-center">
          <span className="text-primary font-semibold text-2xl sm:text-3xl tracking-widest uppercase">Testimonios</span>
          <h2 className="test-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Empresas venezolanas confían en NEXUS Technology para impulsar su crecimiento.
          </p>
        </div>
      </div>

      <div ref={carouselRef} className="test-carousel relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={goPrev}
          className="absolute -left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="overflow-hidden mx-8 md:mx-14">
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{ willChange: "transform" }}
          >
            {duplicated.map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                className="flex-shrink-0 w-[85vw] max-w-[360px] bg-gradient-to-br from-[#1D3D8E] to-secondary rounded-xl p-6 shadow-sm relative overflow-hidden group"
                whileHover={cardHover}
              >
                <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => {
                      if (s <= t.stars) {
                        return (
                          <svg key={s} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        );
                      }
                      if (s - 0.5 === t.stars) {
                        return (
                          <div key={s} className="relative w-4 h-4">
                            <svg className="absolute inset-0 w-4 h-4 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <div className="absolute inset-0 overflow-hidden w-1/2">
                              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <svg key={s} className="w-4 h-4 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      );
                    })}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-white/60 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button
          onClick={goNext}
          className="absolute -right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}