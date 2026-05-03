'use client';

import type { ReactNode } from 'react';
import type { Project } from '@/lib/i18n';
import { useI18n } from '@/lib/i18n-context';
import styles from './Projects.module.css';

interface Props {
  project: Project;
}

function WindowDots() {
  return (
    <div className={styles.mockupBar}>
      <div className={`${styles.dot} ${styles.dotR}`} />
      <div className={`${styles.dot} ${styles.dotY}`} />
      <div className={`${styles.dot} ${styles.dotG}`} />
    </div>
  );
}

function Mockup({ children }: { children: ReactNode }) {
  return (
    <div className={styles.mockup}>
      <WindowDots />
      <div className={styles.mockupContent}>{children}</div>
    </div>
  );
}

function MockupLine({ width, marginTop }: { width?: string; marginTop?: number }) {
  return <div className={styles.mockupLine} style={{ width, marginTop }} />;
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
      <Mockup>
        <div className={styles.mockupLinePurple} />
        <MockupLine width="60%" />
        <MockupLine width="90%" />
        <MockupLine width="60%" />
        <div className={styles.mockupLineAccent} />
      </Mockup>
    </div>
  );
}

function ThumbPeach() {
  return (
    <div className={`${styles.thumb} ${styles.thumbPeach}`}>
      <Mockup>
        <div className={styles.mockupIconRow}>
          <div className={styles.mockupIcon} />
          <div className={styles.mockupIconMeta}>
            <MockupLine width="80%" />
            <MockupLine width="60%" />
          </div>
        </div>
        <MockupLine />
        <MockupLine width="60%" />
        <MockupLine width="75%" />
      </Mockup>
    </div>
  );
}

function ThumbGreen() {
  return (
    <div className={`${styles.thumb} ${styles.thumbGreen}`}>
      <Mockup>
        <div className={styles.mockupCampaignRow}>
          <MockupLine width="50%" />
          <div className={styles.mockupBadge} />
        </div>
        <div className={styles.mockupPills}>
          <div className={styles.mockupPill} style={{ width: 48 }} />
          <div className={styles.mockupPill} style={{ width: 36 }} />
          <div className={styles.mockupPill} style={{ width: 52 }} />
        </div>
        <MockupLine width="100%" marginTop={4} />
        <MockupLine width="60%" />
        <div className={styles.mockupProgress}>
          <div className={styles.mockupProgressFill} />
        </div>
      </Mockup>
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
