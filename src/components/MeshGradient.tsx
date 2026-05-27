"use client";

export default function MeshGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(900px at 20% 30%, rgba(60, 111, 181, 0.5) 0%, transparent 70%),
            radial-gradient(700px at 80% 20%, rgba(62, 181, 172, 0.4) 0%, transparent 70%),
            radial-gradient(600px at 40% 80%, rgba(60, 111, 181, 0.35) 0%, transparent 60%),
            radial-gradient(500px at 70% 70%, rgba(62, 181, 172, 0.3) 0%, transparent 60%)
          `,
          animation: "mesh-drift 25s ease-in-out infinite alternate",
        }}
      />
      <style>{`
        @keyframes mesh-drift {
          0%   { transform: translate(0%, 0%) scale(1); }
          33%  { transform: translate(3%, -2%) scale(1.03); }
          66%  { transform: translate(-2%, 3%) scale(0.97); }
          100% { transform: translate(2%, 1%) scale(1.02); }
        }
      `}</style>
    </div>
  );
}