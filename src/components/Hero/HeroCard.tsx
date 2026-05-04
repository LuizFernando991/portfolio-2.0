'use client';

import Image from 'next/image';
import { useI18n } from '@/lib/i18n-context';
import styles from './Hero.module.css';

const stackEntries = [
  { key: 'backend', values: ['Golang', 'Node', 'Bun'] },
  { key: 'frontend', values: ['Next.js', 'React.js'] },
  { key: 'infra', values: ['AWS', 'Docker'] },
] as const;

function CodeArrayLine({ name, values }: { name: string; values: readonly string[] }) {
  return (
    <span className={styles.codeLine}>
      {'  '}
      {name}: [
      {values.map((value, index) => (
        <span key={value}>
          <span className={styles.codeVal}>&quot;{value}&quot;</span>
          {index < values.length - 1 ? ', ' : ''}
        </span>
      ))}
      ],
    </span>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.chip}>
      <div className={styles.chipNum}>{value}</div>
      <div className={styles.chipLabel}>{label}</div>
    </div>
  );
}

export default function HeroCard() {
  const { t } = useI18n();
  const stats = [
    { value: '3+', label: t.hero.years },
    { value: '∞', label: t.hero.codeHours },
    { value: '∞', label: t.hero.caffeine },
  ];

  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <Image src="/images/profile.png" alt="Luiz Fernando" width={56} height={56} priority />
        </div>
        <div>
          <div className={styles.cardName}>Luiz Fernando</div>
          <div className={styles.cardRole}>{t.hero.cardRole}</div>
        </div>
      </div>

      <div className={styles.codeBlock}>
        <span className={styles.codeLine}>
          <span className={styles.codeComment}>{'// stack.ts'}</span>
        </span>
        <span className={styles.codeLine}>
          <span className={styles.codeKey}>const</span> <span className={styles.codeStr}>dev</span>{' '}
          = {'{'}
        </span>
        {stackEntries.map((entry) => (
          <CodeArrayLine key={entry.key} name={entry.key} values={entry.values} />
        ))}
        <span className={styles.codeLine}>
          {'  '}learning: <span className={styles.codeVal}>&quot;Terraform&quot;</span>
        </span>
        <span className={styles.codeLine}>{' };'}</span>
      </div>

      <div className={styles.stats}>
        {stats.map((stat) => (
          <HeroStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
}
