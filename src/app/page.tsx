import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import WaveDivider from '@/components/WaveDivider';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import AiChat from '@/components/AiChat';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollRevealInit from './ScrollRevealInit';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero: --white bg */}
        <Hero />
        {/* Marquee: #0e0e0e bg (no wave — abuts directly) */}
        <Marquee />
        {/* About: var(--purple-bg) */}
        <About />
        {/* Wave: purple-bg → dark for Skills */}
        <WaveDivider from="#e8e2ff" to="#0e0e0e" />
        {/* Skills: #0e0e0e bg */}
        <Skills />
        <Projects />
        {/* Wave: black → purple for AiChat */}
        <WaveDivider from="#0e0e0e" to="#7c5cbf" />
        {/* AiChat: --purple bg */}
        <AiChat />
        {/* Wave: purple → peach-light for Contact */}
        <WaveDivider from="#7c5cbf" to="#fde8d4" />
        {/* Contact: --peach-light bg */}
        <Contact />
        {/* Footer: --black bg (no wave, just border-top) */}
        <Footer />
      </main>
      <ScrollRevealInit />
    </>
  );
}
