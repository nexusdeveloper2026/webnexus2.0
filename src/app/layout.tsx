import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS TECHNOLOGY | ERP con IA Nativa en Venezuela",
  description:
    "NEXUS ERP - El único Sistema Administrativo Multi empresa con IA nativa en Venezuela. Transforma la gestión de tu empresa con inteligencia artificial integrada.",
  keywords: ["ERP", "Venezuela", "IA", "inteligencia artificial", "gestión empresarial", "NEXUS"],
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
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
