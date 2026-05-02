import styles from './Marquee.module.css';

const ITEMS = [
  'NestJS',
  'Next.js',
  'React',
  'AWS',
  'Docker',
  'GraphQL',
  'Postgres',
  'Redis',
  'Microservices',
  'TypeScript',
  'CI/CD',
  'Golang',
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className={styles.section}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
