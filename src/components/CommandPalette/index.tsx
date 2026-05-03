'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { localizedPath } from '@/lib/seo';
import styles from './CommandPalette.module.css';

interface Command {
  id: string;
  label: string;
  category: string;
  icon: string;
  action: () => void;
}

const GITHUB = 'https://github.com/LuizFernando991';
const LINKEDIN = 'https://www.linkedin.com/in/lfernandor991/';
const WHATSAPP_NUMBER = '5537991701381';

export default function CommandPalette() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const goto = useCallback(
    (href: string) => {
      close();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        window.location.href = `${localizedPath('/', locale)}${href}`;
      }, 50);
    },
    [close, locale]
  );

  const openLink = useCallback(
    (url: string) => {
      close();
      window.open(url, '_blank', 'noopener,noreferrer');
    },
    [close]
  );

  const commands: Command[] = [
    {
      id: 'about',
      label: `${t.palette.goTo} ${t.nav.about}`,
      category: t.palette.navigate,
      icon: '→',
      action: () => goto('#about'),
    },
    {
      id: 'skills',
      label: `${t.palette.goTo} ${t.nav.skills}`,
      category: t.palette.navigate,
      icon: '→',
      action: () => goto('#skills'),
    },
    {
      id: 'projects',
      label: `${t.palette.goTo} ${t.nav.projects}`,
      category: t.palette.navigate,
      icon: '→',
      action: () => goto('#projects'),
    },
    {
      id: 'blog',
      label: `${t.palette.goTo} ${t.nav.blog}`,
      category: t.palette.navigate,
      icon: '→',
      action: () => {
        close();
        window.location.href = localizedPath('/blog', locale);
      },
    },
    {
      id: 'ai-chat',
      label: `${t.palette.goTo} ${t.nav.aiChat}`,
      category: t.palette.navigate,
      icon: '→',
      action: () => goto('#ai-chat'),
    },
    {
      id: 'contact',
      label: `${t.palette.goTo} ${t.nav.contact}`,
      category: t.palette.navigate,
      icon: '→',
      action: () => goto('#contact'),
    },
    {
      id: 'github',
      label: t.palette.openGithub,
      category: t.palette.links,
      icon: '↗',
      action: () => openLink(GITHUB),
    },
    {
      id: 'linkedin',
      label: t.palette.openLinkedin,
      category: t.palette.links,
      icon: '↗',
      action: () => openLink(LINKEDIN),
    },
    {
      id: 'whatsapp',
      label: t.palette.openWhatsapp,
      category: t.palette.links,
      icon: '↗',
      action: () =>
        openLink(
          `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.contact.whatsappText)}`
        ),
    },
  ];

  const filtered = query.trim()
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const categories = Array.from(new Set(filtered.map((c) => c.category)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery('');
        setActive(0);
      }
    };
    const onOpen = () => {
      setOpen(true);
      setQuery('');
      setActive(0);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('palette:open', onOpen);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('palette:open', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      filtered[active]?.action();
    }
  };

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className={styles.inputWrap}>
          <span className={styles.inputIcon}>⌘</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={t.palette.placeholder}
            aria-label={t.palette.placeholder}
          />
          <kbd className={styles.escKbd}>ESC</kbd>
        </div>

        <div className={styles.list} role="listbox">
          {categories.map((cat) => (
            <div key={cat}>
              <div className={styles.categoryLabel}>{cat}</div>
              {filtered
                .filter((c) => c.category === cat)
                .map((cmd) => {
                  const idx = filtered.indexOf(cmd);
                  return (
                    <button
                      key={cmd.id}
                      role="option"
                      aria-selected={idx === active}
                      className={`${styles.item} ${idx === active ? styles.itemActive : ''}`}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setActive(idx)}
                    >
                      <span className={styles.itemIcon}>{cmd.icon}</span>
                      <span className={styles.itemLabel}>{cmd.label}</span>
                    </button>
                  );
                })}
            </div>
          ))}
          {filtered.length === 0 && <div className={styles.empty}>Nenhum resultado.</div>}
        </div>

        <div className={styles.footer}>
          <span>
            <kbd>↑↓</kbd> navegar
          </span>
          <span>
            <kbd>↵</kbd> selecionar
          </span>
          <span>
            <kbd>ESC</kbd> fechar
          </span>
        </div>
      </div>
    </div>
  );
}
