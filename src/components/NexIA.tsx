"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const WHATSAPP_VENTAS = "https://wa.me/584121234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20NEXUS%20ERP";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const saludos = ["hola", "buenas", "buen día", "buen dia", "buenas tardes", "buenos días", "buenos dias", "qué tal", "que tal", "hey", "saludos"];

function detectarIntencion(texto: string): "saludo" | "precio" | "funciones" | "demo" | "soporte" | "contacto" | "despedida" | "default" {
  const t = texto.toLowerCase().trim();

  if (saludos.some((s) => t.includes(s) || t === s)) return "saludo";
  if (["chao", "adiós", "adios", "gracias", "bye", "nos vemos"].some((s) => t.includes(s))) return "despedida";
  if (["precio", "precios", "costo", "costos", "planes", "plan", "cuánto", "cuanto", "pago", "mensualidad", "inversión", "inversion", "valor", "presupuesto", "cotización", "cotizacion", "promoción", "promocion", "oferta"].some((s) => t.includes(s))) return "precio";
  if (["demo", "prueba", "probar", "test", "gratis", "ensayo", "versión gratis", "version gratis", "free"].some((s) => t.includes(s))) return "demo";
  if (["función", "funcion", "funciones", "características", "caracteristicas", "módulos", "modulos", "facturación", "facturacion", "contabilidad", "inventario", "reportes", "nómina", "nomina", "qué hace", "que hace", "para qué sirve", "para que sirve", "beneficios", "ventajas"].some((s) => t.includes(s))) return "funciones";
  if (["soporte", "ayuda", "problema", "error", "falla", "no funciona", "bug", "asistencia", "técnico", "tecnico"].some((s) => t.includes(s))) return "soporte";
  if (["contacto", "teléfono", "telefono", "número", "numero", "whatsapp", "ubicación", "ubicacion", "dirección", "direccion", "correo", "email", "hablar", "asesor", "representante"].some((s) => t.includes(s))) return "contacto";

  return "default";
}

function respuestaBot(intencion: string): string {
  switch (intencion) {
    case "saludo":
      return "¡Hola! 👋 Soy **NEX-IA**, el asistente inteligente de NEXUS TECHNOLOGY. ¿En qué puedo ayudarte hoy?\n\nPuedes preguntarme sobre:\n• Precios y planes 💰\n• Funcionalidades del ERP ⚙️\n• Solicitar una demo 🎯\n• Contactar a un asesor 📞";
    case "precio":
      return "";
    case "demo":
      return "";
    case "funciones":
      return "**NEXUS ERP** es un sistema administrativo multi-empresa con IA nativa. Estas son sus principales funcionalidades:\n\n📊 **Contabilidad** – Libros contables automatizados\n🧾 **Facturación Electrónica** – Cumplimiento legal VE\n📦 **Inventario** – Control de stock y almacenes\n👥 **Nómina** – Gestión de empleados y pagos\n📈 **Reportes** – Dashboards inteligentes con IA\n🔗 **Multi-empresa** – Todas tus empresas desde un solo lugar\n\n¿Te gustaría conocer los precios o agendar una demo?";
    case "soporte":
      return "";
    case "contacto":
      return "";
    case "despedida":
      return "¡Gracias por contactarnos! Si en cualquier momento necesitas ayuda, aquí estaré. 😊\n\nTambién puedes escribirnos directamente por WhatsApp para atención personalizada.";
    default:
      return "";
  }
}

function necesitaWhatsApp(intencion: string): boolean {
  return ["precio", "demo", "soporte", "contacto", "default"].includes(intencion);
}

function mensajeWhatsApp(intencion: string): string {
  switch (intencion) {
    case "precio":
      return "¡Claro! Te paso con un asesor comercial para darte toda la información de precios y planes 💰";
    case "demo":
      return "¡Excelente decisión! Te conectaré con nuestro equipo para agendar una demo personalizada 🎯";
    case "soporte":
      return "Necesitas ayuda técnica? Te transfiero al equipo de soporte especializado 🛠️";
    case "contacto":
      return "Claro, te pongo en contacto con un asesor de inmediato 📞";
    default:
      return "No tengo una respuesta exacta para eso, pero un asesor humano podrá ayudarte mejor. Te redirijo a WhatsApp 👇";
  }
}

export default function NexIA() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "¡Hola! Soy **NEX-IA** 🤖\n\nTu asistente virtual de **NEXUS TECHNOLOGY**.\n¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [esperando, setEsperando] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollDown = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) setTimeout(scrollDown, 100);
  }, [open, messages, scrollDown]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const enviarMensaje = useCallback((texto: string) => {
    if (!texto.trim()) return;

    const msgUser: ChatMessage = { role: "user", text: texto.trim() };
    setMessages((prev) => [...prev, msgUser]);
    setInput("");
    setEsperando(true);

    setTimeout(() => {
      const intencion = detectarIntencion(texto);
      const respuesta = respuestaBot(intencion);

      if (respuesta) {
        const msgBot: ChatMessage = { role: "bot", text: respuesta };
        setMessages((prev) => [...prev, msgBot]);
        setEsperando(false);

        if (intencion === "despedida") {
          setTimeout(() => {
            setMessages((prev) => [...prev, { role: "bot", text: `🔗 *Enlace directo:* [Hablar con un asesor](${WHATSAPP_VENTAS})` }]);
          }, 1200);
        }
      }

      if (necesitaWhatsApp(intencion)) {
        setTimeout(() => {
          const m = mensajeWhatsApp(intencion);
          setMessages((prev) => [...prev, { role: "bot", text: m }]);
          setEsperando(false);

          setTimeout(() => {
            setMessages((prev) => [...prev, { role: "bot", text: `🔗 *Redirigiéndote a WhatsApp...* [Hablar con un asesor](${WHATSAPP_VENTAS})` }]);
          }, 1800);
        }, respuesta ? 1200 : 0);
      }
    }, 600);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    enviarMensaje(input);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[180] w-16 h-16 rounded-full bg-gradient-to-br from-[#3EB5AC] to-[#3C6FB5] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          aria-label="Abrir NEX-IA"
        >
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 10 10c0 3.5-2.3 6.5-5.5 7.6V22l-4-2.3A10.2 10.2 0 0 1 12 20a10 10 0 0 1 0-20z" />
            <path d="M8 9h8" /><path d="M8 13h6" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-[180] w-[360px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-[#3C6FB5] to-[#3EB5AC] text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">N</div>
              <div>
                <p className="font-semibold text-sm leading-tight">NEX-IA</p>
                <p className="text-[11px] text-white/70">Asistente Virtual</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ scrollBehavior: "smooth" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#3C6FB5] to-[#3EB5AC] text-white rounded-br-md"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener" class="text-[#3EB5AC] underline font-medium hover:text-[#3C6FB5] transition-colors">$1</a>'),
                  }}
                />
              </div>
            ))}
            {esperando && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-[#3EB5AC] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#3EB5AC] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#3EB5AC] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex gap-2 bg-white shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#3EB5AC]/50 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3C6FB5] to-[#3EB5AC] text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
