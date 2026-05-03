'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import type { BlogSearchParams, Taxonomy } from '../blog-utils';
import { filterHref, firstValue, searchHref, toList } from '../blog-utils';
import styles from '../page.module.css';

interface BlogFiltersProps {
  categories: Taxonomy[];
  technologies: Taxonomy[];
  searchParams?: BlogSearchParams;
  basePath?: string;
  labels: {
    all: string;
    categories: string;
    clear: string;
    search: string;
    searchButton: string;
    searchPlaceholder: string;
    technologies: string;
  };
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function SearchFilter({
  activeCategories,
  activeTechnologies,
  searchParams,
  basePath = '/blog',
  labels,
}: {
  activeCategories: string[];
  activeTechnologies: string[];
  searchParams?: BlogSearchParams;
  basePath?: string;
  labels: BlogFiltersProps['labels'];
}) {
  const router = useRouter();
  const searchQuery = firstValue(searchParams?.q) ?? '';

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get('q') ?? '');
    router.push(searchHref(nextQuery, searchParams, basePath), { scroll: false });
  }

  return (
    <div className={styles.filterGroup}>
      <h2 className={styles.filterTitle}>{labels.search}</h2>
      <form className={styles.blogSearch} action={basePath} onSubmit={handleSearchSubmit}>
        {activeCategories.map((category) => (
          <input key={category} type="hidden" name="category" value={category} />
        ))}
        {activeTechnologies.map((technology) => (
          <input key={technology} type="hidden" name="technology" value={technology} />
        ))}
        <input
          className={styles.blogSearchInput}
          type="search"
          name="q"
          defaultValue={searchQuery}
          placeholder={labels.searchPlaceholder}
          aria-label={labels.search}
        />
        <button className={styles.blogSearchButton} type="submit">
          {labels.searchButton}
        </button>
        {searchQuery && (
          <Link
            href={searchHref('', searchParams, basePath)}
            scroll={false}
            className={styles.blogSearchClear}
          >
            {labels.clear}
          </Link>
        )}
      </form>
    </div>
  );
}

function TaxonomyFilter({
  title,
  type,
  items,
  activeItems,
  allLabel,
  searchParams,
  basePath = '/blog',
}: {
  title: string;
  type: 'category' | 'technology';
  items: Taxonomy[];
  activeItems: string[];
  allLabel: string;
  searchParams?: BlogSearchParams;
  basePath?: string;
}) {
  return (
    <div className={styles.filterGroup}>
      <h2 className={styles.filterTitle}>{title}</h2>
      <div className={styles.filterList}>
        <Link
          href={filterHref(type, undefined, searchParams, basePath)}
          scroll={false}
          className={cx(styles.filterLink, activeItems.length === 0 && styles.filterActive)}
        >
          {allLabel}
        </Link>
        {items.map((item) => (
          <Link
            key={item.id}
            href={filterHref(type, item.slug, searchParams, basePath)}
            scroll={false}
            className={cx(
              styles.filterLink,
              activeItems.includes(item.slug) && styles.filterActive
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function BlogFilters({
  categories,
  technologies,
  searchParams,
  basePath = '/blog',
  labels,
}: BlogFiltersProps) {
  const activeCategories = toList(searchParams?.category);
  const activeTechnologies = toList(searchParams?.technology);

  return (
    <aside className={styles.filters} aria-label={labels.categories}>
      <SearchFilter
        activeCategories={activeCategories}
        activeTechnologies={activeTechnologies}
        searchParams={searchParams}
        basePath={basePath}
        labels={labels}
      />

      <TaxonomyFilter
        title={labels.categories}
        type="category"
        items={categories}
        activeItems={activeCategories}
        allLabel={labels.all}
        searchParams={searchParams}
        basePath={basePath}
      />

      <TaxonomyFilter
        title={labels.technologies}
        type="technology"
        items={technologies}
        activeItems={activeTechnologies}
        allLabel={labels.all}
        searchParams={searchParams}
        basePath={basePath}
      />
    </aside>
  );
}
