import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | NEXUS TECHNOLOGY",
};

export default function PrivacidadPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-8">Política de Privacidad</h1>
      <p className="text-text-secondary text-sm mb-6">Última actualización: 26 de mayo de 2026</p>

      <section className="space-y-6 text-text-secondary text-sm leading-relaxed">
        <p>
          En NEXUS TECHNOLOGY, nos comprometemos a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
        </p>

        <h2 className="text-lg font-semibold text-text">1. Información que recopilamos</h2>
        <p>Podemos recopilar información como nombre, correo electrónico, teléfono y datos de tu empresa cuando nos contactas a través de formularios, WhatsApp o correo electrónico.</p>

        <h2 className="text-lg font-semibold text-text">2. Uso de la información</h2>
        <p>Utilizamos tu información para responder a tus consultas, brindarte soporte técnico, enviarte información relevante sobre nuestros servicios y mejorar nuestra oferta tecnológica.</p>

        <h2 className="text-lg font-semibold text-text">3. Protección de datos</h2>
        <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida o destrucción.</p>

        <h2 className="text-lg font-semibold text-text">4. Compartir información</h2>
        <p>No compartimos tu información personal con terceros, excepto cuando sea requerido por ley o necesario para prestarte nuestros servicios con proveedores de confianza.</p>

        <h2 className="text-lg font-semibold text-text">5. Tus derechos</h2>
        <p>Tienes derecho a acceder, corregir o eliminar tus datos personales en cualquier momento. Para ejercer estos derechos, contáctanos en <span className="text-primary">contacto@nexusgcorp.com</span>.</p>

        <h2 className="text-lg font-semibold text-text">6. Contacto</h2>
        <p>Si tienes preguntas sobre esta política, escríbenos a <span className="text-primary">contacto@nexusgcorp.com</span> o a través de nuestro WhatsApp.</p>
      </section>

      <div className="mt-10">
        <a href="/" className="text-primary text-sm font-semibold hover:underline">&larr; Volver al inicio</a>
      </div>
    </main>
  );
}