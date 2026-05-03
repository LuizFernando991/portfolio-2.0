'use client';

import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import 'highlight.js/styles/tokyo-night-dark.css';

import dynamic from 'next/dynamic';
import rehypeHighlight from 'rehype-highlight';
import { type ICommand, commands } from '@uiw/react-md-editor/nohighlight';
import { useMemo, useRef, useState } from 'react';
import MediaManager from '@/components/admin/MediaManager/MediaManager';
import styles from './MarkdownEditor.module.css';

const MDEditor = dynamic(() => import('@uiw/react-md-editor/nohighlight').then((m) => m.default), {
  ssr: false,
  loading: () => <div className={styles.loading}>Carregando editor...</div>,
});

type UploadAction = (
  formData: FormData
) => Promise<{ success: true; data?: { url: string } } | { error: string }>;

type ListAction = () => Promise<
  { success: true; data?: { name: string; url: string }[] } | { error: string }
>;

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  uploadAction: UploadAction;
  listAction: ListAction;
}

// ── Heading commands ──────────────────────────────────────────────────────────

function makeHeading(level: 1 | 2 | 3 | 4): ICommand {
  const prefix = '#'.repeat(level) + ' ';
  return {
    name: `h${level}`,
    keyCommand: `h${level}`,
    buttonProps: { title: `Título H${level}`, 'aria-label': `H${level}` },
    icon: (
      <span
        style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'monospace', lineHeight: 1 }}
      >
        H{level}
      </span>
    ),
    execute(state, api) {
      api.replaceSelection(`${prefix}${state.selectedText}`);
    },
  };
}

const headingsGroup = commands.group(
  [makeHeading(1), makeHeading(2), makeHeading(3), makeHeading(4)],
  {
    name: 'headings',
    groupName: 'headings',
    buttonProps: { title: 'Títulos', 'aria-label': 'Títulos' },
    icon: (
      <span
        style={{ fontSize: '0.72rem', fontWeight: 700, fontFamily: 'monospace', lineHeight: 1 }}
      >
        H▾
      </span>
    ),
  }
);

// ── Icons ─────────────────────────────────────────────────────────────────────

const GalleryIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093L7.5 9.793 5.168 7.339a.5.5 0 0 0-.683-.04L1.002 9.766V3a1 1 0 0 1 1-1h12z" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function MarkdownEditor({
  value,
  onChange,
  error,
  uploadAction,
  listAction,
}: Props) {
  const [showMedia, setShowMedia] = useState(false);
  const editorApiRef = useRef<any>(null);

  const galleryCommand = useMemo(
    () => ({
      name: 'gallery',
      keyCommand: 'gallery',
      buttonProps: {
        'aria-label': 'Inserir imagem da galeria',
        title: 'Inserir imagem da galeria',
      },
      icon: <GalleryIcon />,
      execute: (_state: any, api: any) => {
        editorApiRef.current = api;
        setShowMedia(true);
      },
    }),
    []
  );

  const editorCommands = useMemo(
    () => [
      commands.bold,
      commands.italic,
      commands.strikethrough,
      commands.hr,
      commands.divider,
      headingsGroup,
      commands.divider,
      commands.link,
      commands.quote,
      commands.code,
      commands.codeBlock,
      commands.divider,
      commands.unorderedListCommand,
      commands.orderedListCommand,
      commands.checkedListCommand,
      commands.divider,
      galleryCommand,
    ],
    [galleryCommand]
  );

  const extraCommands = useMemo(
    () => [
      commands.codeEdit,
      commands.codeLive,
      commands.codePreview,
      commands.divider,
      commands.fullscreen,
    ],
    []
  );

  function handleImageSelect(url: string) {
    if (editorApiRef.current) {
      editorApiRef.current.replaceSelection(`\n![imagem](${url})\n`);
    }
    setShowMedia(false);
  }

  return (
    <div
      className={`${styles.wrapper} ${error ? styles.wrapperError : ''}`}
      data-color-mode="light"
    >
      <MDEditor
        value={value}
        onChange={(val) => onChange(val ?? '')}
        height={620}
        visibleDragbar={false}
        commands={editorCommands}
        extraCommands={extraCommands}
        previewOptions={{
          rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
        }}
        textareaProps={{
          placeholder:
            "Escreva seu post em Markdown...\n\n```javascript\n// blocos de código com syntax highlighting\nconsole.log('Hello!')\n```",
        }}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}

      {showMedia && (
        <MediaManager
          onSelect={handleImageSelect}
          onClose={() => setShowMedia(false)}
          insertMode
          uploadAction={uploadAction}
          listAction={listAction}
        />
      )}
    </div>
  );
}
