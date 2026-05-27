"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

gsap.registerPlugin(ScrollTrigger);

const geoUrl = "/venezuela.topo.json";

function AnimatedNumber({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  // Extract the numeric part and the suffix (e.g., "14+", "100%")
  const targetMatch = value.match(/(\d+)/);
  const target = targetMatch ? parseInt(targetMatch[1], 10) : 0;
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    let animationFrame: number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out exponential formula
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target]);

  // If no numbers were found, just return the string
  if (!targetMatch) return <>{value}</>;

  return <>{count}{suffix}</>;
}

const ALL_SERVICES = [
  "NEXUS ERP",
  "Desarrollo de Software",
  "Apps Móviles",
  "Ciberseguridad",
  "Asesoria SGI",
  "Seguridad Electronica",
  "Infraestructura Cloud",
  "Soporte Técnico"
];

const cities = [
  { id: "caracas", name: "Caracas", state: "Distrito Capital", coordinates: [-66.9036, 10.4806] as [number, number], main: true, services: ALL_SERVICES },
  { id: "maracaibo", name: "Maracaibo", state: "Zulia", coordinates: [-71.6406, 10.6317] as [number, number], main: true, services: ALL_SERVICES },
  { id: "valencia", name: "Valencia", state: "Carabobo", coordinates: [-68.0125, 10.1620] as [number, number], main: true, services: ALL_SERVICES },
  { id: "barquisimeto", name: "Barquisimeto", state: "Lara", coordinates: [-69.3473, 10.0646] as [number, number], main: false, services: ALL_SERVICES },
  { id: "maracay", name: "Maracay", state: "Aragua", coordinates: [-67.5958, 10.2353] as [number, number], main: false, services: ALL_SERVICES },
  { id: "barcelona", name: "Barcelona", state: "Anzoátegui", coordinates: [-64.6862, 10.1363] as [number, number], main: false, services: ALL_SERVICES },
  { id: "cumana", name: "Cumaná", state: "Sucre", coordinates: [-64.1775, 10.4633] as [number, number], main: false, services: ALL_SERVICES },
  { id: "maturin", name: "Maturín", state: "Monagas", coordinates: [-63.1767, 9.7457] as [number, number], main: false, services: ALL_SERVICES },
  { id: "ciudadbolivar", name: "Ciudad Bolivar", state: "Bolívar", coordinates: [-62.7208, 8.2932] as [number, number], main: true, services: ALL_SERVICES },
  { id: "merida", name: "Mérida", state: "Mérida", coordinates: [-71.1449, 8.5983] as [number, number], main: false, services: ALL_SERVICES },
  { id: "sancristobal", name: "San Cristóbal", state: "Táchira", coordinates: [-72.2250, 7.7669] as [number, number], main: false, services: ALL_SERVICES },
  { id: "barinas", name: "Barinas", state: "Barinas", coordinates: [-70.2075, 8.6225] as [number, number], main: false, services: ALL_SERVICES },
  { id: "coro", name: "Coro", state: "Falcón", coordinates: [-69.6731, 11.4045] as [number, number], main: false, services: ALL_SERVICES },
  { id: "Laasunción", name: "La Asunción", state: "Nueva Esparta", coordinates: [-63.8447, 10.9575] as [number, number], main: false, services: ALL_SERVICES },
];

const SERVICE_COLORS: Record<string, string> = {
  "NEXUS ERP": "#3C6FB5",
  "Desarrollo de Software": "#3EB5AC",
  "Apps Móviles": "#1D3D8E",
  "Ciberseguridad": "#e11d48",
  "Asesoria SGI": "#7c3aed",
  "Seguridad Electronica": "#d97706",
  "Infraestructura Cloud": "#0891b2",
  "Soporte Técnico": "#0891b2",
};

export default function VenezuelaMap() {
  const [active, setActive] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeCity = cities.find((c) => c.id === active);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".map-title", { opacity: 0, y: 30 }, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 1, y: 0, duration: 0.8,
      });
      gsap.fromTo(".map-body", { opacity: 0, scale: 0.97 }, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        opacity: 1, scale: 1, duration: 1, ease: "power2.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cobertura" ref={sectionRef} className="relative py-16 sm:py-20 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Dark tech background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2050] to-[#0a2040] pointer-events-none" />
      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-cov" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#3EB5AC" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-cov)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="map-title text-center mb-8 sm:mb-10">
          <span className="text-primary font-semibold text-2xl sm:text-3xl tracking-widest uppercase">Cobertura Nacional</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">Presencia en toda Venezuela</h2>
          <p className="text-white/55 max-w-2xl mx-auto text-sm sm:text-base">
            Atendemos empresas en los principales estados y ciudades del país con nuestro portafolio completo de servicios tecnológicos.
          </p>
        </div>

        <div className="map-body flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          {/* ── REAL SVG MAP ────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[65%] flex justify-center">
            <div className="w-full max-w-[900px]" style={{ filter: "drop-shadow(0 0 50px rgba(62,181,172,0.18))" }}>
              <ComposableMap
                width={1024}
                height={1024}
                projection="geoMercator"
                projectionConfig={{
                  scale: 3400,
                  center: [-65.5, 7.2] // Adjusted to fit the taller viewBox and scale
                }}
                className="w-full h-auto"
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(29, 61, 142, 0.75)"
                        stroke="#3EB5AC"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "rgba(60, 111, 181, 0.85)", outline: "none", transition: "all 250ms" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* City markers */}
                {cities.map((city) => {
                  const isActive = active === city.id;
                  const r = city.main ? 6 : 4;
                  return (
                    <Marker
                      key={city.id}
                      coordinates={city.coordinates}
                      onMouseEnter={() => setActive(city.id)}
                      onMouseLeave={() => setActive(null)}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" }
                      }}
                    >
                      <g>
                        {/* Ping ring */}
                        <circle
                          r={isActive ? r + 12 : city.main ? r + 8 : r + 5}
                          fill="transparent"
                          stroke={isActive ? "#3EB5AC" : city.main ? "rgba(62,181,172,0.5)" : "rgba(255,255,255,0.25)"}
                          strokeWidth={isActive ? 1.5 : 1}
                          style={{ transition: "all 0.3s" }}
                        />
                        {/* Core dot */}
                        <circle
                          r={isActive ? r + 2 : r}
                          fill={isActive ? "#3EB5AC" : city.main ? "#60a5fa" : "rgba(255,255,255,0.8)"}
                          stroke="white" strokeWidth={isActive ? 1.5 : 1}
                          style={{ transition: "all 0.3s" }}
                        />
                        {/* Label */}
                        {(isActive || city.main) && (
                          <text
                            y={-r - 6}
                            textAnchor="middle"
                            fill={isActive ? "#3EB5AC" : "rgba(255,255,255,0.9)"}
                            fontSize={isActive ? 12 : 10}
                            fontWeight={isActive ? "700" : "600"}
                            style={{ pointerEvents: "none", transition: "all 0.3s" }}
                          >
                            {city.name}
                          </text>
                        )}
                      </g>
                    </Marker>
                  );
                })}
              </ComposableMap>
            </div>
          </div>

          {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
          <div className="w-full lg:w-[35%] flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "24", label: "Estados" },
                { value: `${cities.length}+`, label: "Ciudades" },
                { value: "8", label: "Servicios" },
                { value: "100%", label: "Venezuela" },
              ].map((s) => (
                <div key={s.label} className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 hover:border-[#3EB5AC]/50 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3EB5AC]/20">
                  <p className="text-2xl font-bold text-[#3EB5AC] group-hover:scale-110 transition-transform duration-300 inline-block">
                    <AnimatedNumber value={s.value} />
                  </p>
                  <p className="text-white/50 text-xs mt-0.5 group-hover:text-white/80 transition-colors duration-300">{s.label}</p>
                </div>
              ))}
            </div>

            {/* City card */}
            <div
              className="rounded-2xl p-5 sm:p-6 border min-h-[180px] flex flex-col justify-center transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(10px)",
                borderColor: active ? "rgba(62,181,172,0.55)" : "rgba(255,255,255,0.1)",
                boxShadow: active ? "0 0 30px rgba(62,181,172,0.1)" : "none",
              }}
            >
              {active && activeCity ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#3EB5AC] animate-pulse" />
                    <span className="text-[#3EB5AC] text-[10px] font-bold uppercase tracking-widest">Cobertura activa</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{activeCity.name}</h3>
                  <p className="text-white/45 text-sm mb-4">{activeCity.state}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCity.services.map((svc) => (
                      <span
                        key={svc}
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white"
                        style={{ backgroundColor: `${SERVICE_COLORS[svc] ?? "#3C6FB5"}90`, border: `1px solid ${SERVICE_COLORS[svc] ?? "#3C6FB5"}60` }}
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#3EB5AC]/15 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#3EB5AC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white/50 text-sm">Pasa el cursor sobre una ciudad para ver los servicios disponibles</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="hidden sm:block rounded-xl p-4 border border-white/5" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3">Servicios</p>
              <div className="flex flex-col gap-1.5">
                {Object.entries(SERVICE_COLORS).map(([svc, color]) => (
                  <span key={svc} className="flex items-center gap-2 text-[11px] text-white/65">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#contacto"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#3EB5AC] to-[#3C6FB5] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#3EB5AC]/20 hover:-translate-y-0.5 text-sm mt-2"
            >
              Solicitar atención en mi ciudad
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
