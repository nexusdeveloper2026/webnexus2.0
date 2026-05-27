"use client";

import { useState, useRef, useEffect, useCallback, type JSX } from "react";

const WHATSAPP_VENTAS = "https://wa.me/584121234567?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20NEXUS%20ERP";
const WHATSAPP_SOPORTE = "https://wa.me/584176543210?text=Hola!%20Necesito%20soporte%20t%C3%A9cnico.";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  quickReplies?: { label: string; action: string }[];
}

const KB = {
  empresa: {
    nombre: "NEXUS TECHNOLOGY",
    fundacion: 2026,
    lema: "Transformando la gestión empresarial en Venezuela",
    enfoque: "Calidad y Seguridad desde el Diseño",
    certificaciones: ["ISO 9001", "ISO 27001"],
    objetivo: "Consolidarnos como el proveedor integral de referencia en soluciones tecnológicas y de seguridad",
    mision: "Impulsar la transformación, continuidad y seguridad de nuestros clientes mediante soluciones integrales de base tecnológica, desarrollo de software y sistemas de seguridad física y digital",
    vision: "Ser reconocidos como el aliado estratégico líder en la integración de tecnología, sistemas de seguridad integral, ciberseguridad y sistemas de gestión",
    valores: [
      "Integridad y Confidencialidad",
      "Enfoque Basado en Procesos y Calidad",
      "Adaptabilidad e Innovación",
      "Compromiso con la Excelencia",
      "Trabajo en equipo",
    ],
  },
  erp: {
    nombre: "NEXUS ERP",
    descripcion: "Único sistema administrativo ERP Multi-Empresa con IA nativa en Venezuela",
    features: [
      "IA Nativa",
      "Multi Empresa",
      "Multi Moneda",
      "Multi Sucursales",
      "Multi Almacenes",
      "Servidor local + Cloud",
      "Homologado ante el SENIAT",
    ],
    modulos: [
      { nombre: "Contabilidad", desc: "Libros contables automatizados" },
      { nombre: "Facturación Electrónica", desc: "Cumplimiento legal VE" },
      { nombre: "Inventario", desc: "Control de stock y almacenes" },
      { nombre: "Nómina", desc: "Gestión de empleados y pagos" },
      { nombre: "Reportes", desc: "Dashboards inteligentes con IA" },
      { nombre: "Multi-empresa", desc: "Todas tus empresas desde un solo lugar" },
    ],
    preventa: "PRE-VENTA EXCLUSIVA — Los primeros 20 registros obtienen 3 MESES GRATIS sin límites. Sin compromiso, cancela cuando quieras.",
  },
  servicios: [
    { nombre: "Desarrollo de Software", desc: "Diseño de aplicaciones a la medida, integración de sistemas y fábrica de software" },
    { nombre: "Desarrollo de APP Móviles", desc: "Creación de aplicaciones móviles nativas e híbridas para iOS y Android" },
    { nombre: "Infraestructura y Negocio", desc: "Soluciones ERP, CRM, BI, migración a la nube y mesas de ayuda" },
    { nombre: "Seguridad", desc: "Ciberseguridad, planes de continuidad (DRP), sistemas de seguridad electrónica y videovigilancia" },
    { nombre: "Asesoría y Acompañamiento Tecnológico", desc: "Soporte técnico especializado, consultoría en transformación digital" },
    { nombre: "Consultoría SGI", desc: "Diseño, digitalización y auditoría de sistemas de gestión normativos ISO 9001 e ISO 27001" },
  ],
  tecnologias: [
    "React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS",
    "TensorFlow", "GitLab", "Apache Kafka", "Linux", "Windows Server",
    "Flutter", "IncusOS", "SCRUM", "Postman",
  ],
  contacto: {
    email: "contacto@nexusgcorp.com",
    telefono: "+58 412 123 4567",
    ubicacion: "Caracas, Venezuela",
    horario: "Lun - Vie: 8:00 AM - 5:00 PM / Sáb: 9:00 AM - 2:00 PM",
    whatsapp_ventas: WHATSAPP_VENTAS,
    whatsapp_soporte: WHATSAPP_SOPORTE,
  },
  cobertura: {
    estados: 24,
    ciudades: ["Caracas", "Maracaibo", "Valencia", "Barquisimeto", "Maracay", "Barcelona", "Cumaná", "Maturín", "Ciudad Bolívar", "Mérida", "San Cristóbal", "Barinas", "Coro", "La Asunción"],
    servicios_disponibles: ["NEXUS ERP", "Desarrollo de Software", "Apps Móviles", "Ciberseguridad", "Asesoría SGI", "Seguridad Electrónica", "Infraestructura Cloud", "Soporte Técnico"],
  },
};

type Intencion =
  | "saludo"
  | "despedida"
  | "empresa"
  | "erp"
  | "funciones"
  | "precio"
  | "demo"
  | "servicios"
  | "software"
  | "appmovil"
  | "infraestructura"
  | "seguridad"
  | "consultoria"
  | "soporte"
  | "tecnologias"
  | "cobertura"
  | "contacto"
  | "valores"
  | "certificaciones"
  | "preventa"
  | "default";

function detectarIntencion(texto: string): Intencion {
  const t = texto.toLowerCase().trim();
  const saludos = ["hola", "buenas", "buen día", "buen dia", "buenas tardes", "buenos días", "buenos dias", "qué tal", "que tal", "hey", "saludos", "buenas noches"];
  if (saludos.some((s) => t.includes(s))) return "saludo";
  if (["chao", "adiós", "adios", "gracias", "bye", "nos vemos", "hasta luego"].some((s) => t.includes(s))) return "despedida";
  if (["quién eres", "quien eres", "qué es nexus", "que es nexus", "cuéntame", "cuentame", "empresa", "nosotros", "about", "quienes"].some((s) => t.includes(s))) return "empresa";
  if (["valores", "valor"].some((s) => t.includes(s)) && !t.includes("precio") && !t.includes("costo")) return "valores";
  if (["iso", "certificación", "certificacion", "9001", "27001", "calidad"].some((s) => t.includes(s))) return "certificaciones";
  if (["nexus erp", "qué es erp", "que es erp", "erp", "sistema administrativo"].some((s) => t.includes(s))) return "erp";
  if (["pre venta", "preventa", "3 meses", "tres meses", "gratis", "20 registros", "exclusiva", "lanzamiento"].some((s) => t.includes(s))) return "preventa";
  if (["función", "funcion", "funciones", "módulos", "modulos", "características", "caracteristicas", "qué hace", "que hace", "para qué sirve", "para que sirve"].some((s) => t.includes(s)) && !t.includes("servicio")) return "funciones";
  if (["contabilidad", "facturación", "facturacion", "inventario", "nómina", "nomina", "reportes", "multi empresa", "multi-empresa"].some((s) => t.includes(s))) return "funciones";
  if (["precio", "precios", "costo", "costos", "planes", "plan", "cuánto", "cuanto", "pago", "mensualidad", "inversión", "inversion", "valor", "presupuesto", "cotización", "cotizacion", "promoción", "promocion", "oferta", "tarifa", "cuota"].some((s) => t.includes(s))) return "precio";
  if (["demo", "prueba", "probar", "test", "ensayo", "versión gratis", "version gratis"].some((s) => t.includes(s))) return "demo";
  if (["servicio", "servicios", "qué ofrecen", "que ofrecen", "portafolio", "soluciones"].some((s) => t.includes(s))) return "servicios";
  if (["desarrollo de software", "software a la medida", "aplicaciones a la medida", "fábrica de software", "fabrica de software"].some((s) => t.includes(s))) return "software";
  if (["app", "apps", "móvil", "movil", "móviles", "moviles", "ios", "android", "aplicación móvil", "aplicacion movil", "aplicaciones móviles"].some((s) => t.includes(s))) return "appmovil";
  if (["infraestructura", "nube", "cloud", "crm", "bi", "migración", "migracion", "service desk", "servidor"].some((s) => t.includes(s))) return "infraestructura";
  if (["seguridad", "ciberseguridad", "videovigilancia", "drp", "seguridad electrónica", "seguridad electronica", "cámaras", "camaras"].some((s) => t.includes(s))) return "seguridad";
  if (["consultoría", "consultoria", "sgi", "gestión normativos", "gestion normativos", "auditoría", "auditoria"].some((s) => t.includes(s))) return "consultoria";
  if (["soporte", "ayuda", "problema", "error", "falla", "no funciona", "bug", "asistencia", "técnico", "tecnico", "avería", "averia"].some((s) => t.includes(s))) return "soporte";
  if (["tecnología", "tecnologias", "tecnología", "tecnologías", "stack", "herramientas", "lenguaje", "framework"].some((s) => t.includes(s))) return "tecnologias";
  if (["cobertura", "ciudades", "estados", "presencia", "nacional", "venezuela", "dónde están", "donde estan", "ubicaciones"].some((s) => t.includes(s))) return "cobertura";
  if (["contacto", "teléfono", "telefono", "número", "numero", "whatsapp", "ubicación", "ubicacion", "dirección", "direccion", "correo", "email", "hablar", "asesor", "representante", "comunicarme"].some((s) => t.includes(s))) return "contacto";
  return "default";
}

function generarRespuesta(intencion: Intencion): { texto: string; quickReplies?: { label: string; action: string }[] } {
  switch (intencion) {
    case "saludo":
      return {
        texto: `¡Hola! 👋 Soy **NEX-IA**, el asistente inteligente de **${KB.empresa.nombre}**. Estoy aquí para ayudarte con todo lo que necesites.\n\nPuedes preguntarme sobre:\n\n🏢 **La empresa** — Quiénes somos, misión, visión\n⚙️ **NEXUS ERP** — Funcionalidades, módulos, pre-venta\n🛠️ **Servicios** — Software, apps, infraestructura, seguridad\n💰 **Precios y planes** — Inversión, promociones\n🎯 **Demo** — Solicitar una demostración\n📡 **Cobertura** — Ciudades donde estamos\n🤝 **Contacto** — WhatsApp, email, teléfono\n\n¿En qué puedo ayudarte?`,
        quickReplies: [
          { label: "🏢 Quiénes son", action: "Cuéntame sobre la empresa" },
          { label: "⚙️ NEXUS ERP", action: "Qué es NEXUS ERP" },
          { label: "💰 Precios", action: "Cuánto cuesta" },
          { label: "🎯 Demo", action: "Quiero una demo" },
        ],
      };
    case "empresa":
      return {
        texto: `**${KB.empresa.nombre}** fue fundada en **${KB.empresa.fundacion}** como una respuesta transformadora a las demandas del mercado corporativo actual.\n\n🎯 **Objetivo:** ${KB.empresa.objetivo}\n\n⭐ **Misión:** ${KB.empresa.mision}\n\n👁️ **Visión:** ${KB.empresa.vision}\n\nDesde el inicio adoptamos el enfoque de **"Calidad y Seguridad desde el Diseño"**, estructurando toda la empresa bajo **ISO 9001** e **ISO 27001**.\n\n¿Quieres saber más sobre nuestros valores, servicios o el ERP?`,
        quickReplies: [
          { label: "⭐ Valores", action: "Cuáles son sus valores" },
          { label: "🛠️ Servicios", action: "Qué servicios ofrecen" },
          { label: "⚙️ NEXUS ERP", action: "Qué es NEXUS ERP" },
          { label: "📞 Contacto", action: "Información de contacto" },
        ],
      };
    case "valores":
      return {
        texto: `**Nuestros Valores Empresariales:**\n\n${KB.empresa.valores.map((v, i) => `${i + 1}. **${v}**`).join("\n")}\n\nEstos principios guían cada decisión y servicio que ofrecemos.`,
        quickReplies: [
          { label: "🏢 La empresa", action: "Cuéntame sobre la empresa" },
          { label: "🛠️ Servicios", action: "Qué servicios ofrecen" },
          { label: "📞 Contacto", action: "Información de contacto" },
        ],
      };
    case "certificaciones":
      return {
        texto: `**${KB.empresa.nombre}** opera bajo los más altos estándares de calidad y seguridad:\n\n✅ **${KB.empresa.certificaciones[0]}** — Sistema de Gestión de Calidad\n✅ **${KB.empresa.certificaciones[1]}** — Sistema de Gestión de Seguridad de la Información\n\nDesde nuestra constitución adoptamos el enfoque de **"Calidad y Seguridad desde el Diseño"**, garantizando que cada proceso nace documentado, estandarizado y protegido.`,
        quickReplies: [
          { label: "🏢 La empresa", action: "Cuéntame sobre la empresa" },
          { label: "🛠️ Servicios", action: "Qué servicios ofrecen" },
          { label: "⚙️ NEXUS ERP", action: "Qué es NEXUS ERP" },
        ],
      };
    case "erp":
      return {
        texto: `**${KB.erp.nombre}** es el ${KB.erp.descripcion}.\n\n**Características principales:**\n${KB.erp.features.map((f) => `• ${f}`).join("\n")}\n\n**Módulos del sistema:**\n${KB.erp.modulos.map((m) => `• **${m.nombre}** — ${m.desc}`).join("\n")}\n\n¿Te gustaría conocer los precios, agendar una demo o saber más sobre la pre-venta exclusiva?`,
        quickReplies: [
          { label: "💰 Precios", action: "Cuánto cuesta NEXUS ERP" },
          { label: "🎯 Demo", action: "Quiero una demo" },
          { label: "🎁 Pre-venta", action: "Qué es la pre-venta" },
        ],
      };
    case "funciones":
      return {
        texto: `**Módulos de ${KB.erp.nombre}:**\n\n${KB.erp.modulos.map((m) => `📌 **${m.nombre}** — ${m.desc}`).join("\n")}\n\n**Características transversales:**\n${KB.erp.features.map((f) => `• ${f}`).join("\n")}\n\nTodo potenciado con **Inteligencia Artificial nativa** para dashboards inteligentes y automatización.`,
        quickReplies: [
          { label: "💰 Precios", action: "Cuánto cuesta" },
          { label: "🎯 Demo", action: "Quiero una demo" },
          { label: "🎁 Pre-venta", action: "Qué es la pre-venta" },
        ],
      };
    case "preventa":
      return {
        texto: `🎁 **${KB.erp.preventa}**\n\nAprovecha esta oportunidad única para ser de los primeros en usar **${KB.erp.nombre}** sin ningún riesgo.`,
        quickReplies: [
          { label: "💰 Precios", action: "Cuánto cuesta" },
          { label: "🎯 Quiero registrarme", action: "Quiero la demo" },
          { label: "📞 Contacto", action: "Información de contacto" },
        ],
      };
    case "precio":
      return {
        texto: `Actualmente estamos en **pre-venta exclusiva** con una oferta imperdible:\n\n🎁 **${KB.erp.preventa}**\n\nPara darte información detallada de precios y planes según las necesidades de tu empresa, un asesor comercial te atenderá personalmente.`,
        quickReplies: [
          { label: "💬 Hablar con asesor", action: "quiero precio" },
          { label: "🎁 Pre-venta", action: "Qué es la pre-venta" },
          { label: "⚙️ Funciones", action: "Funciones del ERP" },
        ],
      };
    case "demo":
      return {
        texto: `¡Excelente decisión! 🎯 Una demostración personalizada te permitirá ver **${KB.erp.nombre}** en acción con tus propios datos.\n\nTe conectaré con nuestro equipo comercial para agendarla en el horario que mejor te funcione.`,
        quickReplies: [
          { label: "💬 Agendar demo", action: "quiero demo" },
          { label: "💰 Precios", action: "Cuánto cuesta" },
          { label: "⚙️ Funciones", action: "Funciones del ERP" },
        ],
      };
    case "servicios":
      return {
        texto: `**Nuestro Portafolio de Servicios:**\n\n${KB.servicios.map((s) => `🛠️ **${s.nombre}** — ${s.desc}`).join("\n\n")}\n\n¿Sobre cuál te gustaría más información?`,
        quickReplies: [
          { label: "💻 Software", action: "Desarrollo de software" },
          { label: "📱 Apps Móviles", action: "Apps móviles" },
          { label: "🔒 Seguridad", action: "Servicios de seguridad" },
          { label: "☁️ Infraestructura", action: "Infraestructura y nube" },
        ],
      };
    case "software":
      return {
        texto: `**${KB.servicios[0].nombre}**\n${KB.servicios[0].desc}.\n\nCreamos soluciones robustas utilizando tecnologías modernas como **React, Node.js, Python, PostgreSQL, Docker** y más.\n\n¿Tienes un proyecto en mente?`,
        quickReplies: [
          { label: "📱 Apps Móviles", action: "Apps móviles" },
          { label: "☁️ Infraestructura", action: "Infraestructura" },
          { label: "💬 Cotizar", action: "Quiero un presupuesto" },
        ],
      };
    case "appmovil":
      return {
        texto: `**${KB.servicios[1].nombre}**\n${KB.servicios[1].desc}.\n\nUsamos **Flutter** para crear experiencias nativas en ambas plataformas desde un solo código, garantizando alto rendimiento y UI intuitiva.`,
        quickReplies: [
          { label: "💻 Software", action: "Desarrollo de software" },
          { label: "☁️ Infraestructura", action: "Infraestructura" },
          { label: "💬 Cotizar", action: "Quiero un presupuesto" },
        ],
      };
    case "infraestructura":
      return {
        texto: `**${KB.servicios[2].nombre}**\n${KB.servicios[2].desc}.\n\nOfrecemos soluciones en **AWS**, servidores **Linux** y **Windows Server**, migración a la nube y mesas de ayuda (Service Desk) para garantizar la continuidad de tu negocio.`,
        quickReplies: [
          { label: "🔒 Seguridad", action: "Servicios de seguridad" },
          { label: "💻 Software", action: "Desarrollo de software" },
          { label: "💬 Cotizar", action: "Quiero un presupuesto" },
        ],
      };
    case "seguridad":
      return {
        texto: `**${KB.servicios[3].nombre}**\n${KB.servicios[3].desc}.\n\nProtegemos tu negocio en el mundo físico y digital:\n🔐 Ciberseguridad y ethical hacking\n📹 Videovigilancia con IA\n🔄 Planes de continuidad (DRP)\n🏭 Seguridad electrónica perimetral`,
        quickReplies: [
          { label: "☁️ Infraestructura", action: "Infraestructura" },
          { label: "📋 Consultoría SGI", action: "Consultoría SGI" },
          { label: "💬 Cotizar", action: "Quiero un presupuesto" },
        ],
      };
    case "consultoria":
      return {
        texto: `**${KB.servicios[5].nombre}**\n${KB.servicios[5].desc}.\n\nTe ayudamos a:\n✅ Diseñar tu Sistema de Gestión Integrado\n✅ Digitalizar procesos\n✅ Prepararte para auditorías de certificación\n✅ Mantener la mejora continua`,
        quickReplies: [
          { label: "🔒 Seguridad", action: "Servicios de seguridad" },
          { label: "🏢 La empresa", action: "Cuéntame sobre la empresa" },
          { label: "💬 Cotizar", action: "Quiero un presupuesto" },
        ],
      };
    case "soporte":
      return {
        texto: `¿Necesitas asistencia técnica? 🛠️\n\nPuedo transferirte directamente a nuestro **equipo de soporte especializado** por WhatsApp para que te atiendan lo antes posible.\n\nNuestro horario de atención es:\n${KB.contacto.horario}`,
        quickReplies: [
          { label: "💬 WhatsApp Soporte", action: "quiero soporte" },
          { label: "📞 Contacto general", action: "Información de contacto" },
        ],
      };
    case "tecnologias":
      return {
        texto: `**Stack Tecnológico** que utilizamos:\n\n${KB.tecnologias.map((t) => `• ${t}`).join("\n")}\n\nTodas estas herramientas nos permiten construir productos robustos, escalables y confiables para nuestros clientes.`,
        quickReplies: [
          { label: "🛠️ Servicios", action: "Qué servicios ofrecen" },
          { label: "⚙️ NEXUS ERP", action: "Qué es NEXUS ERP" },
          { label: "💻 Software", action: "Desarrollo de software" },
        ],
      };
    case "cobertura":
      return {
        texto: `**Presencia Nacional** 📡\n\nAtendemos empresas en **${KB.cobertura.estados} estados** de Venezuela, incluyendo:\n${KB.cobertura.ciudades.map((c) => `📍 ${c}`).join("\n")}\n\n**Servicios disponibles en todo el país:**\n${KB.cobertura.servicios_disponibles.map((s) => `• ${s}`).join("\n")}`,
        quickReplies: [
          { label: "🛠️ Servicios", action: "Qué servicios ofrecen" },
          { label: "📞 Contacto", action: "Información de contacto" },
        ],
      };
    case "contacto":
      return {
        texto: `**Información de Contacto** 📞\n\n📧 **Email:** ${KB.contacto.email}\n📱 **Teléfono:** ${KB.contacto.telefono}\n📍 **Ubicación:** ${KB.contacto.ubicacion}\n🕐 **Horario:** ${KB.contacto.horario}\n\n💬 **WhatsApp Ventas:** [Escribir ahora](${KB.contacto.whatsapp_ventas})\n🔧 **WhatsApp Soporte:** [Solicitar soporte](${KB.contacto.whatsapp_soporte})`,
        quickReplies: [
          { label: "💬 WhatsApp Ventas", action: "quiero precio" },
          { label: "🔧 Soporte", action: "Necesito soporte" },
          { label: "🏢 La empresa", action: "Cuéntame sobre la empresa" },
        ],
      };
    case "despedida":
      return {
        texto: `¡Gracias por contactar a **${KB.empresa.nombre}**! 😊\n\nFue un placer ayudarte. Si en cualquier momento necesitas más información, aquí estaré NEX-IA para asistirte.\n\nTambién puedes escribirnos directamente por WhatsApp para atención personalizada.`,
        quickReplies: [
          { label: "💬 WhatsApp", action: "Información de contacto" },
          { label: "🏢 Volver al inicio", action: "Hola" },
        ],
      };
    default:
      return {
        texto: `No tengo una respuesta preparada para eso, pero puedo ayudarte con información sobre:\n\n🏢 **La empresa** — Quiénes somos\n⚙️ **NEXUS ERP** — Funcionalidades y pre-venta\n🛠️ **Servicios** — Todo nuestro portafolio\n📞 **Contacto** — WhatsApp, email, ubicación\n\n¿Sobre cuál de estos temas te gustaría saber más?`,
        quickReplies: [
          { label: "🏢 La empresa", action: "Cuéntame sobre la empresa" },
          { label: "⚙️ NEXUS ERP", action: "Qué es NEXUS ERP" },
          { label: "🛠️ Servicios", action: "Qué servicios ofrecen" },
          { label: "📞 Contacto", action: "Información de contacto" },
        ],
      };
  }
}

function necesitaWhatsApp(intencion: Intencion): boolean {
  return ["precio", "demo", "soporte"].includes(intencion);
}

function mensajeRedireccion(intencion: Intencion): { texto: string; url: string } {
  switch (intencion) {
    case "precio":
      return { texto: "¡Te conecto con un asesor comercial ahora mismo! 💰", url: WHATSAPP_VENTAS };
    case "demo":
      return { texto: "¡Te conecto con nuestro equipo para agendar tu demo! 🎯", url: WHATSAPP_VENTAS };
    case "soporte":
      return { texto: "¡Te transfiero al equipo de soporte técnico! 🛠️", url: WHATSAPP_SOPORTE };
    default:
      return { texto: "Te redirijo con un asesor para ayudarte mejor 👇", url: WHATSAPP_VENTAS };
  }
}

const MENSAJE_INICIAL = `¡Hola! Soy **NEX-IA** 🤖\n\nTu asistente virtual de **${KB.empresa.nombre}**.\n\nPuedo ayudarte con información sobre:\n• Nuestros servicios y el ERP\n• Precios y promociones\n• Agendar una demostración\n• Soporte técnico\n\n¿En qué puedo ayudarte hoy?`;

export default function NexIA() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: MENSAJE_INICIAL, quickReplies: [
      { label: "🏢 Quiénes son", action: "Cuéntame sobre la empresa" },
      { label: "⚙️ NEXUS ERP", action: "Qué es NEXUS ERP" },
      { label: "💰 Precios", action: "Cuánto cuesta" },
      { label: "🎯 Demo", action: "Quiero una demo" },
    ]},
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

    const tiempoRespuesta = 400 + Math.random() * 600;

    setTimeout(() => {
      const intencion = detectarIntencion(texto);
      const { texto: respuesta, quickReplies } = generarRespuesta(intencion);

      const msgBot: ChatMessage = { role: "bot", text: respuesta, quickReplies };
      setMessages((prev) => [...prev, msgBot]);
      setEsperando(false);

      if (necesitaWhatsApp(intencion)) {
        setTimeout(() => {
          const { texto: msgRedir, url } = mensajeRedireccion(intencion);
          setMessages((prev) => [...prev, { role: "bot", text: msgRedir }]);
          setTimeout(() => {
            setMessages((prev) => [...prev, {
              role: "bot",
              text: `🔗 *Abrir WhatsApp:* [Hablar con un asesor](${url})`,
            }]);
          }, 1500);
        }, 1200);
      }
    }, tiempoRespuesta);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    enviarMensaje(input);
  };

  const handleQuickReply = (action: string) => {
    enviarMensaje(action);
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
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[180] w-[calc(100vw-2rem)] sm:w-[380px] h-[540px] sm:h-[580px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-[#3C6FB5] to-[#3EB5AC] text-white px-5 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold backdrop-blur-sm">N</div>
              <div>
                <p className="font-semibold text-sm leading-tight">NEX-IA</p>
                <p className="text-[11px] text-white/70">Asistente Inteligente</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ scrollBehavior: "smooth" }}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
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
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-1">
                    {msg.quickReplies.map((qr, qi) => (
                      <button
                        key={qi}
                        onClick={() => handleQuickReply(qr.action)}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white border border-[#3EB5AC]/30 text-[#3C6FB5] hover:bg-[#3EB5AC]/10 hover:border-[#3EB5AC] transition-all whitespace-nowrap"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
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
