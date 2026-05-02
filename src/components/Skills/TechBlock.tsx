import type { TechBlock as TechBlockData } from '@/lib/data';
import styles from './Skills.module.css';

interface Props {
  block: TechBlockData;
}

const sizeMap: Record<string, string> = {
  xl: styles.xl,
  lg: styles.lg,
  md: styles.md,
  sm: styles.sm,
};

export default function TechBlock({ block }: Props) {
  return (
    <div
      className={`${styles.block} ${sizeMap[block.size]}`}
      style={{
        background: block.bg,
        color: block.color,
        borderColor: block.borderColor ?? '#0e0e0e',
      }}
    >
      <span className={styles.num}>{block.num}</span>
      <span className={styles.name}>{block.name}</span>
      <span className={styles.tag}>{block.tag}</span>
    </div>
  );
}
