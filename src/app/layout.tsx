import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luiz Fernando — Full-Stack Developer',
  description:
    'Full-Stack Developer com experiência em Node.js, React, NestJS e AWS. Construo produtos escaláveis do back ao front.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
