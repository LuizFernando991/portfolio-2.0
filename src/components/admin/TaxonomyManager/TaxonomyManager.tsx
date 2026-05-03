"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TaxonomyManager.module.css";

interface Item {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  createdAt: string;
}

type ItemResult = { id: string; name: string; slug: string };
type ActionResult<T = void> = { success: true; data?: T } | { error: string };

interface Props {
  initialItems: Item[];
  label: string;
  onCreate: (name: string) => Promise<ActionResult<ItemResult>>;
  onUpdate: (id: string, name: string) => Promise<ActionResult<ItemResult>>;
  onDelete: (id: string) => Promise<ActionResult>;
}

export default function TaxonomyManager({ initialItems, label, onCreate, onUpdate, onDelete }: Props) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    setError("");
    try {
      const result = await onCreate(newName.trim());
      if ("error" in result) throw new Error(result.error);
      setItems((prev) =>
        [...prev, { ...result.data!, postCount: 0, createdAt: new Date().toISOString() }]
          .sort((a, b) => a.name.localeCompare(b.name))
      );
      setNewName("");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setCreating(false);
    }
  }

  function startEdit(item: Item) {
    setEditingId(item.id);
    setEditName(item.name);
    setError("");
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return;
    setError("");
    try {
      const result = await onUpdate(id, editName.trim());
      if ("error" in result) throw new Error(result.error);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, name: result.data!.name, slug: result.data!.slug } : item
        ).sort((a, b) => a.name.localeCompare(b.name))
      );
      setEditingId(null);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(`Excluir esta ${label}? Posts associados perderão essa relação.`)) return;
    setDeletingId(id);
    setError("");
    try {
      const result = await onDelete(id);
      if ("error" in result) throw new Error(result.error);
      setItems((prev) => prev.filter((item) => item.id !== id));
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.createCard}>
        <h2 className={styles.sectionTitle}>Nova {label}</h2>
        <form onSubmit={handleCreate} className={styles.createForm}>
          <input
            className={styles.input}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder={`Nome da ${label}`}
            disabled={creating}
          />
          <button type="submit" className={styles.createBtn} disabled={creating || !newName.trim()}>
            {creating ? "Criando..." : "Criar"}
          </button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      {items.length === 0 ? (
        <div className={styles.empty}>Nenhuma {label} cadastrada ainda.</div>
      ) : (
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <span>Nome</span>
            <span>Slug</span>
            <span>Posts</span>
            <span>Ações</span>
          </div>
          {items.map((item) => (
            <div key={item.id} className={styles.tableRow}>
              <div className={styles.nameCell}>
                {editingId === item.id ? (
                  <input
                    className={styles.inlineInput}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleUpdate(item.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span className={styles.itemName}>{item.name}</span>
                )}
              </div>
              <span className={styles.slugCell}>{item.slug}</span>
              <span className={styles.countCell}>
                <span className={styles.countBadge}>{item.postCount}</span>
              </span>
              <div className={styles.actionsCell}>
                {editingId === item.id ? (
                  <>
                    <button className={styles.saveBtn} onClick={() => handleUpdate(item.id)}>Salvar</button>
                    <button className={styles.cancelEditBtn} onClick={() => setEditingId(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className={styles.editBtn} onClick={() => startEdit(item)}>Editar</button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                    >
                      {deletingId === item.id ? "..." : "Excluir"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
