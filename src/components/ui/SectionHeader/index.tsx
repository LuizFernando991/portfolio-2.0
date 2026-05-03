import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  tag: ReactNode;
  title: ReactNode;
  titleAs?: 'h1' | 'h2';
  action?: ReactNode;
  description?: ReactNode;
  className?: string;
  tagClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  row?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function SectionHeader({
  tag,
  title,
  titleAs: Title = 'h2',
  action,
  description,
  className,
  tagClassName,
  titleClassName,
  descriptionClassName,
  row = false,
}: SectionHeaderProps) {
  return (
    <div className={cx(styles.header, row && styles.row, className)}>
      <div>
        <div className={cx('tag', tagClassName)}>{tag}</div>
        <Title className={cx(styles.title, titleClassName)}>{title}</Title>
        {description && (
          <p className={cx(styles.description, descriptionClassName)}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
