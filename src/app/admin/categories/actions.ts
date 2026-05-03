"use server";

import { getAdminSessionForApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { revalidatePath } from "next/cache";
import { revalidateCategoryCache } from "@/lib/revalidate";

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { error: string };

async function assertAdmin(): Promise<{ error: string } | null> {
  const session = await getAdminSessionForApi();
  if (!session) return { error: "Não autorizado" };
  return null;
}

export async function createCategory(
  name: string
): Promise<ActionResult<{ id: string; name: string; slug: string }>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  if (!name?.trim()) return { error: "Nome é obrigatório" };

  try {
    const category = await prisma.category.create({
      data: { name: name.trim(), slug: generateSlug(name) },
    });
    revalidatePath("/admin/categories");
    revalidateCategoryCache();
    return { success: true, data: category };
  } catch {
    return { error: "Categoria já existe" };
  }
}

export async function updateCategory(
  id: string,
  name: string
): Promise<ActionResult<{ id: string; name: string; slug: string }>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  if (!name?.trim()) return { error: "Nome é obrigatório" };

  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name: name.trim(), slug: generateSlug(name) },
    });
    revalidatePath("/admin/categories");
    revalidateCategoryCache();
    return { success: true, data: category };
  } catch {
    return { error: "Não encontrado ou nome duplicado" };
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  const authError = await assertAdmin();
  if (authError) return authError;

  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    revalidateCategoryCache();
    return { success: true };
  } catch {
    return { error: "Não encontrado" };
  }
}
