'use client';

import { useState } from 'react';
import { useNavTheme } from '@/hooks/useNavTheme';
import styles from './Nav.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'AI Chat', href: '#ai-chat' },
];

const themeClass: Record<string, string> = {
  default: '',
  dark: styles.themeDark,
  purple: styles.themePurple,
  peach: styles.themePeach,
};

export default function Nav() {
  const theme = useNavTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

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
              Contact →
            </a>
          </li>
        </ul>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
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
          Contact
        </a>
      </div>
    </>
  );
}
