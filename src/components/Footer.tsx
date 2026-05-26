export default function Footer() {
  return (
    <footer className="relative bg-text text-white" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg text-white">NEXUS</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Transformando la gestión empresarial venezolana con inteligencia artificial nativa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Enlaces</h4>
            <ul className="space-y-2.5">
              {["Inicio", "Nosotros", "Servicios", "Tecnologías", "Testimonios", "Contacto"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="text-white/60 text-sm hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Servicios</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li>Gestión Contable</li>
              <li>IA Predictiva</li>
              <li>Facturación Electrónica</li>
              <li>Multi Empresa</li>
              <li>CRM Inteligente</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-white/60 text-sm">
              <li>contacto@nexustechnology.com</li>
              <li>Caracas, Venezuela</li>
              <li>+58 412 000 0000</li>
            </ul>
            <div className="flex gap-3 mt-4">
              {["instagram", "twitter", "linkedin", "youtube"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label={s}>
                  <span className="text-white/80 text-xs font-medium uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} NEXUS TECHNOLOGY. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-white/40 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
