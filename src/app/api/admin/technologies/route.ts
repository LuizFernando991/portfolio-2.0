import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const technologies = await prisma.technology.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(technologies);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const body = await req.json();
  const { name } = body;
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const slug = generateSlug(name);

  try {
    const technology = await prisma.technology.create({ data: { name: name.trim(), slug } });
    return NextResponse.json(technology, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Technology already exists" }, { status: 409 });
  }
}
