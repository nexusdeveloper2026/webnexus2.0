"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

interface Particle {
  mesh: THREE.Sprite;
  velocity: THREE.Vector2;
  baseX: number;
  baseY: number;
  speed: number;
  opacity: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);
  const timelinesRef = useRef<gsap.core.Timeline[]>([]);

  const createGlowTexture = useCallback((size: number): THREE.CanvasTexture => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.1, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.3, "rgba(13, 110, 253, 0.4)");
    gradient.addColorStop(0.6, "rgba(13, 110, 253, 0.1)");
    gradient.addColorStop(1, "rgba(13, 110, 253, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const texture = createGlowTexture(128);
    const particleCount = 55;
    const particles: Particle[] = [];
    const timelines: gsap.core.Timeline[] = [];

    for (let i = 0; i < particleCount; i++) {
      const material = new THREE.SpriteMaterial({
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        opacity: 0,
        color: new THREE.Color().setHSL(0.58 + Math.random() * 0.08, 0.6, 0.5 + Math.random() * 0.3),
      });

      const sprite = new THREE.Sprite(material);
      const s = 0.02 + Math.random() * 0.05;
      sprite.scale.set(s, s, 1);
      sprite.position.x = (Math.random() - 0.5) * 1.8;
      sprite.position.y = (Math.random() - 0.5) * 1.8;

      scene.add(sprite);

      const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: Math.random() * 4 });

      tl.to(material, {
        opacity: 0.15 + Math.random() * 0.25,
        duration: 2 + Math.random() * 3,
        ease: "power1.inOut",
      }, 0);

      tl.to(sprite.scale, {
        x: s * (1.2 + Math.random() * 0.5),
        y: s * (1.2 + Math.random() * 0.5),
        duration: 3 + Math.random() * 3,
        ease: "sine.inOut",
      }, 0);

      const blurAmount = 2 + Math.random() * 4;
      const spriteAny = sprite as any;
      spriteAny._blur = blurAmount;

      timelines.push(tl);

      particles.push({
        mesh: sprite,
        velocity: new THREE.Vector2(
          (Math.random() - 0.5) * 0.0003,
          (Math.random() - 0.5) * 0.0003
        ),
        baseX: sprite.position.x,
        baseY: sprite.position.y,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0,
      });
    }

    particlesRef.current = particles;
    timelinesRef.current = timelines;

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    let time = 0;

    const animate = () => {
      time += 0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scroll = scrollRef.current;

      for (const p of particles) {
        p.mesh.position.x += p.velocity.x * p.speed;
        p.mesh.position.y += p.velocity.y * p.speed;

        const dx = p.mesh.position.x - (p.baseX + mx * 0.02);
        const dy = p.mesh.position.y - (p.baseY + my * 0.02 + scroll * 0.01);
        p.mesh.position.x += -dx * 0.002;
        p.mesh.position.y += -dy * 0.002;

        if (Math.abs(p.mesh.position.x) > 1.1) p.velocity.x *= -1;
        if (Math.abs(p.mesh.position.y) > 1.1) p.velocity.y *= -1;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      timelines.forEach((tl) => tl.kill());
      particles.forEach((p) => {
        p.mesh.material.dispose();
        scene.remove(p.mesh);
      });
      renderer.dispose();
    };
  }, [createGlowTexture]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, filter: "blur(1px)" }}
    />
  );
}
