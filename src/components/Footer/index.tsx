import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.logo}>
        LF<span>.dev</span>
      </div>
      <div className={styles.copy}>© 2026 Luiz Fernando Rodrigues — Full-Stack Developer</div>
    </footer>
  );
}
