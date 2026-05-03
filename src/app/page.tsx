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
import CommandPalette from '@/components/CommandPalette';
import ScrollRevealInit from './ScrollRevealInit';

export default function Page() {
  return (
    <>
      <CommandPalette />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <WaveDivider from="#e8e2ff" to="#101010" />
        <Skills />
        <WaveDivider from="#101010" to="#0e0e0e" flip />
        <Projects />
        <WaveDivider from="#0e0e0e" to="#7c5cbf" />
        <AiChat />
        <WaveDivider from="#7c5cbf" to="#fde8d4" flip />
        <Contact />
        <WaveDivider from="#fde8d4" to="#0e0e0e" />
        <Footer />
      </main>
      <ScrollRevealInit />
    </>
  );
}
