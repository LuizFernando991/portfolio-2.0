"use server";

import { getAdminSessionForApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { revalidatePath } from "next/cache";

export interface PostActionData {
  title: string;
  slug: string;
  titleEn?: string;
  slugEn?: string;
  excerpt?: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  coverImage?: string;
  published: boolean;
  featured: boolean;
  categoryIds: string[];
  technologyIds: string[];
}

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { error: string };

async function assertAdmin(): Promise<{ error: string } | null> {
  const session = await getAdminSessionForApi();
  if (!session) return { error: "Não autorizado" };
  return null;
}

export async function createPost(data: PostActionData): Promise<ActionResult<{ id: string }>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  const {
    title,
    slug,
    titleEn,
    slugEn,
    content,
    contentEn,
    excerpt,
    excerptEn,
    coverImage,
    published,
    featured,
    categoryIds,
    technologyIds,
  } = data;
  if (!title?.trim()) return { error: "Título é obrigatório" };
  if (!slug?.trim()) return { error: "Slug é obrigatório" };
  if (!content?.trim()) return { error: "Conteúdo é obrigatório" };

  const normalizedSlug = generateSlug(slug);
  const normalizedSlugEn = slugEn?.trim() ? generateSlug(slugEn) : null;

  try {
    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        slug: normalizedSlug,
        titleEn: titleEn?.trim() || null,
        slugEn: normalizedSlugEn,
        content,
        contentEn: contentEn?.trim() || null,
        excerpt: excerpt?.trim() || null,
        excerptEn: excerptEn?.trim() || null,
        coverImage: coverImage || null,
        published,
        featured,
        publishedAt: published ? new Date() : null,
        categories: { create: categoryIds.map((id) => ({ categoryId: id })) },
        technologies: { create: technologyIds.map((id) => ({ technologyId: id })) },
      },
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, data: { id: post.id } };
  } catch {
    return { error: "Slug já existe ou dados inválidos" };
  }
}

export async function updatePost(
  id: string,
  data: PostActionData
): Promise<ActionResult> {
  const authError = await assertAdmin();
  if (authError) return authError;

  const {
    title,
    slug,
    titleEn,
    slugEn,
    content,
    contentEn,
    excerpt,
    excerptEn,
    coverImage,
    published,
    featured,
    categoryIds,
    technologyIds,
  } = data;
  if (!title?.trim()) return { error: "Título é obrigatório" };
  if (!slug?.trim()) return { error: "Slug é obrigatório" };
  if (!content?.trim()) return { error: "Conteúdo é obrigatório" };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { error: "Post não encontrado" };

  const normalizedSlug = generateSlug(slug);
  const normalizedSlugEn = slugEn?.trim() ? generateSlug(slugEn) : null;

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title: title.trim(),
        slug: normalizedSlug,
        titleEn: titleEn?.trim() || null,
        slugEn: normalizedSlugEn,
        content,
        contentEn: contentEn?.trim() || null,
        excerpt: excerpt?.trim() || null,
        excerptEn: excerptEn?.trim() || null,
        coverImage: coverImage || null,
        published,
        featured,
        publishedAt: published && !existing.published ? new Date() : existing.publishedAt,
        categories: { deleteMany: {}, create: categoryIds.map((id) => ({ categoryId: id })) },
        technologies: { deleteMany: {}, create: technologyIds.map((id) => ({ technologyId: id })) },
      },
    });
    revalidatePath("/admin/blog");
    revalidatePath(`/admin/blog/${id}/edit`);
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    if (existing.slugEn) revalidatePath(`/blog/${existing.slugEn}`);
    revalidatePath(`/blog/${normalizedSlug}`);
    if (normalizedSlugEn) revalidatePath(`/blog/${normalizedSlugEn}`);
    return { success: true };
  } catch {
    return { error: "Conflito de slug ou dados inválidos" };
  }
}

export async function deletePost(id: string): Promise<ActionResult> {
  const authError = await assertAdmin();
  if (authError) return authError;

  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch {
    return { error: "Post não encontrado" };
  }
}

export async function uploadMedia(formData: FormData): Promise<ActionResult<{ url: string }>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  const file = formData.get("file") as File | null;
  if (!file) return { error: "Nenhum arquivo enviado" };

  const { supabaseAdmin, MEDIA_BUCKET } = await import("@/lib/supabase");

  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabaseAdmin.storage
    .from(MEDIA_BUCKET)
    .upload(filename, bytes, { contentType: file.type, upsert: false });

  if (error) return { error: error.message };

  const { data } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(filename);
  return { success: true, data: { url: data.publicUrl } };
}

export async function listMedia(): Promise<ActionResult<{ name: string; url: string }[]>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  const { supabaseAdmin, MEDIA_BUCKET } = await import("@/lib/supabase");

  const { data, error } = await supabaseAdmin.storage.from(MEDIA_BUCKET).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) return { error: error.message };

  const files = (data ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      name: f.name,
      url: supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(f.name).data.publicUrl,
    }));

  return { success: true, data: files };
}
