"use server";

import { getAdminSessionForApi } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { revalidatePath } from "next/cache";

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { error: string };

async function assertAdmin(): Promise<{ error: string } | null> {
  const session = await getAdminSessionForApi();
  if (!session) return { error: "Não autorizado" };
  return null;
}

export async function createTechnology(
  name: string
): Promise<ActionResult<{ id: string; name: string; slug: string }>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  if (!name?.trim()) return { error: "Nome é obrigatório" };

  try {
    const technology = await prisma.technology.create({
      data: { name: name.trim(), slug: generateSlug(name) },
    });
    revalidatePath("/admin/technologies");
    return { success: true, data: technology };
  } catch {
    return { error: "Tecnologia já existe" };
  }
}

export async function updateTechnology(
  id: string,
  name: string
): Promise<ActionResult<{ id: string; name: string; slug: string }>> {
  const authError = await assertAdmin();
  if (authError) return authError;

  if (!name?.trim()) return { error: "Nome é obrigatório" };

  try {
    const technology = await prisma.technology.update({
      where: { id },
      data: { name: name.trim(), slug: generateSlug(name) },
    });
    revalidatePath("/admin/technologies");
    return { success: true, data: technology };
  } catch {
    return { error: "Não encontrado ou nome duplicado" };
  }
}

export async function deleteTechnology(id: string): Promise<ActionResult> {
  const authError = await assertAdmin();
  if (authError) return authError;

  try {
    await prisma.technology.delete({ where: { id } });
    revalidatePath("/admin/technologies");
    return { success: true };
  } catch {
    return { error: "Não encontrado" };
  }
}
