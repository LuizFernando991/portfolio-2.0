import type { Metadata } from 'next';
import { I18nProvider } from '@/lib/i18n-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Luiz Fernando — Full-Stack Developer',
  description:
    'Full-Stack Developer with experience in Node.js, React, NestJS, and AWS. Building scalable products from backend to frontend.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
