"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.badge}>Admin</span>
            <span className={styles.siteName}>Portfolio</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.emailLabel}>{email}</span>
            <button onClick={handleSignOut} className={styles.signOutBtn}>
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>Painel Admin</h1>
          <p className={styles.subtitle}>
            Bem-vindo! O blog está a caminho.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>✍️</span>
            <h2 className={styles.cardTitle}>Posts</h2>
            <p className={styles.cardDesc}>Em breve: criar e gerenciar posts do blog.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🏷️</span>
            <h2 className={styles.cardTitle}>Tags</h2>
            <p className={styles.cardDesc}>Em breve: organizar posts por categorias.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>⚙️</span>
            <h2 className={styles.cardTitle}>Configurações</h2>
            <p className={styles.cardDesc}>Em breve: configurar o site.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
