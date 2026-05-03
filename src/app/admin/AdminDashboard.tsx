"use client";

import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell/AdminShell";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard({ email }: { email: string }) {
  return (
    <AdminShell email={email}>
      <div className={styles.welcome}>
        <h1 className={styles.title}>Painel Admin</h1>
        <p className={styles.subtitle}>Bem-vindo ao painel de controle do blog.</p>
      </div>

      <div className={styles.grid}>
        <Link href="/admin/blog" className={styles.card}>
          <span className={styles.cardIcon}>✍️</span>
          <h2 className={styles.cardTitle}>Posts</h2>
          <p className={styles.cardDesc}>Criar, editar e publicar posts do blog com Markdown.</p>
          <span className={styles.cardLink}>Gerenciar posts →</span>
        </Link>
        <Link href="/admin/categories" className={styles.card}>
          <span className={styles.cardIcon}>🏷️</span>
          <h2 className={styles.cardTitle}>Categorias</h2>
          <p className={styles.cardDesc}>Organizar posts por temas e áreas de conhecimento.</p>
          <span className={styles.cardLink}>Gerenciar categorias →</span>
        </Link>
        <Link href="/admin/technologies" className={styles.card}>
          <span className={styles.cardIcon}>⚙️</span>
          <h2 className={styles.cardTitle}>Tecnologias</h2>
          <p className={styles.cardDesc}>Catalogar linguagens, frameworks e ferramentas.</p>
          <span className={styles.cardLink}>Gerenciar tecnologias →</span>
        </Link>
      </div>
    </AdminShell>
  );
}
