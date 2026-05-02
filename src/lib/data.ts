export interface Experience {
  company: string;
  role: string;
  description: string;
}

export interface Project {
  title: string;
  type: string;
  description: string;
  tags: string[];
  link: string;
  thumb: 'dark' | 'purple' | 'peach' | 'green';
}

export interface TechBlock {
  num: string;
  name: string;
  tag: string;
  size: 'xl' | 'lg' | 'md' | 'sm';
  bg: string;
  color: string;
  borderColor?: string;
}

export interface TechRow {
  offset: 'row1' | 'row2' | 'row3';
  items: TechBlock[];
}

export const experiences: Experience[] = [
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
];

export const projects: Project[] = [
  {
    title: 'Microservices Streaming',
    type: 'Principal · Microservices',
    description:
      'Plataforma de streaming construída com arquitetura de microserviços. Comunicação via gRPC e RabbitMQ, autenticação com AWS Cognito, containers Docker.',
    tags: ['NestJS', 'gRPC', 'Docker', 'AWS'],
    link: 'https://github.com/LuizFernando991',
    thumb: 'dark',
  },
  {
    title: 'VSCode Portfolio',
    type: 'Portfolio · Visual',
    description:
      'Site pessoal temático com layout inspirado no VSCode. Experiência interativa e criativa para devs visitarem o portfólio.',
    tags: ['React', 'CSS', 'UI/UX'],
    link: 'https://github.com/LuizFernando991',
    thumb: 'purple',
  },
  {
    title: 'Sphera Academy',
    type: 'Edtech · Full-Stack',
    description:
      'Plataforma educacional para alunos que buscam estudar no exterior. Sistema de progresso, cache, cloud deploy com AWS e DigitalOcean.',
    tags: ['Next.js', 'AWS', 'Cloudinary'],
    link: 'https://github.com/LuizFernando991',
    thumb: 'peach',
  },
  {
    title: 'WhatsApp Campaigns',
    type: 'SaaS · Messaging',
    description:
      'Sistema de campanhas automatizadas de mensagens via WhatsApp. Agendamento, controle de velocidade e monitoramento em tempo real com WebSocket.',
    tags: ['Node.js', 'WebSocket', 'API'],
    link: 'https://github.com/LuizFernando991',
    thumb: 'green',
  },
];

export const techRows: TechRow[] = [
  {
    offset: 'row1',
    items: [
      { num: '01', name: 'NestJS', tag: 'Backend', size: 'xl', bg: 'var(--purple)', color: '#fff' },
      { num: '02', name: 'Node.js', tag: 'Runtime', size: 'lg', bg: '#a8ff78', color: '#000' },
      {
        num: '03',
        name: 'TypeScript',
        tag: 'Language',
        size: 'md',
        bg: '#1e1e2e',
        color: '#c4b5f4',
      },
      { num: '04', name: 'GraphQL', tag: 'API', size: 'sm', bg: 'var(--purple-bg)', color: '#000' },
      { num: '05', name: 'Redis', tag: 'Cache', size: 'sm', bg: '#2a2a2a', color: '#a8ff78' },
    ],
  },
  {
    offset: 'row2',
    items: [
      {
        num: '06',
        name: 'React',
        tag: 'Frontend',
        size: 'md',
        bg: '#111',
        color: '#67e8f9',
        borderColor: '#222',
      },
      {
        num: '07',
        name: 'Next.js',
        tag: 'Full-stack',
        size: 'xl',
        bg: 'var(--peach)',
        color: '#000',
      },
      { num: '08', name: 'Tailwind', tag: 'CSS', size: 'sm', bg: '#0f172a', color: '#38bdf8' },
      { num: '09', name: 'Go', tag: 'Aprendendo', size: 'lg', bg: '#00acd7', color: '#000' },
      {
        num: '10',
        name: 'Prisma',
        tag: 'ORM',
        size: 'sm',
        bg: '#1a1a1a',
        color: '#f9a8d4',
        borderColor: '#333',
      },
    ],
  },
  {
    offset: 'row3',
    items: [
      { num: '11', name: 'AWS', tag: 'Cloud', size: 'sm', bg: '#ff9900', color: '#000' },
      { num: '12', name: 'Docker', tag: 'Containers', size: 'md', bg: '#1d4ed8', color: '#fff' },
      {
        num: '13',
        name: 'CI/CD',
        tag: 'Pipelines',
        size: 'sm',
        bg: '#181818',
        color: '#fff',
        borderColor: '#333',
      },
      {
        num: '14',
        name: 'Postgres',
        tag: 'Database',
        size: 'xl',
        bg: 'var(--green)',
        color: '#000',
      },
      { num: '15', name: 'RabbitMQ', tag: 'Queue', size: 'sm', bg: '#2a1a3e', color: '#c4b5f4' },
    ],
  },
];

export const extraTechItems: string[] = [
  'Express',
  'MongoDB',
  'MySQL',
  'Socket.io',
  'gRPC',
  'Jest',
  'Sequelize',
  'Apollo',
  'React Query',
  'EC2',
  'S3',
  'Lambda',
  'SQS',
  'Microservices',
  'Clean Arch.',
  'Gitflow',
  'Styled Components',
  'Axios',
  'English B2',
];
