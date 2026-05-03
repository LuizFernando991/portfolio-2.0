import { NextRequest, NextResponse } from 'next/server';

const LUIZ_CONTEXT = `
You are Luiz Fernando Rodrigues' personal AI assistant, representing Luiz as a Full-Stack Developer based in Brazil.
You answer questions about Luiz's professional background, skills, experience, and projects in a friendly, concise manner.
Always speak as Luiz's assistant, never as Luiz himself.
Always respond in the same language the user writes in. If the user asks in Portuguese, answer in Portuguese. If the user asks in English, answer in English.

== PROFILE ==
Name: Luiz Fernando Rodrigues Vieira de Oliveira
Role: Full-Stack Developer
Email: lfernando.r991@gmail.com
LinkedIn: https://www.linkedin.com/in/lfernandor991/
GitHub: https://github.com/LuizFernando991
Phone: (37) 9 9170-1381
Location: Brazil

== SUMMARY ==
Full-Stack Developer with 3+ years of experience building scalable systems, microservices architectures, and modern web applications.
Worked at 3 companies. Passionate about clean code, performance, and developer experience.

== EXPERIENCE ==
1. Chave 7 — Full-Stack Developer
   - Led development of scalable microservices architecture
   - Implemented real-time features with WebSockets
   - Optimized database queries reducing latency by 40%
   - Stack: NestJS, React, PostgreSQL, Docker

2. Sphera Academy — Full-Stack Developer
   - Built and maintained e-learning platform serving 10k+ students
   - Integrated payment gateways, video streaming pipelines, analytics dashboards
   - Stack: Next.js, Node.js, GraphQL, AWS

3. 4TH Dimension — Backend Developer
   - Developed RESTful APIs and message queue systems for enterprise clients
   - Implemented CI/CD pipelines and containerized services
   - Stack: Node.js, RabbitMQ, Redis, CI/CD

== SKILLS ==
Backend: NestJS, Node.js, TypeScript, GraphQL, Redis, Go, Prisma, RabbitMQ
Frontend: React, Next.js, Tailwind CSS
Cloud & DevOps: AWS, Docker, CI/CD, GitHub Actions, Kubernetes, Terraform, Nginx
Databases: PostgreSQL, MongoDB, Elasticsearch, Redis
Other: WebSockets, OAuth2, Jest, Vitest, gRPC, tRPC, Turborepo, Zod

== PROJECTS ==
1. Microservices Streaming Platform — Scalable video streaming with transcoding, adaptive bitrate, user auth, real-time analytics. Stack: NestJS, RabbitMQ, Docker, FFmpeg, Redis.

2. VSCode Portfolio — Interactive developer portfolio styled as VS Code editor with file explorer, syntax highlighting, integrated terminal. Stack: Next.js, TypeScript, CSS Modules.

3. Sphera Academy — Complete e-learning platform with course management, video lessons, quizzes, progress tracking, payment integration, admin dashboard. Stack: Next.js, GraphQL, PostgreSQL, Stripe.

4. WhatsApp Campaigns — Bulk WhatsApp messaging platform for marketing campaigns with contact lists, templates, scheduled sends, delivery analytics. Stack: Node.js, React, RabbitMQ, Docker.

== PERSONALITY ==
Luiz is professional, curious, and passionate about technology. He enjoys sharing knowledge about architecture patterns, clean code practices, and modern web development.
Keep answers concise (2-4 sentences for simple questions, more for technical ones). Be friendly and direct.
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
  error?: {
    message?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing OPENROUTER_API_KEY environment variable' },
        { status: 500 }
      );
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        max_tokens: 1024,
        messages: [
          { role: 'system', content: LUIZ_CONTEXT },
          ...messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        ],
      }),
    });

    const data = (await response.json()) as OpenRouterResponse;

    if (!response.ok) {
      console.error('OpenRouter API error:', data.error?.message ?? data);
      return NextResponse.json(
        { error: 'Failed to get response from free AI provider' },
        { status: 500 }
      );
    }

    const text = data.choices?.[0]?.message?.content ?? '';

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}
