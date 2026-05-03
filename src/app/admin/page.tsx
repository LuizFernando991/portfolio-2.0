import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session) {
    redirect("/admin/login");
  }

  return <AdminDashboard email={session.user.email} />;
}
