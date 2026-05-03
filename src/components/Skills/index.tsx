'use client';

import TerminalChrome from '@/components/ui/TerminalChrome';
import { useI18n } from '@/lib/i18n-context';
import styles from './Skills.module.css';

interface SkillGroupProps {
  group: {
    label: string;
    command: string;
    items: readonly string[];
  };
  index: number;
}

function SkillGroup({ group, index }: SkillGroupProps) {
  return (
    <article className={styles.group}>
      <div className={styles.groupHead}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{group.label}</strong>
      </div>
      <p>{group.command}</p>

      <div className={styles.stackList}>
        {group.items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
}

function SkillsBoard({ groups }: { groups: readonly SkillGroupProps['group'][] }) {
  return (
    <div className={styles.board}>
      {groups.map((group, index) => (
        <SkillGroup key={group.label} group={group} index={index} />
      ))}
    </div>
  );
}

function TechMarquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];

  return (
    <div className={styles.extrasStrip}>
      <div className={styles.extrasTrack}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`}>
            <span className={styles.tex}>{item}</span>
            <span className={styles.texDot}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useI18n();

  return (
    <section id="skills" className={styles.skills}>
      <div className={`${styles.shell} reveal`}>
        <div className={`tag ${styles.skillsTag}`}>{t.skills.tag}</div>

        <TerminalChrome
          className={styles.console}
          title={t.skills.terminalPath}
          command={t.skills.command}
        >
          <SkillsBoard groups={t.skills.groups} />

          <div className={styles.signal}>
            <div>
              <span className={styles.signalLabel}>{t.skills.workMode}</span>
              <strong>{t.skills.workModeText}</strong>
            </div>
            <div className={styles.signalTags}>
              {t.skills.signalItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </TerminalChrome>
      </div>

      <TechMarquee items={t.skills.extraTechItems} />
    </section>
  );
}
