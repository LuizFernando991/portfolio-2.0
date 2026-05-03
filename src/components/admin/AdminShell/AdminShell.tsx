"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import styles from "./AdminShell.module.css";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/blog", label: "Posts" },
  { href: "/admin/categories", label: "Categorias" },
  { href: "/admin/technologies", label: "Tecnologias" },
];

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
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

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href, link.exact) ? styles.navLinkActive : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
