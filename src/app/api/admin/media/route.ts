import { getAdminSessionForApi, unauthorized } from "@/lib/admin-auth";
import { supabaseAdmin, MEDIA_BUCKET } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getAdminSessionForApi();
  if (!session) return unauthorized();

  const { data, error } = await supabaseAdmin.storage.from(MEDIA_BUCKET).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const files = (data ?? [])
    .filter((f) => f.name !== ".emptyFolderPlaceholder")
    .map((f) => ({
      name: f.name,
      url: supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(f.name).data.publicUrl,
    }));

  return NextResponse.json(files);
}
