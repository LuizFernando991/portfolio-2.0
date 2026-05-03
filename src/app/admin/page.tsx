import { requireAdminSession } from "@/lib/admin-auth";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await requireAdminSession();
  return <AdminDashboard email={session.user.email} />;
}
