import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const body = await req.json();
  const { title, content, excerpt, coverImage, published, categoryIds, technologyIds } = body;

  if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  if (!content?.trim()) return NextResponse.json({ error: "Content is required" }, { status: 400 });

  const slug = generateSlug(title);

  try {
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug,
        content,
        excerpt: excerpt?.trim() || null,
        coverImage: coverImage || null,
        published: !!published,
        publishedAt: published ? new Date() : null,
        categories: {
          create: (categoryIds ?? []).map((id: string) => ({ categoryId: id })),
        },
        technologies: {
          create: (technologyIds ?? []).map((id: string) => ({ technologyId: id })),
        },
      },
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug already exists or invalid data" }, { status: 409 });
  }
}
