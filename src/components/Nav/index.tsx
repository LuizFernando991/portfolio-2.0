'use client';

import { useState } from 'react';
import { useNavTheme } from '@/hooks/useNavTheme';
import { useI18n } from '@/lib/i18n-context';
import type { Locale } from '@/lib/i18n';
import styles from './Nav.module.css';

const themeClass: Record<string, string> = {
  default: '',
  dark: styles.themeDark,
  purple: styles.themePurple,
  peach: styles.themePeach,
};

export default function Nav() {
  const theme = useNavTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const closeMenu = () => setMenuOpen(false);
  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.aiChat, href: '#ai-chat' },
  ];
  const localeOptions: Locale[] = ['pt-BR', 'en-US'];

  return (
    <>
      <nav className={`${styles.nav} ${themeClass[theme] ?? ''}`}>
        <div className={styles.logo}>
          LF<span>.</span>dev
        </div>

        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className={styles.cta}>
              {t.nav.contact} →
            </a>
          </li>
        </ul>

        <div className={styles.localeSwitch} aria-label={t.nav.language}>
          {localeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={locale === option ? styles.localeActive : ''}
              onClick={() => setLocale(option)}
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

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className={styles.mobileLink} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
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
                setLocale(option);
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
