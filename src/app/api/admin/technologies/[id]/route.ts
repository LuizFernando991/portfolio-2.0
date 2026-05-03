import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const body = await req.json();
  const { name } = body;
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  try {
    const technology = await prisma.technology.update({
      where: { id: params.id },
      data: { name: name.trim(), slug: generateSlug(name) },
    });
    return NextResponse.json(technology);
  } catch {
    return NextResponse.json({ error: "Not found or duplicate" }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  try {
    await prisma.technology.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
