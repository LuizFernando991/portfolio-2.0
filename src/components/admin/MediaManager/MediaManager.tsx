"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "./MediaManager.module.css";

const PAGE_SIZE = 12;

interface MediaFile {
  name: string;
  url: string;
}

type UploadAction = (formData: FormData) => Promise<
  { success: true; data?: { url: string } } | { error: string }
>;

type ListAction = () => Promise<
  | { success: true; data?: MediaFile[] }
  | { error: string }
>;

interface Props {
  onSelect: (url: string) => void;
  onClose: () => void;
  insertMode?: boolean;
  uploadAction: UploadAction;
  listAction: ListAction;
}

export default function MediaManager({
  onSelect,
  onClose,
  insertMode,
  uploadAction,
  listAction,
}: Props) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listAction();
      if ("error" in result) throw new Error(result.error);
      setFiles(result.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar imagens");
    } finally {
      setLoading(false);
    }
  }, [listAction]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  useEffect(() => {
    searchRef.current?.focus();
  }, [loading]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return files;
    return files.filter((f) => f.name.toLowerCase().includes(q));
  }, [files, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageFiles = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSearch(q: string) {
    setSearch(q);
    setPage(1);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadAction(formData);
      if ("error" in result) throw new Error(result.error);
      await loadFiles();
      setSearch("");
      setPage(1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro no upload");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {insertMode ? "Selecionar imagem" : "Gerenciar mídia"}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            ✕
          </button>
        </div>

        <div className={styles.toolbar}>
          <label className={styles.uploadLabel}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleUpload}
              disabled={uploading}
            />
            {uploading ? "Enviando..." : "+ Enviar"}
          </label>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.868-3.834zm-5.242 1.156a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar por nome..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => handleSearch("")} aria-label="Limpar busca">
                ✕
              </button>
            )}
          </div>

          <span className={styles.hint}>
            {loading ? "..." : `${filtered.length} imagem${filtered.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.grid}>
          {loading ? (
            <p className={styles.empty}>Carregando...</p>
          ) : pageFiles.length === 0 ? (
            <p className={styles.empty}>
              {search ? `Nenhuma imagem encontrada para "${search}".` : "Nenhuma imagem ainda."}
            </p>
          ) : (
            pageFiles.map((f) => (
              <button
                key={f.name}
                type="button"
                className={styles.imgBtn}
                onClick={() => onSelect(f.url)}
                title={f.name}
              >
                <div className={styles.imgWrapper}>
                  <Image src={f.url} alt={f.name} fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <span className={styles.imgName}>{f.name}</span>
              </button>
            ))
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ‹ Anterior
            </button>
            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                  if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "…" ? (
                    <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
                  ) : (
                    <button
                      key={p}
                      className={`${styles.pageNum} ${currentPage === p ? styles.pageNumActive : ""}`}
                      onClick={() => setPage(p as number)}
                    >
                      {p}
                    </button>
                  )
                )}
            </div>
            <button
              className={styles.pageBtn}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Próximo ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
