import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import PostForm from "@/components/admin/PostForm/PostForm";
import { updatePost } from "../../actions";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const session = await requireAdminSession();

  const [post, categories, technologies] = await Promise.all([
    prisma.post.findUnique({
      where: { id: params.id },
      include: {
        categories: true,
        technologies: true,
      },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.technology.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  const initialData = {
    title: post.title,
    slug: post.slug,
    titleEn: post.titleEn ?? "",
    slugEn: post.slugEn ?? "",
    excerpt: post.excerpt ?? "",
    excerptEn: post.excerptEn ?? "",
    content: post.content,
    contentEn: post.contentEn ?? "",
    coverImage: post.coverImage ?? "",
    published: post.published,
    featured: post.featured,
    categoryIds: post.categories.map((c) => c.categoryId),
    technologyIds: post.technologies.map((t) => t.technologyId),
  };

  const updatePostById = updatePost.bind(null, params.id);

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
          Editar post
        </h1>
        <p style={{ color: "#888", fontFamily: "var(--font-mono)", fontSize: "0.8rem", marginTop: "0.25rem" }}>
          /{post.slug}
        </p>
      </div>
      <PostForm
        postId={params.id}
        initialData={initialData}
        categories={categories}
        technologies={technologies}
        onSubmit={updatePostById}
      />
    </AdminShell>
  );
}
