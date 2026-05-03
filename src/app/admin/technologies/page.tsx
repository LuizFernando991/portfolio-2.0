import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import TaxonomyManager from "@/components/admin/TaxonomyManager/TaxonomyManager";
import { createTechnology, updateTechnology, deleteTechnology } from "./actions";

export default async function TechnologiesPage() {
  const session = await requireAdminSession();

  const technologies = await prisma.technology.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  const items = technologies.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    postCount: t._count.posts,
    createdAt: t.createdAt.toISOString(),
  }));

  return (
    <AdminShell email={session.user.email}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700 }}>
          Tecnologias
        </h1>
        <p style={{ color: "#666", marginTop: "0.25rem", fontSize: "0.9rem" }}>
          {technologies.length} tecnologia{technologies.length !== 1 ? "s" : ""}
        </p>
      </div>
      <TaxonomyManager
        initialItems={items}
        label="tecnologia"
        onCreate={createTechnology}
        onUpdate={updateTechnology}
        onDelete={deleteTechnology}
      />
    </AdminShell>
  );
}
