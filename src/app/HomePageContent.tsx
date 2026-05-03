import type { ComponentProps } from 'react';
import type { Locale } from '@/lib/i18n';
import { I18nProvider } from '@/lib/i18n-context';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import WaveDivider from '@/components/WaveDivider';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import BlogTeaser from '@/components/BlogTeaser';
import AiChat from '@/components/AiChat';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import ScrollRevealInit from './ScrollRevealInit';

interface HomePageContentProps {
  locale?: Locale;
  posts: ComponentProps<typeof BlogTeaser>['posts'];
}

export default function HomePageContent({ locale = 'pt-BR', posts }: HomePageContentProps) {
  return (
    <I18nProvider initialLocale={locale}>
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
        <WaveDivider from="#0e0e0e" to="#faf9ff" />
        <BlogTeaser posts={posts} />
        <WaveDivider from="#faf9ff" to="#7c5cbf" flip />
        <AiChat />
        <WaveDivider from="#7c5cbf" to="#fde8d4" flip />
        <Contact />
        <WaveDivider from="#fde8d4" to="#0e0e0e" />
        <Footer />
      </main>
      <ScrollRevealInit />
    </I18nProvider>
  );
}
