'use client';

import { useState, useEffect } from 'react';

export type NavTheme = 'default' | 'dark' | 'purple' | 'peach';

const sectionThemeMap: Array<{ id: string; theme: NavTheme }> = [
  { id: 'hero', theme: 'default' },
  { id: 'about', theme: 'default' },
  { id: 'skills', theme: 'dark' },
  { id: 'projects', theme: 'dark' },
  { id: 'ai-chat', theme: 'purple' },
  { id: 'contact', theme: 'peach' },
];

export function useNavTheme(): NavTheme {
  const [theme, setTheme] = useState<NavTheme>('default');

  useEffect(() => {
    function updateNavTheme() {
      const scrollY = window.scrollY + 80;
      let current: NavTheme = 'default';
      for (const s of sectionThemeMap) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) {
          current = s.theme;
        }
      }
      setTheme(current);
    }

    window.addEventListener('scroll', updateNavTheme, { passive: true });
    updateNavTheme();

    return () => window.removeEventListener('scroll', updateNavTheme);
  }, []);

  return theme;
}
