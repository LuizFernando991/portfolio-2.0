'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNavTheme } from '@/hooks/useNavTheme';
import { useI18n } from '@/lib/i18n-context';
import type { Locale } from '@/lib/i18n';
import { localizedPath } from '@/lib/seo';
import styles from './Nav.module.css';

const themeClass: Record<string, string> = {
  default: '',
  dark: styles.themeDark,
  purple: styles.themePurple,
  peach: styles.themePeach,
};

export default function Nav() {
  const theme = useNavTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const closeMenu = () => setMenuOpen(false);
  const homePath = localizedPath('/', locale);
  const blogPath = localizedPath('/blog', locale);
  const navLinks = [
    { label: t.nav.about, href: `${homePath}#about` },
    { label: t.nav.skills, href: `${homePath}#skills` },
    { label: t.nav.projects, href: `${homePath}#projects` },
    { label: t.nav.blog, href: blogPath },
    { label: t.nav.aiChat, href: `${homePath}#ai-chat` },
  ];
  const localeOptions: Locale[] = ['pt-BR', 'en-US'];
  const switchLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);

    if (pathname === '/' || pathname === '/pt' || pathname === '/en') {
      router.push(localizedPath('/', nextLocale));
      return;
    }

    if (pathname === '/blog' || pathname === '/pt/blog' || pathname === '/en/blog') {
      router.push(localizedPath('/blog', nextLocale));
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${themeClass[theme] ?? ''}`}>
        <a href={homePath} className={styles.logo}>
          LF<span className={styles.cursor}>_</span>
        </a>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`${homePath}#contact`} className={styles.cta}>
              {t.nav.contact} →
            </a>
          </li>
        </ul>

        <button
          className={styles.paletteBtn}
          onClick={() => document.dispatchEvent(new CustomEvent('palette:open'))}
          aria-label="Open command palette"
          title="Ctrl+K"
        >
          <span>Ctrl</span>+K
        </button>

        <div className={styles.localeSwitch} aria-label={t.nav.language}>
          {localeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={locale === option ? styles.localeActive : ''}
              onClick={() => switchLocale(option)}
            >
              {option === 'pt-BR' ? 'PT' : 'EN'}
            </button>
          ))}
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={t.nav.menu}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''} ${themeClass[theme] ?? ''}`}
      >
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className={styles.mobileLink} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a
          href={`${homePath}#contact`}
          className={`${styles.mobileLink} ${styles.mobileCta}`}
          onClick={closeMenu}
        >
          {t.nav.contact}
        </a>
        <div className={styles.mobileLocaleSwitch} aria-label={t.nav.language}>
          {localeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={locale === option ? styles.localeActive : ''}
              onClick={() => {
                switchLocale(option);
                closeMenu();
              }}
            >
              {option === 'pt-BR' ? 'PT-BR' : 'EN-US'}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
