import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import PostForm from "@/components/admin/PostForm/PostForm";
import { createPost } from "../actions";

export default async function NewPostPage() {
  const session = await requireAdminSession();

  const [categories, technologies] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <AdminShell email={session.user.email}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/admin/blog"
          style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#888" }}
        >
          ← Voltar para posts
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, marginTop: "0.5rem" }}>
          Novo post
        </h1>
      </div>
      <PostForm
        categories={categories}
        technologies={technologies}
        onSubmit={createPost}
      />
    </AdminShell>
  );
}
