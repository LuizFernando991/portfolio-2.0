"use client";

import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { generateSlug } from "@/lib/slug";
import MediaManager from "@/components/admin/MediaManager/MediaManager";
import { uploadMedia, listMedia } from "@/app/admin/blog/actions";
import type { PostActionData } from "@/app/admin/blog/actions";
import styles from "./PostForm.module.css";

const MarkdownEditor = dynamic(
  () => import("@/components/admin/MarkdownEditor/MarkdownEditor"),
  {
    ssr: false,
    loading: () => <div className={styles.editorLoading}>Carregando editor...</div>,
  }
);

const postSchema = z.object({
  title: z.string().min(1, "Título é obrigatório").max(200, "Máximo 200 caracteres"),
  slug: z.string().min(1, "Slug é obrigatório").regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
  excerpt: z.string().max(300, "Máximo 300 caracteres").optional(),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  coverImage: z.string().optional(),
  published: z.boolean(),
  categoryIds: z.array(z.string()),
  technologyIds: z.array(z.string()),
});

type PostFormValues = z.infer<typeof postSchema>;

interface Category { id: string; name: string }
interface Technology { id: string; name: string }

interface Props {
  postId?: string;
  initialData?: Partial<PostFormValues>;
  categories: Category[];
  technologies: Technology[];
  onSubmit: (data: PostActionData) => Promise<{ success: true; data?: unknown } | { error: string }>;
}

export default function PostForm({ postId, initialData, categories, technologies, onSubmit }: Props) {
  const router = useRouter();
  const slugTouched = useRef(!!postId);
  const [showCoverManager, setShowCoverManager] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
      coverImage: initialData?.coverImage ?? "",
      published: initialData?.published ?? false,
      categoryIds: initialData?.categoryIds ?? [],
      technologyIds: initialData?.technologyIds ?? [],
    },
  });

  const title = watch("title");
  const coverImage = watch("coverImage");
  const categoryIds = watch("categoryIds");
  const technologyIds = watch("technologyIds");

  // Auto-generate slug from title while user hasn't manually edited it
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugTouched.current) {
      setValue("slug", generateSlug(e.target.value), { shouldValidate: true });
    }
  }

  function toggleArrayValue(field: "categoryIds" | "technologyIds", id: string) {
    const current = field === "categoryIds" ? categoryIds : technologyIds;
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    setValue(field, next);
  }

  async function handleFormSubmit(data: PostFormValues) {
    setServerError("");
    const result = await onSubmit(data as PostActionData);
    if ("error" in result) {
      setServerError(result.error);
    } else {
      router.push("/admin/blog");
      router.refresh();
    }
  }

  // Suppress unused warning — title is watched for slug auto-generation side effect
  void title;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      {serverError && <div className={styles.serverError}>{serverError}</div>}

      {/* ── Title + Slug ── */}
      <div className={styles.row}>
        <div className={styles.field} style={{ flex: 2 }}>
          <label className={styles.label} htmlFor="title">Título *</label>
          <input
            id="title"
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            placeholder="Título do post"
            {...register("title", {
              onChange: handleTitleChange,
            })}
          />
          {errors.title && <span className={styles.fieldError}>{errors.title.message}</span>}
        </div>

        <div className={styles.field} style={{ flex: 1 }}>
          <label className={styles.label} htmlFor="slug">Slug</label>
          <input
            id="slug"
            className={`${styles.input} ${errors.slug ? styles.inputError : ""}`}
            placeholder="meu-post"
            {...register("slug", {
              onChange: () => { slugTouched.current = true; },
            })}
          />
          {errors.slug && <span className={styles.fieldError}>{errors.slug.message}</span>}
        </div>
      </div>

      {/* ── Excerpt ── */}
      <div className={styles.field}>
        <label className={styles.label} htmlFor="excerpt">
          Resumo
          <span className={styles.labelHint}> — aparece em listagens e SEO</span>
        </label>
        <textarea
          id="excerpt"
          className={`${styles.textarea} ${errors.excerpt ? styles.inputError : ""}`}
          placeholder="Breve descrição do post (opcional, máx. 300 caracteres)"
          rows={2}
          {...register("excerpt")}
        />
        {errors.excerpt && <span className={styles.fieldError}>{errors.excerpt.message}</span>}
      </div>

      {/* ── Cover image ── */}
      <div className={styles.field}>
        <label className={styles.label}>Imagem de capa</label>
        <div className={styles.coverRow}>
          {coverImage ? (
            <>
              <div className={styles.coverPreview}>
                <Image src={coverImage} alt="Capa" fill style={{ objectFit: "cover" }} unoptimized />
                <button
                  type="button"
                  className={styles.removeCoverBtn}
                  onClick={() => setValue("coverImage", "")}
                  aria-label="Remover imagem de capa"
                >
                  ✕
                </button>
              </div>
              <button
                type="button"
                className={styles.changeCoverBtn}
                onClick={() => setShowCoverManager(true)}
              >
                Trocar imagem
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.selectCoverBtn}
              onClick={() => setShowCoverManager(true)}
            >
              Selecionar imagem de capa
            </button>
          )}
        </div>
      </div>

      {/* ── Categories + Technologies ── */}
      <div className={styles.row}>
        <div className={styles.field} style={{ flex: 1 }}>
          <label className={styles.label}>Categorias</label>
          <div className={styles.tagGrid}>
            {categories.length === 0 ? (
              <span className={styles.emptyTag}>Nenhuma categoria cadastrada</span>
            ) : (
              categories.map((c) => (
                <label key={c.id} className={`${styles.tagOption} ${categoryIds.includes(c.id) ? styles.tagOptionActive : ""}`}>
                  <input
                    type="checkbox"
                    checked={categoryIds.includes(c.id)}
                    onChange={() => toggleArrayValue("categoryIds", c.id)}
                  />
                  {c.name}
                </label>
              ))
            )}
          </div>
        </div>

        <div className={styles.field} style={{ flex: 1 }}>
          <label className={styles.label}>Tecnologias</label>
          <div className={styles.tagGrid}>
            {technologies.length === 0 ? (
              <span className={styles.emptyTag}>Nenhuma tecnologia cadastrada</span>
            ) : (
              technologies.map((t) => (
                <label key={t.id} className={`${styles.tagOption} ${technologyIds.includes(t.id) ? styles.tagOptionActive : ""}`}>
                  <input
                    type="checkbox"
                    checked={technologyIds.includes(t.id)}
                    onChange={() => toggleArrayValue("technologyIds", t.id)}
                  />
                  {t.name}
                </label>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── Markdown content ── */}
      <div className={styles.field}>
        <label className={styles.label}>Conteúdo *</label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <MarkdownEditor
              value={field.value}
              onChange={field.onChange}
              error={errors.content?.message}
              uploadAction={uploadMedia}
              listAction={listMedia}
            />
          )}
        />
      </div>

      {/* ── Footer ── */}
      <div className={styles.footer}>
        <label className={styles.publishToggle}>
          <input type="checkbox" {...register("published")} />
          <span className={styles.toggleTrack} />
          <span>Publicar</span>
        </label>

        <div className={styles.footerActions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => router.push("/admin/blog")}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn} disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : postId ? "Salvar alterações" : "Criar post"}
          </button>
        </div>
      </div>

      {/* ── Cover image MediaManager ── */}
      {showCoverManager && (
        <MediaManager
          onSelect={(url) => {
            setValue("coverImage", url);
            setShowCoverManager(false);
          }}
          onClose={() => setShowCoverManager(false)}
          uploadAction={uploadMedia}
          listAction={listMedia}
        />
      )}
    </form>
  );
}
