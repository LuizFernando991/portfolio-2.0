'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { type Locale, type Translation, locales, translations } from './i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const STORAGE_KEY = 'portfolio-locale';
const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function I18nProvider({
  children,
  initialLocale = 'pt-BR',
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (initialLocale !== 'pt-BR') {
      setLocaleState(initialLocale);
      window.localStorage.setItem(STORAGE_KEY, initialLocale);
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      return;
    }

    const browserLocale = window.navigator.language === 'en-US' ? 'en-US' : 'pt-BR';
    setLocaleState(browserLocale);
  }, [initialLocale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
    const cookieValue = nextLocale === 'en-US' ? 'en' : 'pt';
    document.cookie = `NEXT_LOCALE=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider');
  }

  return context;
}
