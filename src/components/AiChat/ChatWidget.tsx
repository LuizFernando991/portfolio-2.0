'use client';

import { useState, useRef, useEffect, type ReactNode } from 'react';
import styles from './AiChat.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Qual é sua stack principal?',
  'Tem experiência com AWS?',
  'Quais projetos já fez?',
  'Está disponível para trabalho?',
];

const PRESET_RESPONSES: Record<string, string> = {
  'Qual é sua stack principal?':
    'Minha stack principal é **TypeScript** no full-stack: **React/Next.js** no frontend e **Node.js/NestJS** no backend. Também trabalho bem com **PostgreSQL**, **Redis**, **Docker**, **AWS** e arquiteturas com microserviços.',
  'Tem experiência com AWS?':
    'Sim. Tenho experiência usando **AWS** em aplicações web e plataformas escaláveis, incluindo deploy, infraestrutura, pipelines e serviços de apoio para aplicações Node.js/Next.js.',
  'Quais projetos já fez?':
    'Alguns projetos de destaque:\n\n- **Microservices Streaming Platform**: plataforma de vídeo com transcoding, RabbitMQ, Docker, FFmpeg e Redis.\n- **Sphera Academy**: plataforma de e-learning com cursos, aulas, progresso, pagamentos e dashboard admin.\n- **WhatsApp Campaigns**: sistema de campanhas em massa com listas, templates, agendamento e analytics.\n- **VSCode Portfolio**: portfólio interativo inspirado no VS Code.',
  'Está disponível para trabalho?':
    'Sim, estou aberto a oportunidades como **Full-Stack Developer**, especialmente com **React**, **Next.js**, **Node.js**, **NestJS**, cloud e sistemas escaláveis. Você pode chamar pelo e-mail **lfernando.r991@gmail.com** ou pelo LinkedIn.',
};

const INITIAL: Message = {
  role: 'assistant',
  content:
    'Olá! Sou o assistente do Luiz. Pergunte sobre experiência, stack, projetos ou qualquer coisa profissional sobre ele! 👋',
};

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
  const [messages, setMessages] = useState<Message[]>([INITIAL]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

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

    const presetResponse = PRESET_RESPONSES[trimmed];
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
          content: 'Ops, a IA saiu para tomar um café e já volta. Tenta de novo daqui a pouquinho!',
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
              <span className={styles.dot} /> Pronto para responder
            </div>
          </div>
        </div>
        <div className={styles.badge}>✦ Free AI</div>
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
              Analisando...
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      <div className={styles.suggestions}>
        <div className={styles.suggestionsLabel}>Tente perguntar:</div>
        <div className={styles.suggestionsList}>
          {SUGGESTIONS.map((s) => (
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
          placeholder="Faça uma pergunta sobre o Luiz..."
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
          aria-label="Enviar"
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
