import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import MeshGradient from "@/components/MeshGradient";
import VideoPopup from "@/components/VideoPopup";
import NexIA from "@/components/NexIA";

const SITE_URL = "https://nexustechnology.com";

export const metadata: Metadata = {
  title: {
    default: "NEXUS TECHNOLOGY | ERP con IA Nativa en Venezuela",
    template: "%s | NEXUS TECHNOLOGY",
  },
  description:
    "NEXUS ERP - El único Sistema Administrativo Multi empresa con IA nativa en Venezuela. Transforma la gestión de tu empresa con inteligencia artificial integrada.",
  keywords: [
    "ERP", "Venezuela", "IA", "inteligencia artificial", "gestión empresarial",
    "NEXUS", "software contable", "facturación electrónica", "multi empresa",
    "sistema administrativo", "ERP Venezuela", "NEXUS ERP",
  ],
  authors: [{ name: "NEXUS TECHNOLOGY" }],
  creator: "NEXUS TECHNOLOGY",
  publisher: "NEXUS TECHNOLOGY",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_VE",
    siteName: "NEXUS TECHNOLOGY",
    title: "NEXUS TECHNOLOGY | ERP con IA Nativa en Venezuela",
    description:
      "El único Sistema Administrativo Multi empresa con IA nativa en Venezuela. Transforma tu empresa.",
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "NEXUS TECHNOLOGY" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXUS TECHNOLOGY | ERP con IA Nativa en Venezuela",
    description:
      "El único Sistema Administrativo Multi empresa con IA nativa en Venezuela.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NEXUS TECHNOLOGY",
              url: "https://nexustechnology.com",
              logo: "https://nexustechnology.com/logo.png",
              description: "ERP con IA Nativa en Venezuela. Soluciones tecnológicas integrales.",
              address: { "@type": "PostalAddress", addressLocality: "Caracas", addressCountry: "VE" },
            }),
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning><MeshGradient /><VideoPopup />{children}<NexIA /><CookieConsent /></body>
    </html>
  );
}
