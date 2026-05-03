import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import BlogPostsList from "./BlogPostsList";

export default async function AdminBlogPage() {
  const session = await requireAdminSession();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      categories: { include: { category: true } },
      technologies: { include: { technology: true } },
    },
  });

  const serialized = posts.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    publishedAt: p.publishedAt?.toISOString() ?? null,
  }));

  return (
    <AdminShell email={session.user.email}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700 }}>Posts</h1>
          <p style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.9rem" }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/admin/blog/new" className="btn btn-purple">
          + Novo post
        </Link>
      </div>
      <BlogPostsList initialPosts={serialized} />
    </AdminShell>
  );
}
