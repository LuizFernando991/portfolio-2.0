'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deletePost } from './actions';
import styles from './BlogPostsList.module.css';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  published: boolean;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  categories: { category: { id: string; name: string } }[];
  technologies: { technology: { id: string; name: string } }[];
}

const POSTS_PER_PAGE = 8;

export default function BlogPostsList({ initialPosts }: { initialPosts: Post[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return posts;

    return posts.filter((post) => {
      const searchable = [
        post.title,
        post.slug,
        post.excerpt ?? '',
        post.published ? 'publicado published' : 'rascunho draft',
        post.featured ? 'destaque featured' : '',
        ...post.categories.map(({ category }) => category.name),
        ...post.technologies.map(({ technology }) => technology.name),
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [posts, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE
  );

  async function handleDelete(id: string) {
    if (!confirm('Tem certeza que deseja excluir este post?')) return;
    setDeletingId(id);
    const result = await deletePost(id);
    if ('error' in result) {
      alert(result.error);
      setDeletingId(null);
      return;
    }
    setPosts((p) => p.filter((post) => post.id !== id));
    setDeletingId(null);
    router.refresh();
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    setCurrentPage(1);
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
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder="Buscar por título, slug, categoria ou tecnologia..."
            aria-label="Buscar posts"
          />
          {query && (
            <button
              type="button"
              className={styles.clearSearch}
              onClick={() => handleQueryChange('')}
            >
              Limpar
            </button>
          )}
        </div>
        <div className={styles.summary}>
          {filteredPosts.length} de {posts.length} post{posts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className={styles.emptySearch}>
          Nenhum post encontrado para “{query}”.
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {paginatedPosts.map((post) => (
              <div key={post.id} className={styles.row}>
                {post.coverImage && (
                  <div className={styles.thumb}>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  </div>
                )}
                <div className={styles.info}>
                  <div className={styles.titleRow}>
                    <span className={styles.title}>{post.title}</span>
                    <span className={post.published ? styles.badgePublished : styles.badgeDraft}>
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                    {post.featured && <span className={styles.badgeFeatured}>Destaque</span>}
                  </div>
                  <span className={styles.slug}>/{post.slug}</span>
                  {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                  <div className={styles.tags}>
                    {post.categories.map(({ category }) => (
                      <span key={category.id} className={styles.tagCategory}>
                        {category.name}
                      </span>
                    ))}
                    {post.technologies.map(({ technology }) => (
                      <span key={technology.id} className={styles.tagTech}>
                        {technology.name}
                      </span>
                    ))}
                  </div>
                  <span className={styles.date}>
                    Criado em {new Date(post.createdAt).toLocaleDateString('pt-BR')}
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
                    {deletingId === post.id ? '...' : 'Excluir'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safePage === 1}
              >
                ← Anterior
              </button>

              <div className={styles.pageNumbers}>
                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      className={`${styles.pageNumber} ${
                        page === safePage ? styles.pageNumberActive : ''
                      }`}
                      onClick={() => setCurrentPage(page)}
                      aria-current={page === safePage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className={styles.pageBtn}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={safePage === totalPages}
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
