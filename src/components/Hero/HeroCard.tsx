import Image from 'next/image';
import styles from './Hero.module.css';

export default function HeroCard() {
  return (
    <div className={`${styles.card} reveal`}>
      <div className={styles.cardHeader}>
        <div className={styles.avatar}>
          <Image src="/images/profile.png" alt="Luiz Fernando" width={56} height={56} priority />
        </div>
        <div>
          <div className={styles.cardName}>Luiz Fernando</div>
          <div className={styles.cardRole}>Full-Stack Developer</div>
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
        <span className={styles.codeLine}>
          {'  '}backend: [<span className={styles.codeVal}>&quot;Golang&quot;</span>,{' '}
          <span className={styles.codeVal}>&quot;Node&quot;</span>,{' '}
          <span className={styles.codeVal}>&quot;Bun&quot;</span>],
          
        </span>
        <span className={styles.codeLine}>
          {'  '}frontend: [<span className={styles.codeVal}>&quot;Next.js&quot;</span>,{' '}
          <span className={styles.codeVal}>&quot;React.js&quot;</span>],
        </span>
        <span className={styles.codeLine}>
          {'  '}infra: [<span className={styles.codeVal}>&quot;AWS&quot;</span>,{' '}
          <span className={styles.codeVal}>&quot;Docker&quot;</span>],
        </span>
        <span className={styles.codeLine}>
          {'  '}learning: <span className={styles.codeVal}>&quot;Terraform&quot;</span>
        </span>
        <span className={styles.codeLine}>{' };'}</span>
      </div>

      <div className={styles.stats}>
        <div className={styles.chip}>
          <div className={styles.chipNum}>3+</div>
          <div className={styles.chipLabel}>Anos de exp.</div>
        </div>
        <div className={styles.chip}>
          <div className={styles.chipNum}>∞</div>
          <div className={styles.chipLabel}>Horas de código</div>
        </div>
        <div className={styles.chip}>
          <div className={styles.chipNum}>∞</div>
          <div className={styles.chipLabel}>Caffeine</div>
        </div>
      </div>
    </div>
  );
}
