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
import { prisma } from '@/lib/prisma';
import ScrollRevealInit from './ScrollRevealInit';

export default async function Page() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      titleEn: true,
      slugEn: true,
      excerpt: true,
      excerptEn: true,
      content: true,
      contentEn: true,
      coverImage: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  const serializedPosts = posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    publishedAt: post.publishedAt?.toISOString() ?? null,
  }));

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
        <WaveDivider from="#0e0e0e" to="#faf9ff" />
        <BlogTeaser posts={serializedPosts} />
        <WaveDivider from="#faf9ff" to="#7c5cbf" flip />
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
