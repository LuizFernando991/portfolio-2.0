import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import TaxonomyManager from "@/components/admin/TaxonomyManager/TaxonomyManager";
import { createCategory, updateCategory, deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const session = await requireAdminSession();

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  const items = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    postCount: c._count.posts,
    createdAt: c.createdAt.toISOString(),
  }));

  return (
    <AdminShell email={session.user.email}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700 }}>
          Categorias
        </h1>
        <p style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          {categories.length} categoria{categories.length !== 1 ? "s" : ""}
        </p>
      </div>
      <TaxonomyManager
        initialItems={items}
        label="categoria"
        onCreate={createCategory}
        onUpdate={updateCategory}
        onDelete={deleteCategory}
      />
    </AdminShell>
  );
}
