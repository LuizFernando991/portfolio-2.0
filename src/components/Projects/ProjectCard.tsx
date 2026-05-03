'use client';

import type { Project } from '@/lib/i18n';
import { useI18n } from '@/lib/i18n-context';
import styles from './Projects.module.css';

interface Props {
  project: Project;
}

function ThumbDark() {
  return (
    <div className={`${styles.thumb} ${styles.thumbDark}`}>
      <div className={styles.terminal}>
        <span className={styles.termCommand}>$ docker compose up</span>
        <br />
        <span className={styles.termOk}>✓ api-gateway:3000</span>
        <br />
        <span className={styles.termOk}>✓ auth-service:3001</span>
        <br />
        <span className={styles.termOk}>✓ stream-service:3002</span>
        <br />
        <span className={styles.termReady}>▶ Ready in 1.2s</span>
      </div>
    </div>
  );
}

function ThumbPurple() {
  return (
    <div className={`${styles.thumb} ${styles.thumbPurple}`}>
      <div className={styles.mockup}>
        <div className={styles.mockupBar}>
          <div className={`${styles.dot} ${styles.dotR}`} />
          <div className={`${styles.dot} ${styles.dotY}`} />
          <div className={`${styles.dot} ${styles.dotG}`} />
        </div>
        <div className={styles.mockupContent}>
          <div className={styles.mockupLinePurple} />
          <div className={styles.mockupLine} style={{ width: '60%' }} />
          <div className={styles.mockupLine} style={{ width: '90%' }} />
          <div className={styles.mockupLine} style={{ width: '60%' }} />
          <div className={styles.mockupLineAccent} />
        </div>
      </div>
    </div>
  );
}

function ThumbPeach() {
  return (
    <div className={`${styles.thumb} ${styles.thumbPeach}`}>
      <div className={styles.mockup}>
        <div className={styles.mockupBar}>
          <div className={`${styles.dot} ${styles.dotR}`} />
          <div className={`${styles.dot} ${styles.dotY}`} />
          <div className={`${styles.dot} ${styles.dotG}`} />
        </div>
        <div className={styles.mockupContent}>
          <div className={styles.mockupIconRow}>
            <div className={styles.mockupIcon} />
            <div className={styles.mockupIconMeta}>
              <div className={styles.mockupLine} style={{ width: '80%' }} />
              <div className={styles.mockupLine} style={{ width: '60%' }} />
            </div>
          </div>
          <div className={styles.mockupLine} />
          <div className={styles.mockupLine} style={{ width: '60%' }} />
          <div className={styles.mockupLine} style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
}

function ThumbGreen() {
  return (
    <div className={`${styles.thumb} ${styles.thumbGreen}`}>
      <div className={styles.mockup}>
        <div className={styles.mockupBar}>
          <div className={`${styles.dot} ${styles.dotR}`} />
          <div className={`${styles.dot} ${styles.dotY}`} />
          <div className={`${styles.dot} ${styles.dotG}`} />
        </div>
        <div className={styles.mockupContent}>
          <div className={styles.mockupCampaignRow}>
            <div className={styles.mockupLine} style={{ width: '50%' }} />
            <div className={styles.mockupBadge} />
          </div>
          <div className={styles.mockupPills}>
            <div className={styles.mockupPill} style={{ width: 48 }} />
            <div className={styles.mockupPill} style={{ width: 36 }} />
            <div className={styles.mockupPill} style={{ width: 52 }} />
          </div>
          <div className={styles.mockupLine} style={{ width: '100%', marginTop: 4 }} />
          <div className={styles.mockupLine} style={{ width: '60%' }} />
          <div className={styles.mockupProgress}>
            <div className={styles.mockupProgressFill} />
          </div>
        </div>
      </div>
    </div>
  );
}

const thumbMap = {
  dark: <ThumbDark />,
  purple: <ThumbPurple />,
  peach: <ThumbPeach />,
  green: <ThumbGreen />,
};

export default function ProjectCard({ project }: Props) {
  const { t } = useI18n();

  return (
    <div className={styles.card}>
      {thumbMap[project.thumb]}

      <div className={styles.body}>
        <div className={styles.type}>{project.type}</div>
        <div className={styles.cardTitle}>{project.title}</div>
        <div className={styles.desc}>{project.description}</div>

        <div className={styles.footer}>
          <div className={styles.tags}>
            {project.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {project.link.includes('github.com') ? t.projects.github : t.projects.site}
          </a>
        </div>
      </div>
    </div>
  );
}
