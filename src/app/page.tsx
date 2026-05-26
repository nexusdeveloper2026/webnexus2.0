import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
