'use client';

import { useI18n } from '@/lib/i18n-context';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.logo}>
        LF<span>.dev</span>
      </div>
      <div className={styles.copy}>{t.footer.copy}</div>
    </footer>
  );
}
