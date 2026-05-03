import Link from 'next/link';
import type { BlogSearchParams } from '../blog-utils';
import { pageHref } from '../blog-utils';
import styles from '../page.module.css';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: BlogSearchParams;
  basePath?: string;
  labels: {
    next: string;
    page: string;
    previous: string;
  };
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function BlogPagination({
  currentPage,
  totalPages,
  searchParams,
  basePath = '/blog',
  labels,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label={labels.page}>
      <Link
        href={pageHref(currentPage - 1, searchParams, basePath)}
        scroll={false}
        className={cx(styles.pageButton, currentPage === 1 && styles.pageButtonDisabled)}
        aria-disabled={currentPage === 1}
      >
        {labels.previous}
      </Link>

      <div className={styles.pageNumbers}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <Link
              key={page}
              scroll={false}
              href={pageHref(page, searchParams, basePath)}
              className={cx(styles.pageNumber, page === currentPage && styles.pageNumberActive)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      <Link
        href={pageHref(currentPage + 1, searchParams, basePath)}
        scroll={false}
        className={cx(styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled)}
        aria-disabled={currentPage === totalPages}
      >
        {labels.next}
      </Link>
    </nav>
  );
}
