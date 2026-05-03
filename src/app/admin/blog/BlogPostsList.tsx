"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deletePost } from "./actions";
import styles from "./BlogPostsList.module.css";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  categories: { category: { id: string; name: string } }[];
  technologies: { technology: { id: string; name: string } }[];
}

export default function BlogPostsList({ initialPosts }: { initialPosts: Post[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    setDeletingId(id);
    const result = await deletePost(id);
    if ("error" in result) {
      alert(result.error);
      setDeletingId(null);
      return;
    }
    setPosts((p) => p.filter((post) => post.id !== id));
    setDeletingId(null);
    router.refresh();
  }

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Nenhum post ainda.</p>
        <Link href="/admin/blog/new" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Criar primeiro post
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <div key={post.id} className={styles.row}>
          {post.coverImage && (
            <div className={styles.thumb}>
              <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} unoptimized />
            </div>
          )}
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <span className={styles.title}>{post.title}</span>
              <span className={post.published ? styles.badgePublished : styles.badgeDraft}>
                {post.published ? "Publicado" : "Rascunho"}
              </span>
            </div>
            <span className={styles.slug}>/{post.slug}</span>
            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
            <div className={styles.tags}>
              {post.categories.map(({ category }) => (
                <span key={category.id} className={styles.tagCategory}>{category.name}</span>
              ))}
              {post.technologies.map(({ technology }) => (
                <span key={technology.id} className={styles.tagTech}>{technology.name}</span>
              ))}
            </div>
            <span className={styles.date}>
              Criado em {new Date(post.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
          <div className={styles.actions}>
            <Link href={`/admin/blog/${post.id}/edit`} className={styles.editBtn}>
              Editar
            </Link>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
            >
              {deletingId === post.id ? "..." : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
