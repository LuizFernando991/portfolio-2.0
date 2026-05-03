export type Locale = 'pt-BR' | 'en-US';

export interface Experience {
  company: string;
  role: string;
  description: string;
}

export interface Project {
  title: string;
  type: string;
  description: string;
  tags: readonly string[];
  link: string;
  thumb: 'dark' | 'purple' | 'peach' | 'green';
}

export const locales: Locale[] = ['pt-BR', 'en-US'];

export const translations = {
  'pt-BR': {
    nav: {
      about: 'Sobre',
      skills: 'Skills',
      projects: 'Projetos',
      aiChat: 'AI Chat',
      contact: 'Contato',
      menu: 'Menu',
      language: 'Idioma',
    },
    hero: {
      available: 'Disponível para trabalho',
      titleTop: 'Full-Stack',
      titleEm: 'Developer',
      description:
        'Olá! Sou Luiz Fernando, desenvolvedor focado em JavaScript/TypeScript, com experiência em Golang, Node.js, Bun, React, NestJS e AWS. Construo produtos escaláveis do back ao front.',
      projects: 'Ver Projetos →',
      contact: 'Falar Comigo',
      cardRole: 'Full-Stack Developer',
      years: 'Anos de exp.',
      codeHours: 'Horas de código',
      caffeine: 'Caffeine',
    },
    about: {
      tag: '✦ Sobre mim',
      title: 'Construo produtos, não só código.',
      paragraphs: [
        'Sou desenvolvedor Full-Stack com foco em JavaScript/TypeScript e ecossistema Node/Bun. Tenho experiência sólida construindo APIs robustas, integrações e frontends modernos com React/Next.js.',
        'Já trabalhei em plataformas educacionais, sistemas de mensageria e microserviços. Meu objetivo é sempre entregar software que funciona de verdade: rápido, escalável e bem testado.',
        'Atualmente aprendendo novas coisas nas horas vagas.',
      ],
      cta: 'Vamos conversar →',
      stats: {
        years: 'Anos de exp.',
        projects: 'Projetos',
        techs: 'Tecnologias',
      },
    },
    experiences: [
      {
        company: 'Sphera Academy',
        role: 'Full-Stack Developer · Remoto',
        description:
          'Desenvolvimento de plataforma educacional internacional utilizando Next.js, AWS e arquitetura orientada a eventos. Implementação de otimizações de performance em banco de dados e sistema de cache, além de integrações com IA para correção automatizada de redações e currículos.',
      },
      {
        company: 'Chave 7',
        role: 'Backend Developer · Remoto',
        description:
          'Microserviços com NestJS, integração AWS SQS/S3, gateways de pagamento, notificações automáticas e CI/CD com GitHub Actions na AWS ECS.',
      },
      {
        company: '4TH Dimension',
        role: 'Full-Stack Developer · Remoto',
        description:
          'Sistema de campanhas automatizadas de WhatsApp com agendamento, controle de velocidade e monitoramento em tempo real via WebSocket.',
      },
    ],
    skills: {
      tag: '⚙ Tecnologias',
      terminalPath: '~/luiz/skills',
      command: 'run stack --production',
      groups: [
        {
          label: 'Linguagens',
          command: 'compile',
          items: ['TypeScript', 'JavaScript', 'Golang'],
        },
        {
          label: 'Backend',
          command: 'build api',
          items: ['Node.js', 'Bun', 'Nest.js', 'Fastify', 'Express', 'GraphQL', 'Socket.io'],
        },
        {
          label: 'Frontend',
          command: 'ship ui',
          items: ['Next.js', 'React.js', 'Tailwind'],
        },
        {
          label: 'Banco de Dados',
          command: 'query',
          items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'Drizzle'],
        },
        {
          label: 'DevOps',
          command: 'deploy',
          items: ['Docker', 'AWS', 'RabbitMQ', 'Git', 'GitHub Actions'],
        },
      ],
      workMode: 'Modo de trabalho',
      workModeText: 'Arquitetura limpa, entregas pragmáticas.',
      signalItems: ['Microservices', 'Clean Arch.', 'Event-Driven', 'CI/CD'],
      extraTechItems: [
        'VS Code',
        'Linux',
        'Postman',
        'Insomnia',
        'GitHub Actions',
        'REST API',
        'Microservices',
        'Clean Architecture',
        'CI/CD',
        'Monorepo',
        'Event-Driven',
        'SOLID',
        'Design Patterns',
        'Terraform',
        'Kubernetes',
        'Kafka',
      ],
    },
    projects: {
      tag: '✦ Projetos',
      titleTop: 'Coisas que',
      titleBottom: 'eu construí.',
      more: 'Ver mais no GitHub →',
      github: 'GitHub →',
      site: 'Site →',
      items: [
        {
          title: 'Microservice Streaming',
          type: 'Em progresso · Microservices',
          description:
            'Upload multipart com retry por parte e retomada a qualquer momento — resiliente a quedas. Processamento de vídeo em Golang, API de upload com Node.js/Express, Redis e RabbitMQ. Observabilidade com Grafana e Prometheus.',
          tags: ['Golang', 'Node.js', 'RabbitMQ', 'Redis', 'Grafana'],
          link: 'https://github.com/LuizFernando991/streaming-microservices',
          thumb: 'dark',
        },
        {
          title: 'VSCode Portfolio',
          type: 'Portfólio · Visual',
          description:
            'Site pessoal temático com layout inspirado no VSCode. Experiência interativa e criativa para devs visitarem o portfólio.',
          tags: ['React', 'CSS', 'UI/UX'],
          link: 'https://devluizfernando.com.br/',
          thumb: 'purple',
        },
        {
          title: 'Sphera Academy',
          type: 'Edtech · Full-Stack',
          description:
            'Plataforma educacional para alunos que buscam estudar no exterior. Sistema de progresso, filas, jobs assíncronos, cache e cloud deploy com AWS.',
          tags: ['Next.js', 'AWS', 'Cloudinary'],
          link: 'https://www.spheraacademy.com/',
          thumb: 'peach',
        },
        {
          title: 'Golang Raw Router',
          type: 'Open Source · Backend',
          description:
            'API em Go sem frameworks HTTP. Roteamento manual implementado com net/http e expressões regulares para mapeamento de rotas.',
          tags: ['Go', 'net/http', 'REST'],
          link: 'https://github.com/LuizFernando991/golang-raw-router',
          thumb: 'green',
        },
      ],
    },
    aiChat: {
      tag: '✦ AI ASSISTANT',
      title: 'Pergunte qualquer coisa sobre mim',
      description:
        'Quer saber minha experiência com AWS? Qual stack eu domino? Como eu trabalho? Pergunta aqui: uma IA treinada com meu currículo vai responder.',
      status: 'Pronto para responder',
      badge: '✦ Free AI',
      thinking: 'Analisando...',
      suggestionsLabel: 'Tente perguntar:',
      placeholder: 'Faça uma pergunta sobre o Luiz...',
      sendLabel: 'Enviar',
      initial:
        'Olá! Sou o assistente do Luiz. Pergunte sobre experiência, stack, projetos ou qualquer coisa profissional sobre ele!',
      error: 'Ops, não consegui responder agora. Tenta de novo daqui a pouquinho!',
      suggestions: [
        'Qual é sua stack principal?',
        'Tem experiência com AWS?',
        'Quais projetos já fez?',
        'Está disponível para trabalho?',
      ],
      presetResponses: {
        'Qual é sua stack principal?':
          'Minha stack principal é **TypeScript** no full-stack: **React/Next.js** no frontend e **Node.js/NestJS** no backend. Também trabalho bem com **PostgreSQL**, **Redis**, **Docker**, **AWS** e arquiteturas com microserviços.',
        'Tem experiência com AWS?':
          'Sim. Tenho experiência usando **AWS** em aplicações web e plataformas escaláveis, incluindo deploy, infraestrutura, pipelines e serviços de apoio para aplicações Node.js/Next.js.',
        'Quais projetos já fez?':
          'Alguns projetos de destaque:\n\n- **Microservices Streaming Platform**: plataforma de vídeo com transcoding, RabbitMQ, Docker, FFmpeg e Redis.\n- **Sphera Academy**: plataforma de e-learning com cursos, aulas, progresso, pagamentos e dashboard admin.\n- **WhatsApp Campaigns**: sistema de campanhas em massa com listas, templates, agendamento e analytics.\n- **VSCode Portfolio**: portfólio interativo inspirado no VS Code.',
        'Está disponível para trabalho?':
          'Sim, estou aberto a oportunidades como **Full-Stack Developer**, especialmente com **React**, **Next.js**, **Node.js**, **NestJS**, cloud e sistemas escaláveis. Você pode chamar pelo LinkedIn ou WhatsApp.',
      },
    },
    contact: {
      tag: '✉ Contato',
      terminalPath: '~/luiz/contact',
      command: 'open new-opportunity.md',
      path: 'contact/request',
      titleTop: 'Vamos construir',
      titleBottom: 'algo juntos?',
      description:
        'Aberto a oportunidades full-time, freelance e projetos interessantes. Manda uma mensagem!',
      buttonTitle: 'Entre em contato',
      buttonText: 'Chamar no LinkedIn →',
      projects: 'Ver projetos',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      whatsappText:
        'Olá, Luiz! Vi seu portfólio e gostaria de conversar.',
    },
    palette: {
      placeholder: 'Buscar comandos...',
      navigate: 'Navegar',
      links: 'Links',
      goTo: 'Ir para',
      openGithub: 'Abrir GitHub',
      openLinkedin: 'Abrir LinkedIn',
      openWhatsapp: 'Abrir WhatsApp',
    },
    footer: {
      copy: '© 2026 Luiz Fernando Rodrigues — Full-Stack Developer',
    },
  },
  'en-US': {
    nav: {
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      aiChat: 'AI Chat',
      contact: 'Contact',
      menu: 'Menu',
      language: 'Language',
    },
    hero: {
      available: 'Available for work',
      titleTop: 'Full-Stack',
      titleEm: 'Developer',
      description:
        'Hi! I am Luiz Fernando, a developer focused on JavaScript/TypeScript, with experience in Golang, Node.js, Bun, React, NestJS, and AWS. I build scalable products from backend to frontend.',
      projects: 'View Projects →',
      contact: 'Contact Me',
      cardRole: 'Full-Stack Developer',
      years: 'Years exp.',
      codeHours: 'Hours coding',
      caffeine: 'Caffeine',
    },
    about: {
      tag: '✦ About me',
      title: 'I build products, not just code.',
      paragraphs: [
        'I am a Full-Stack Developer focused on JavaScript/TypeScript and the Node/Bun ecosystem. I have solid experience building robust APIs, integrations, and modern frontends with React/Next.js.',
        'I have worked on education platforms, messaging systems, and microservices. My goal is always to deliver software that truly works: fast, scalable, and well tested.',
        'Currently learning new things in my spare time.',
      ],
      cta: 'Let\'s talk →',
      stats: {
        years: 'Years exp.',
        projects: 'Projects',
        techs: 'Technologies',
      },
    },
    experiences: [
      {
        company: 'Sphera Academy',
        role: 'Full-Stack Developer · Remote',
        description:
          'Development of an international education platform using Next.js, AWS, and event-driven architecture. Implemented database performance optimizations, caching, and AI integrations for automated essay and resume review.',
      },
      {
        company: 'Chave 7',
        role: 'Backend Developer · Remote',
        description:
          'Microservices with NestJS, AWS SQS/S3 integrations, payment gateways, automated notifications, and CI/CD with GitHub Actions on AWS ECS.',
      },
      {
        company: '4TH Dimension',
        role: 'Full-Stack Developer · Remote',
        description:
          'Automated WhatsApp campaign system with scheduling, throughput control, and real-time monitoring via WebSocket.',
      },
    ],
    skills: {
      tag: '⚙ Technologies',
      terminalPath: '~/luiz/skills',
      command: 'run stack --production',
      groups: [
        {
          label: 'Languages',
          command: 'compile',
          items: ['TypeScript', 'JavaScript', 'Golang'],
        },
        {
          label: 'Backend',
          command: 'build api',
          items: ['Node.js', 'Bun', 'Nest.js', 'Fastify', 'Express', 'GraphQL', 'Socket.io'],
        },
        {
          label: 'Frontend',
          command: 'ship ui',
          items: ['Next.js', 'React.js', 'Tailwind'],
        },
        {
          label: 'Database',
          command: 'query',
          items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'Drizzle'],
        },
        {
          label: 'DevOps',
          command: 'deploy',
          items: ['Docker', 'AWS', 'RabbitMQ', 'Git', 'GitHub Actions'],
        },
      ],
      workMode: 'Work mode',
      workModeText: 'Clean architecture, pragmatic delivery.',
      signalItems: ['Microservices', 'Clean Arch.', 'Event-Driven', 'CI/CD'],
      extraTechItems: [
        'VS Code',
        'Linux',
        'Postman',
        'Insomnia',
        'GitHub Actions',
        'REST API',
        'Microservices',
        'Clean Architecture',
        'CI/CD',
        'Monorepo',
        'Event-Driven',
        'SOLID',
        'Design Patterns',
        'Terraform',
        'Kubernetes',
        'Kafka',
      ],
    },
    projects: {
      tag: '✦ Projects',
      titleTop: 'Things',
      titleBottom: 'I built.',
      more: 'See more on GitHub →',
      github: 'GitHub →',
      site: 'Site →',
      items: [
        {
          title: 'Microservice Streaming',
          type: 'In Progress · Microservices',
          description:
            'Multipart upload with per-part retry and resume at any point — resilient to failures. Video processing in Golang, upload API with Node.js/Express, Redis and RabbitMQ. Observability with Grafana and Prometheus.',
          tags: ['Golang', 'Node.js', 'RabbitMQ', 'Redis', 'Grafana'],
          link: 'https://github.com/LuizFernando991/streaming-microservices',
          thumb: 'dark',
        },
        {
          title: 'VSCode Portfolio',
          type: 'Portfolio · Visual',
          description:
            'Personal website themed around a VSCode-inspired layout. An interactive and creative experience for developers visiting the portfolio.',
          tags: ['React', 'CSS', 'UI/UX'],
          link: 'https://devluizfernando.com.br/',
          thumb: 'purple',
        },
        {
          title: 'Sphera Academy',
          type: 'Edtech · Full-Stack',
          description:
            'Education platform for students aiming to study abroad. Progress tracking, queues, async jobs, caching, and AWS cloud deployment.',
          tags: ['Next.js', 'AWS', 'Cloudinary'],
          link: 'https://www.spheraacademy.com/',
          thumb: 'peach',
        },
        {
          title: 'Golang Raw Router',
          type: 'Open Source · Backend',
          description:
            'API in Go with no HTTP frameworks. Routing manually implemented using only net/http and regular expressions to map routes.',
          tags: ['Go', 'net/http', 'REST'],
          link: 'https://github.com/LuizFernando991/golang-raw-router',
          thumb: 'green',
        },
      ],
    },
    aiChat: {
      tag: '✦ AI ASSISTANT',
      title: 'Ask anything about me',
      description:
        'Want to know about my AWS experience? Which stack I master? How I work? Ask here: an AI trained with my resume will answer.',
      status: 'Ready to answer',
      badge: '✦ Free AI',
      thinking: 'Thinking...',
      suggestionsLabel: 'Try asking:',
      placeholder: 'Ask a question about Luiz...',
      sendLabel: 'Send',
      initial:
        "Hi! I am Luiz's assistant. Ask about experience, stack, projects, or anything professional about him!",
      error: 'I could not answer right now. Please try again in a moment.',
      suggestions: [
        'What is your main stack?',
        'Do you have AWS experience?',
        'What projects have you built?',
        'Are you available for work?',
      ],
      presetResponses: {
        'What is your main stack?':
          'My main stack is **TypeScript** full-stack: **React/Next.js** on the frontend and **Node.js/NestJS** on the backend. I also work well with **PostgreSQL**, **Redis**, **Docker**, **AWS**, and microservices architectures.',
        'Do you have AWS experience?':
          'Yes. I have experience using **AWS** in web applications and scalable platforms, including deployment, infrastructure, pipelines, and support services for Node.js/Next.js applications.',
        'What projects have you built?':
          'Some highlight projects:\n\n- **Microservices Streaming Platform**: video platform with transcoding, RabbitMQ, Docker, FFmpeg, and Redis.\n- **Sphera Academy**: e-learning platform with courses, lessons, progress tracking, payments, and admin dashboard.\n- **WhatsApp Campaigns**: bulk campaign system with contact lists, templates, scheduling, and analytics.\n- **VSCode Portfolio**: interactive portfolio inspired by VS Code.',
        'Are you available for work?':
          'Yes, I am open to opportunities as a **Full-Stack Developer**, especially with **React**, **Next.js**, **Node.js**, **NestJS**, cloud, and scalable systems. You can reach out via LinkedIn or WhatsApp.',
      },
    },
    contact: {
      tag: '✉ Contact',
      terminalPath: '~/luiz/contact',
      command: 'open new-opportunity.md',
      path: 'contact/request',
      titleTop: "Let's build",
      titleBottom: 'something together?',
      description:
        'Open to full-time opportunities, freelance work, and interesting projects. Send me a message!',
      buttonTitle: 'Get in touch',
      buttonText: 'Message me on LinkedIn →',
      projects: 'View projects',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      whatsappText:
        'Hi Luiz! I saw your portfolio and would like to talk.',
    },
    palette: {
      placeholder: 'Search commands...',
      navigate: 'Navigate',
      links: 'Links',
      goTo: 'Go to',
      openGithub: 'Open GitHub',
      openLinkedin: 'Open LinkedIn',
      openWhatsapp: 'Open WhatsApp',
    },
    footer: {
      copy: '© 2026 Luiz Fernando Rodrigues — Full-Stack Developer',
    },
  },
} as const;

export type Translation = (typeof translations)[Locale];
