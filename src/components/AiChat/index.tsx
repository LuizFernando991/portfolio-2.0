'use client';

import ChatWidget from './ChatWidget';
import { useI18n } from '@/lib/i18n-context';
import styles from './AiChat.module.css';

export default function AiChat() {
  const { t } = useI18n();

  return (
    <section id="ai-chat" className={styles.aiChat}>
      <div className={styles.inner}>
        {/* Left */}
        <div className="ai-left reveal">
          <div className={`tag ${styles.aiTag}`}>{t.aiChat.tag}</div>
          <h2 className={styles.title}>{t.aiChat.title}</h2>
          <p className={styles.desc}>{t.aiChat.description}</p>
        </div>

        {/* Right */}
        <div className="ai-right reveal">
          <ChatWidget />
        </div>
      </div>
    </section>
  );
}
