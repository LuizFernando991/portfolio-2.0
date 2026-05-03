import type { ReactNode } from 'react';
import styles from './TerminalChrome.module.css';

interface TerminalChromeProps {
  title: string;
  command: string;
  prompt?: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalChrome({
  title,
  command,
  prompt = 'luiz@portfolio',
  children,
  className,
}: TerminalChromeProps) {
  return (
    <div className={className}>
      <div className={styles.top}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <strong className={styles.title}>{title}</strong>
      </div>

      <div className={styles.command}>
        <span className={styles.prompt}>{prompt}</span>
        <strong className={styles.input}>{command}</strong>
      </div>

      {children}
    </div>
  );
}
