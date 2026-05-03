import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const bytes = await file.arrayBuffer();

  const { error } = await supabaseAdmin.storage
    .from(MEDIA_BUCKET)
    .upload(filename, bytes, { contentType: file.type, upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data } = supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(filename);

  return NextResponse.json({ url: data.publicUrl, name: filename });
}
