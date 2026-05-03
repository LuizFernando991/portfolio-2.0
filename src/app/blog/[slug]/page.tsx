import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { translations } from '@/lib/i18n';
import PostPageContent from './PostPageContent';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: translations['pt-BR'].blog.notFoundTitle,
    };
  }

  return {
    title: `${post.title} | Luiz Fernando`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) notFound();

  return (
    <PostPageContent
      post={{
        ...post,
        createdAt: post.createdAt.toISOString(),
        publishedAt: post.publishedAt?.toISOString() ?? null,
      }}
    />
  );
}
