"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", { scrollTrigger: { trigger: ".contact-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from(".contact-form", { scrollTrigger: { trigger: ".contact-form", start: "top 85%" }, opacity: 0, y: 30, duration: 0.6, ease: "power2.out" });
      gsap.from(".contact-info", { scrollTrigger: { trigger: ".contact-info", start: "top 85%" }, opacity: 0, y: 30, duration: 0.6, delay: 0.2, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contacto" ref={ref} className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-surface" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm tracking-widest uppercase">Contacto</span>
          <h2 className="contact-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            Solicita una demostración
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Descubre cómo NEXUS ERP puede transformar tu empresa. Agenda una demo personalizada sin compromiso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="contact-form bg-white rounded-2xl p-8 shadow-sm border border-border/50">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Nombre</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">Empresa</label>
                <input type="text" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Tu empresa" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-1.5">Correo Electrónico</label>
              <input type="email" required className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="correo@empresa.com" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-1.5">Teléfono</label>
              <input type="tel" className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+58 412 000 0000" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-text mb-1.5">Mensaje</label>
              <textarea rows={3} required className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="Cuéntanos sobre tu proyecto..." />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              {sent ? "✓ Mensaje enviado" : "Solicitar Demo"}
            </button>
          </form>

          <div className="contact-info flex flex-col justify-center gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Email</p>
                <p className="text-text-secondary text-sm">contacto@nexustechnology.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Ubicación</p>
                <p className="text-text-secondary text-sm">Caracas, Venezuela</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Horario</p>
                <p className="text-text-secondary text-sm">Lun - Vie: 8:00 AM - 5:00 PM</p>
              </div>
            </div>

            <div className="mt-4 p-5 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-sm font-semibold text-primary mb-1">Demo sin compromiso</p>
              <p className="text-xs text-text-secondary">
                Agenda una llamada de 30 minutos donde te mostraremos cómo NEXUS ERP
                puede adaptarse a las necesidades específicas de tu empresa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
