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
      'Plataforma de streaming sendo construída com arquitetura de microserviços. Comunicação via gRPC e RabbitMQ.',
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
      'Plataforma educacional para alunos que buscam estudar no exterior. Sistema de progresso, filas, jobs assíncronos cache, cloud deploy com AWS.',
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
