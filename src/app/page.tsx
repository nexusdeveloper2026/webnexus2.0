import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoPopup from "@/components/VideoPopup";
import Footer from "@/components/Footer";

// Lazy-loaded components (not critical for initial first paint)
const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), {
  loading: () => <div className="h-screen w-full" />
});
const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="h-96 w-full bg-white/5 animate-pulse rounded-2xl" />
});
const Services = dynamic(() => import("@/components/Services"), {
  loading: () => <div className="h-[600px] w-full bg-white/5 animate-pulse rounded-2xl" />
});
const VenezuelaMap = dynamic(() => import("@/components/VenezuelaMap"), {
  loading: () => <div className="h-[500px] w-full bg-white/5 animate-pulse rounded-2xl" />
});
const Technologies = dynamic(() => import("@/components/Technologies"), {
  loading: () => <div className="h-80 w-full bg-white/5 animate-pulse rounded-2xl" />
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="h-80 w-full bg-white/5 animate-pulse rounded-2xl" />
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="h-[500px] w-full bg-white/5 animate-pulse rounded-2xl" />
});

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main className="relative">
        <VideoPopup />
        <Hero />
        <About />
        <Services />
        <VenezuelaMap />
        <Technologies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
