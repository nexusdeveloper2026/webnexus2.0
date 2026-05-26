"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookies-accepted");
    if (stored === null) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookies-accepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="max-w-4xl mx-auto bg-text rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <p className="text-white text-sm font-semibold mb-1 flex items-center gap-2">
            <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" />
              <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
              <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
              <circle cx="14" cy="14" r="1.2" fill="currentColor" stroke="none" />
            </svg>
            Uso de cookies
          </p>
          <p className="text-white/60 text-xs leading-relaxed">
            Este sitio utiliza cookies para mejorar tu experiencia. Al aceptar, autorizas el uso de cookies según nuestra{" "}
            <a href="/privacidad" target="_blank" rel="noopener noreferrer" className="text-secondary underline hover:text-white transition-colors">Política de Privacidad</a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-5 py-2.5 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-secondary to-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-md"
          >
            Aceptar cookies
          </button>
        </div>
      </div>
    </div>
  );
}