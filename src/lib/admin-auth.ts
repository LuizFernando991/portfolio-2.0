import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function requireAdminSession() {
  try {
    const session = await auth.api.getSession({ headers: headers() });
    if (!session) redirect("/admin/login");
    return session;
  } catch {
    redirect("/admin/login");
  }
}

export async function getAdminSessionForApi() {
  try {
    const session = await auth.api.getSession({ headers: headers() });
    return session ?? null;
  } catch {
    return null;
  }
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
