import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/slug";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const body = await req.json();
  const { name } = body;
  if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const slug = generateSlug(name);

  try {
    const category = await prisma.category.create({ data: { name: name.trim(), slug } });
    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Category already exists" }, { status: 409 });
  }
}
