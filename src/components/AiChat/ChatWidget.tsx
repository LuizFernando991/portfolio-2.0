'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useI18n } from '@/lib/i18n-context';
import styles from './AiChat.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith('**')) {
      nodes.push(<strong key={`${match.index}-strong`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      nodes.push(<code key={`${match.index}-code`}>{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = linkMatch?.[2] ?? '';

      nodes.push(
        <a key={`${match.index}-link`} href={href} target="_blank" rel="noreferrer">
          {linkMatch?.[1] ?? token}
        </a>
      );
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;

    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {listItems.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    const listMatch = trimmed.match(/^[-*]\s+(.+)$/);

    if (!trimmed) {
      flushList();
      return;
    }

    if (listMatch) {
      listItems.push(listMatch[1]);
      return;
    }

    flushList();

    if (trimmed.startsWith('### ')) {
      blocks.push(<h4 key={`h4-${blocks.length}`}>{renderInlineMarkdown(trimmed.slice(4))}</h4>);
      return;
    }

    if (trimmed.startsWith('## ')) {
      blocks.push(<h4 key={`h4-${blocks.length}`}>{renderInlineMarkdown(trimmed.slice(3))}</h4>);
      return;
    }

    if (trimmed.startsWith('# ')) {
      blocks.push(<h4 key={`h4-${blocks.length}`}>{renderInlineMarkdown(trimmed.slice(2))}</h4>);
      return;
    }

    blocks.push(<p key={`p-${blocks.length}`}>{renderInlineMarkdown(trimmed)}</p>);
  });

  flushList();

  return <div className={styles.markdown}>{blocks}</div>;
}

export default function ChatWidget() {
  const { locale, t } = useI18n();
  const initialMessage: Message = { role: 'assistant', content: t.aiChat.initial };
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: t.aiChat.initial }]);
    setInput('');
    setLoading(false);
  }, [locale, t.aiChat.initial]);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput('');

    const presetResponse = t.aiChat.presetResponses[trimmed as keyof typeof t.aiChat.presetResponses];
    if (presetResponse) {
      setLoading(true);
      window.setTimeout(() => {
        setMessages([...next, { role: 'assistant', content: presetResponse }]);
        setLoading(false);
      }, 650);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error('failed');
      const data = (await res.json()) as { response: string };
      setMessages([...next, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages([
        ...next,
        {
          role: 'assistant',
          content: t.aiChat.error,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.widget}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.avatar}>LF</div>
          <div>
            <div className={styles.name}>Luiz AI</div>
            <div className={styles.status}>
              <span className={styles.dot} /> {t.aiChat.status}
            </div>
          </div>
        </div>
        <div className={styles.badge}>{t.aiChat.badge}</div>
      </div>

      {/* Messages */}
      <div className={styles.messages} ref={messagesRef}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.msg} ${m.role === 'user' ? styles.msgUser : ''}`}>
            {m.role === 'assistant' && <div className={styles.msgAvatar}>LF</div>}
            <div
              className={`${styles.bubble} ${m.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}
            >
              {m.role === 'assistant' ? <MarkdownContent content={m.content} /> : m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className={styles.msg}>
            <div className={styles.msgAvatar}>LF</div>
            <div className={styles.thinkingBubble}>
              <div className={styles.thinkingDots}>
                <span />
                <span />
                <span />
              </div>{' '}
              {t.aiChat.thinking}
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className={styles.suggestions}>
        <div className={styles.suggestionsLabel}>{t.aiChat.suggestionsLabel}</div>
        <div className={styles.suggestionsList}>
          {t.aiChat.suggestions.map((s) => (
            <button
              key={s}
              className={styles.suggestion}
              onClick={() => send(s)}
              disabled={loading}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          type="text"
          placeholder={t.aiChat.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send(input);
          }}
          disabled={loading}
        />
        <button
          className={styles.send}
          onClick={() => send(input)}
          disabled={loading || !input.trim()}
          aria-label={t.aiChat.sendLabel}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
