"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export default function VideoPopup() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [unmuted, setUnmuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fadeOut = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => setVisible(false), 350);
  }, [closing]);

  const handleInteraction = useCallback(() => {
    if (!unmuted && videoRef.current) {
      videoRef.current.muted = false;
      setUnmuted(true);
    }
  }, [unmuted]);

  const handleEnded = useCallback(() => {
    fadeOut();
  }, [fadeOut]);

  useEffect(() => {
    const el = videoRef.current;
    if (el) {
      el.addEventListener("ended", handleEnded);
      return () => el.removeEventListener("ended", handleEnded);
    }
  }, [handleEnded]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300 ${
        closing ? "opacity-0 pointer-events-none" : "bg-black/60 backdrop-blur-sm"
      }`}
      onClick={handleInteraction}
    >
      <div className={`relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        closing ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}>
        <button
          onClick={(e) => { e.stopPropagation(); fadeOut(); }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full aspect-video"
            src="/video-presentacion.mp4"
            controls
            autoPlay
            muted
            playsInline
            onError={(e) => {
              const el = e.currentTarget;
              if (el.parentElement) {
                el.parentElement.innerHTML = `<div class="flex items-center justify-center aspect-video bg-gray-900 text-white/60 text-sm p-6 text-center">No se pudo cargar el video.<br />Asegúrate de que el archivo <strong>video-presentacion.mp4</strong> exista en la carpeta <strong>public/</strong>.</div>`;
              }
            }}
          >
            Tu navegador no soporta video.
          </video>
          {!unmuted && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none animate-pulse">
              <span className="text-white/80 text-xs bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm whitespace-nowrap">
                Haz clic para activar el sonido 🔊
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
