import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";

// Lazy-loaded global components
const CookieConsent = dynamic(() => import("@/components/CookieConsent"));
const MeshGradient = dynamic(() => import("@/components/MeshGradient"));
const NexIA = dynamic(() => import("@/components/NexIA"));

const SITE_URL = "https://nexusgcorp.com";
const SITE_NAME = "NEXUS TECHNOLOGY";
const DEFAULT_TITLE =
  "NEXUS TECHNOLOGY | Software Empresarial · ERP · Ciberseguridad · Apps · Venezuela";
const DEFAULT_DESCRIPTION =
  "NEXUS TECHNOLOGY: empresa venezolana de tecnología integral. Desarrollamos software a la medida, ERP con IA nativa, apps móviles, ciberseguridad, videovigilancia, infraestructura cloud y consultoría ISO 9001 / ISO 27001. Atendemos toda Venezuela.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    // ── BRAND ─────────────────────────────────────────────────────────────
    "NEXUS TECHNOLOGY", "Nexus Technology Venezuela", "NEXUS software Venezuela",
    "nexusgcorp", "nexus gcorp Venezuela",

    // ── DESARROLLO DE SOFTWARE ────────────────────────────────────────────
    "desarrollo de software Venezuela", "desarrollo de software Caracas",
    "empresa de software Venezuela", "fábrica de software Venezuela",
    "software a la medida Venezuela", "desarrollo de aplicaciones Venezuela",
    "programación a medida Venezuela", "sistemas a la medida Venezuela",
    "integración de sistemas Venezuela", "desarrollo web Venezuela",
    "desarrollo de sistemas empresariales Venezuela",

    // ── APLICACIONES MÓVILES ──────────────────────────────────────────────
    "desarrollo de aplicaciones móviles Venezuela",
    "apps móviles Venezuela", "aplicaciones iOS Venezuela",
    "aplicaciones Android Venezuela", "apps empresariales Venezuela",
    "desarrollo app móvil Caracas", "aplicaciones híbridas Venezuela",
    "desarrollo Flutter Venezuela", "desarrollo React Native Venezuela",

    // ── ERP / SISTEMA ADMINISTRATIVO ─────────────────────────────────────
    "NEXUS ERP", "NEXUS ERP Venezuela", "ERP Venezuela", "sistema ERP Venezuela",
    "software ERP Venezuela", "ERP multi empresa Venezuela", "ERP con IA Venezuela",
    "sistema administrativo Venezuela", "software administrativo Venezuela",
    "sistema contable Venezuela", "software contable Venezuela",
    "programa contable Venezuela", "sistema de gestión empresarial Venezuela",
    "ERP PYME Venezuela", "ERP para distribuidoras Venezuela",
    "facturación electrónica Venezuela", "facturación SENIAT", "sistema SENIAT",
    "factura electrónica Venezuela", "software facturación Venezuela",
    "gestión contable Venezuela", "contabilidad automatizada Venezuela",
    "CRM Venezuela", "CRM inteligente Venezuela", "software CRM Venezuela",
    "control de inventario Venezuela", "gestión de inventario Venezuela",
    "nómina Venezuela", "software nómina Venezuela",
    "multi sucursales Venezuela", "multi almacenes Venezuela", "multi moneda Venezuela",
    "ERP bolívares", "ERP dólares Venezuela", "ERP homologado SENIAT",
    "alternativa SAP Venezuela", "alternativa Profit Plus Venezuela",
    "alternativa Valery Venezuela", "alternativa Oracle Venezuela",
    "mejor ERP Venezuela", "ERP económico Venezuela",

    // ── INFRAESTRUCTURA Y NUBE ────────────────────────────────────────────
    "infraestructura tecnológica Venezuela", "infraestructura cloud Venezuela",
    "migración a la nube Venezuela", "cloud computing Venezuela",
    "servidor cloud Venezuela", "servidor local Venezuela",
    "hosting empresarial Venezuela", "soporte técnico Venezuela",
    "mesa de ayuda Venezuela", "service desk Venezuela",
    "help desk Venezuela", "soporte TI Venezuela",
    "administración de servidores Venezuela", "virtualización Venezuela",

    // ── CIBERSEGURIDAD ────────────────────────────────────────────────────
    "ciberseguridad Venezuela", "empresa ciberseguridad Venezuela",
    "ciberseguridad Caracas", "seguridad informática Venezuela",
    "seguridad de la información Venezuela", "protección de datos Venezuela",
    "auditoría de seguridad Venezuela", "hacking ético Venezuela",
    "pentesting Venezuela", "plan de continuidad Venezuela",
    "DRP Venezuela", "disaster recovery Venezuela",
    "ISO 27001 Venezuela", "certificación ISO 27001 Venezuela",
    "consultoría ISO 27001 Venezuela", "SGSI Venezuela",
    "seguridad cibernética empresas Venezuela",

    // ── SEGURIDAD ELECTRÓNICA / VIDEOVIGILANCIA ───────────────────────────
    "sistemas de seguridad Venezuela", "videovigilancia Venezuela",
    "cámaras de seguridad Venezuela", "CCTV Venezuela",
    "instalación cámaras Venezuela", "circuito cerrado Venezuela",
    "seguridad integral Venezuela", "seguridad física Venezuela",
    "control de acceso Venezuela", "alarmas Venezuela",
    "seguridad perimetral Venezuela", "sistemas de vigilancia Venezuela",
    "instalación CCTV Caracas", "videovigilancia empresas Venezuela",

    // ── CONSULTORÍA SGI / ISO ─────────────────────────────────────────────
    "consultoría ISO 9001 Venezuela", "certificación ISO 9001 Venezuela",
    "sistema de gestión de calidad Venezuela", "ISO 9001 Venezuela",
    "sistema de gestión integrado Venezuela", "SGI Venezuela",
    "auditoría ISO Venezuela", "consultoría calidad Venezuela",
    "mejora continua Venezuela", "gestión de procesos Venezuela",
    "transformación digital Venezuela", "consultoría tecnológica Venezuela",
    "asesoría tecnológica Venezuela", "consultoría TI Venezuela",

    // ── INTELIGENCIA ARTIFICIAL ───────────────────────────────────────────
    "inteligencia artificial Venezuela", "IA empresarial Venezuela",
    "software con IA Venezuela", "automatización con IA Venezuela",
    "machine learning Venezuela", "NEX-IA Venezuela",

    // ── COBERTURA GEOGRÁFICA ──────────────────────────────────────────────
    // Capitales de estado
    "tecnología Caracas", "empresa tecnología Caracas",
    "software Maracaibo", "tecnología Maracaibo",
    "software Valencia", "tecnología Valencia",
    "software Barquisimeto", "tecnología Barquisimeto",
    "software Maracay", "tecnología Maracay",
    "software Maturín", "tecnología Maturín",
    "software Puerto Ordaz", "tecnología Puerto Ordaz", "tecnología Ciudad Guayana",
    "software Mérida", "tecnología Mérida",
    "software San Cristóbal", "tecnología San Cristóbal",
    "software Cumaná", "tecnología Cumaná",
    "software Porlamar", "tecnología Margarita",
    "software Barcelona", "tecnología Anzoátegui",
    "software Barinas", "tecnología Barinas",
    "software San Fernando de Apure", "tecnología Apure",
    "software Tucupita", "tecnología Delta Amacuro",
    "software Guanare", "tecnología Portuguesa",
    "software Coro", "tecnología Falcón",
    "software Punto Fijo", "tecnología Punto Fijo",
    "software Cabimas", "tecnología Cabimas",
    "empresa tecnología toda Venezuela",
    "servicio tecnológico toda Venezuela",

    // ── LONG-TAIL / BÚSQUEDAS DE INTENCIÓN ───────────────────────────────
    "cómo digitalizar mi empresa Venezuela",
    "qué ERP usar en Venezuela",
    "mejor software empresarial Venezuela 2026",
    "empresa de ciberseguridad Venezuela precio",
    "cómo certificar ISO 9001 en Venezuela",
    "servicio de soporte técnico empresa Venezuela",
    "instalar cámaras de seguridad empresa Venezuela",
    "desarrollo de app para mi negocio Venezuela",
    "software para PYME Venezuela",
    "sistema para distribuidoras Venezuela",
    "sistema para comercios Venezuela",
    "tecnología empresarial Venezuela 2026",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Empresa de Tecnología",
  classification: "Software · Ciberseguridad · Infraestructura · Consultoría",
  alternates: {
    canonical: "/",
    languages: { "es-VE": "/", "es": "/" },
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NEXUS TECHNOLOGY - Tecnología Integral para Empresas Venezolanas",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NexusTechVE",
    creator: "@NexusTechVE",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "NEXUS TECHNOLOGY - Tecnología Integral Venezuela" }],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png" }],
    shortcut: "/logo.png",
  },
  other: {
    "geo.region": "VE",
    "geo.placename": "Caracas, Venezuela",
    "geo.position": "10.4806;-66.9036",
    "ICBM": "10.4806, -66.9036",
    "language": "Spanish",
    "revisit-after": "7 days",
    "rating": "general",
    "distribution": "global",
  },
};

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "NEXUS TECHNOLOGY C.A.",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 200, height: 200 },
  description: DEFAULT_DESCRIPTION,
  foundingDate: "2026",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caracas",
    addressRegion: "Distrito Capital",
    addressCountry: "VE",
  },
  contactPoint: [
    { "@type": "ContactPoint", contactType: "sales", areaServed: "VE", availableLanguage: "Spanish" },
    { "@type": "ContactPoint", contactType: "technical support", areaServed: "VE", availableLanguage: "Spanish" },
    { "@type": "ContactPoint", contactType: "customer support", areaServed: "VE", availableLanguage: "Spanish" },
  ],
  sameAs: [
    "https://www.instagram.com/nexustechnologyve",
    "https://www.linkedin.com/company/nexus-technology-ve",
    "https://twitter.com/NexusTechVE",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios Tecnológicos NEXUS TECHNOLOGY",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo de Software a la Medida", description: "Diseño de aplicaciones a la medida, integración de sistemas y fábrica de software para empresas venezolanas." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo de Aplicaciones Móviles", description: "Apps nativas e híbridas para iOS y Android con IA integrada." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "NEXUS ERP", description: "Sistema ERP multi-empresa con IA nativa, facturación SENIAT, CRM, inventario y nómina." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Infraestructura y Nube", description: "Migración cloud, servidores, virtualización y mesa de ayuda (Service Desk)." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ciberseguridad", description: "Auditorías de seguridad, hacking ético, ISO 27001, DRP y continuidad de negocio." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seguridad Electrónica y Videovigilancia", description: "Instalación de cámaras CCTV, control de acceso, alarmas y seguridad perimetral." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Consultoría SGI · ISO 9001 · ISO 27001", description: "Diseño, implementación y auditoría de Sistemas de Gestión Integrado bajo normas ISO." } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Asesoría y Acompañamiento Tecnológico", description: "Soporte técnico especializado y consultoría en transformación digital." } },
    ],
  },
};

const jsonLdSoftware = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "NEXUS ERP",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "ERP Software",
  operatingSystem: ["Web", "Windows", "Linux"],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/ComingSoon",
    areaServed: { "@type": "Country", name: "Venezuela" },
    priceCurrency: "USD",
  },
  description: "Sistema ERP multi-empresa con inteligencia artificial nativa para Venezuela. Gestión contable, facturación electrónica SENIAT, CRM, inventario, nómina, multi-moneda, multi-sucursales.",
  featureList: [
    "Gestión Contable Automatizada con IA",
    "Facturación Electrónica homologada ante el SENIAT",
    "CRM Inteligente con IA Predictiva",
    "Control de Inventario Multi-Almacén",
    "Nómina",
    "Multi Empresa",
    "Multi Sucursales",
    "Multi Almacenes",
    "Multi Moneda (Bolívares y Dólares)",
    "Servidor Local y Cloud",
    "Dashboard con BI e Inteligencia Artificial",
  ],
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "es",
  audience: { "@type": "BusinessAudience", audienceType: "Empresas, PYMES y distribuidoras venezolanas" },
};

const jsonLdLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  description: "Empresa venezolana de tecnología integral: desarrollo de software, ERP con IA, apps móviles, ciberseguridad, videovigilancia, infraestructura cloud y consultoría ISO 9001 / ISO 27001.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caracas",
    addressRegion: "Distrito Capital",
    addressCountry: "VE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 10.4806, longitude: -66.9036 },
  areaServed: { "@type": "Country", name: "Venezuela" },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  knowsAbout: [
    "Desarrollo de Software", "ERP", "Aplicaciones Móviles",
    "Ciberseguridad", "ISO 27001", "ISO 9001", "Videovigilancia",
    "Infraestructura Cloud", "Inteligencia Artificial", "Transformación Digital",
  ],
};

const jsonLdFAQ = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué servicios ofrece NEXUS TECHNOLOGY?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NEXUS TECHNOLOGY ofrece: desarrollo de software a la medida, NEXUS ERP (sistema administrativo con IA nativa), desarrollo de apps móviles iOS y Android, infraestructura y nube (cloud), ciberseguridad e ISO 27001, instalación de cámaras CCTV y videovigilancia, y consultoría SGI bajo normas ISO 9001 e ISO 27001.",
      },
    },
    {
      "@type": "Question",
      name: "¿NEXUS TECHNOLOGY atiende toda Venezuela?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, NEXUS TECHNOLOGY tiene cobertura nacional en toda Venezuela, atendiendo empresas en Caracas, Maracaibo, Valencia, Barquisimeto, Maracay, Maturín, Puerto Ordaz, Mérida, San Cristóbal, Cumaná, Margarita y el resto del país.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es NEXUS ERP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NEXUS ERP es el único sistema administrativo multi-empresa con inteligencia artificial nativa en Venezuela. Incluye gestión contable, facturación electrónica homologada ante el SENIAT, CRM, inventario, nómina, multi-moneda y funciona en servidor local o en la nube.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ofrecen servicios de ciberseguridad en Venezuela?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, NEXUS TECHNOLOGY ofrece servicios de ciberseguridad completos: auditorías de seguridad, hacking ético (pentesting), implementación de ISO 27001, planes de continuidad de negocio (DRP) y protección de datos para empresas venezolanas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Instalan cámaras de seguridad y videovigilancia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, NEXUS TECHNOLOGY instala sistemas de seguridad electrónica completos: cámaras CCTV, videovigilancia IP, control de acceso biométrico, alarmas y seguridad perimetral para empresas en toda Venezuela.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ayudan con la certificación ISO 9001 e ISO 27001?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, ofrecemos consultoría SGI completa para la implementación, documentación y auditoría de Sistemas de Gestión Integrado bajo las normas ISO 9001 (Calidad) e ISO 27001 (Seguridad de la Información) en Venezuela.",
      },
    },
    {
      "@type": "Question",
      name: "¿Desarrollan aplicaciones móviles en Venezuela?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, NEXUS TECHNOLOGY desarrolla aplicaciones móviles nativas e híbridas para iOS y Android, con integración de inteligencia artificial, diseño UX profesional y alto rendimiento para empresas venezolanas.",
      },
    },
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <MeshGradient />
        {children}
        <NexIA />
        <CookieConsent />
      </body>
    </html>
  );
}
