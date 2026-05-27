"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "+584121234567";
const WHATSAPP_MSG = encodeURIComponent("Hola! Quiero más información sobre sus servicios tecnológicos.");

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", { scrollTrigger: { trigger: ".contact-title", start: "top 80%" }, opacity: 0, y: 30, duration: 0.8 });
      gsap.from(".contact-cta", { scrollTrigger: { trigger: ".contact-cta", start: "top 85%" }, opacity: 0, y: 30, duration: 0.6, ease: "power2.out" });
      gsap.from(".contact-info", { scrollTrigger: { trigger: ".contact-info", start: "top 85%" }, opacity: 0, y: 30, duration: 0.6, delay: 0.2, ease: "power2.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacto" ref={ref} className="relative py-20 sm:py-28 bg-gradient-to-b from-primary/[0.05] via-primary/[0.02] to-surface" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-secondary/[0.04] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-2xl sm:text-3xl tracking-widest uppercase">Contacto</span>
          <h2 className="contact-title text-3xl sm:text-4xl font-bold text-text mt-3 mb-4">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Un solo clic y empezamos a trabajar en tu proyecto. Respuesta inmediata.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <div className="contact-cta lg:col-span-3">
            <div className="bg-primary rounded-2xl p-8 sm:p-10 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <p className="text-white text-xl font-bold mb-3">Respuesta en minutos, no en días</p>
              <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
                Escríbenos directamente por WhatsApp y te atenderemos al instante. Sin formularios, sin esperas.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-[#22c35e] transition-all shadow-lg shadow-black/20 animate-pulse-whatsapp hover:animate-none"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escríbenos a WhatsApp
              </a>
              <p className="text-white/50 text-xs text-center mt-4">Disponibles de Lunes a Sábados en horario extendido, respondemos en minutos.</p>
            </div>
          </div>

          <div className="contact-info lg:col-span-2 flex flex-col justify-center gap-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Email</p>
                <p className="text-text-secondary text-sm">contacto@nexusgcorp.com</p>
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
                <p className="text-text-secondary text-sm">Lun - Vie: 8:00 AM - 5:00 PM / Sab: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-text text-sm">Teléfono</p>
                <p className="text-text-secondary text-sm">+58 412 123 4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
