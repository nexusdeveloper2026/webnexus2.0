import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | NEXUS TECHNOLOGY",
};

export default function TerminosPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
      <h1 className="text-3xl sm:text-4xl font-bold text-text mb-8">Términos y Condiciones</h1>
      <p className="text-text-secondary text-sm mb-6">Última actualización: 26 de mayo de 2026</p>

      <section className="space-y-6 text-text-secondary text-sm leading-relaxed">
        <p>
          Al acceder y utilizar los servicios de NEXUS TECHNOLOGY, aceptas los siguientes términos y condiciones. Si no estás de acuerdo, por favor no uses nuestros servicios.
        </p>

        <h2 className="text-lg font-semibold text-text">1. Servicios</h2>
        <p>NEXUS TECHNOLOGY ofrece soluciones tecnológicas que incluyen desarrollo de software, redes y telecomunicaciones, videovigilancia, consultoría tecnológica y soporte técnico.</p>

        <h2 className="text-lg font-semibold text-text">2. Uso aceptable</h2>
        <p>El cliente se compromete a utilizar nuestros servicios de manera legal y ética, sin infringir derechos de terceros ni leyes aplicables.</p>

        <h2 className="text-lg font-semibold text-text">3. Propiedad intelectual</h2>
        <p>Todo el contenido, marcas, logos y materiales presentes en nuestro sitio web y servicios son propiedad de NEXUS TECHNOLOGY o cuentan con las licencias correspondientes.</p>

        <h2 className="text-lg font-semibold text-text">4. Limitación de responsabilidad</h2>
        <p>NEXUS TECHNOLOGY no será responsable por daños indirectos, pérdida de datos o interrupción del servicio causados por factores fuera de nuestro control razonable.</p>

        <h2 className="text-lg font-semibold text-text">5. Modificaciones</h2>
        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de nuestro sitio web.</p>

        <h2 className="text-lg font-semibold text-text">6. Contacto</h2>
        <p>Para cualquier consulta sobre estos términos, contáctanos en <span className="text-primary">contacto@nexusgcorp.com</span>.</p>
      </section>

      <div className="mt-10">
        <a href="/" className="text-primary text-sm font-semibold hover:underline">&larr; Volver al inicio</a>
      </div>
    </main>
  );
}