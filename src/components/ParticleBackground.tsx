"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 80;
const CONNECT_DIST = 0.4;
const LINE_OPACITY = 0.2;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const texCanvas = document.createElement("canvas");
    texCanvas.width = 64;
    texCanvas.height = 64;
    const ctx = texCanvas.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.1, "rgba(180,210,255,0.6)");
    g.addColorStop(0.4, "rgba(100,150,255,0.15)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(texCanvas);

    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const velocities = new Float32Array(COUNT * 2);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const i2 = i * 2;
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 2.4;
      positions[i3 + 1] = (Math.random() - 0.5) * 2.4;
      positions[i3 + 2] = 0;
      sizes[i] = 0.008 + Math.random() * 0.025;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.0003 + Math.random() * 0.001;
      velocities[i2] = Math.cos(angle) * speed;
      velocities[i2 + 1] = Math.sin(angle) * speed;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const pointsMat = new THREE.PointsMaterial({
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.5,
      color: new THREE.Color(0.45, 0.6, 1),
      size: 0.025,
      sizeAttenuation: false,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);

    const maxLines = COUNT * (COUNT - 1) / 2;
    const linePos = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setDrawRange(0, 0);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4a7fff,
      transparent: true,
      opacity: LINE_OPACITY,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    const handleResize = () => renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("resize", handleResize);

    let time = 0;

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      time += dt;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const posAttr = pointsGeo.attributes.position as THREE.BufferAttribute;
      const pos = posAttr.array as Float32Array;
      const halfW = 1.2;
      const halfH = 1.2;

      for (let i = 0; i < COUNT; i++) {
        const i2 = i * 2;
        const i3 = i * 3;

        pos[i3] += velocities[i2] * dt * 60 + Math.sin(time * 0.5 + phases[i]) * 0.00015;
        pos[i3 + 1] += velocities[i2 + 1] * dt * 60 + Math.cos(time * 0.5 + phases[i] * 1.3) * 0.00015;

        const dx = mx - pos[i3];
        const dy = my - pos[i3 + 1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.5) {
          const force = (0.5 - dist) / 0.5 * 0.0006;
          pos[i3] += dx * force;
          pos[i3 + 1] += dy * force;
        }

        if (pos[i3] > halfW) velocities[i2] -= 0.0002;
        if (pos[i3] < -halfW) velocities[i2] += 0.0002;
        if (pos[i3 + 1] > halfH) velocities[i2 + 1] -= 0.0002;
        if (pos[i3 + 1] < -halfH) velocities[i2 + 1] += 0.0002;
      }
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < COUNT; j++) {
          const j3 = j * 3;
          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST && dist > 0.01) {
            const li = lineIdx * 6;
            linePos[li] = pos[i3];
            linePos[li + 1] = pos[i3 + 1];
            linePos[li + 2] = 0;
            linePos[li + 3] = pos[j3];
            linePos[li + 4] = pos[j3 + 1];
            linePos[li + 5] = 0;
            lineIdx++;
          }
        }
      }

      const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      linePosAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIdx * 2);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const clock = new THREE.Clock();
    const raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      pointsMat.dispose();
      pointsGeo.dispose();
      lineMat.dispose();
      lineGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
