import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const body = await req.json();
  const { title, content, excerpt, coverImage, published, categoryIds, technologyIds } = body;

  if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  if (!content?.trim()) return NextResponse.json({ error: "Content is required" }, { status: 400 });

  const existing = await prisma.post.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const wasPublished = existing.published;
  const slug = generateSlug(title);

  try {
    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        title: title.trim(),
        slug,
        content,
        excerpt: excerpt?.trim() || null,
        coverImage: coverImage || null,
        published: !!published,
        publishedAt: published && !wasPublished ? new Date() : existing.publishedAt,
        categories: {
          deleteMany: {},
          create: (categoryIds ?? []).map((id: string) => ({ categoryId: id })),
        },
        technologies: {
          deleteMany: {},
          create: (technologyIds ?? []).map((id: string) => ({ technologyId: id })),
        },
      },
      include: {
        categories: { include: { category: true } },
        technologies: { include: { technology: true } },
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Slug conflict or invalid data" }, { status: 409 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
