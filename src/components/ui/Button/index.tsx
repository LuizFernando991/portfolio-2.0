import type { AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'purple' | 'peach';

interface ButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: ButtonVariant;
  children: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function isRouteHref(href: string) {
  return href.startsWith('/');
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export default function Button({
  href,
  variant = 'primary',
  children,
  className,
  target,
  rel,
  ...props
}: ButtonProps) {
  const buttonClassName = cx('btn', `btn-${variant}`, className);
  const external = isExternalHref(href);
  const safeTarget = target ?? (external ? '_blank' : undefined);
  const safeRel = rel ?? (external ? 'noopener noreferrer' : undefined);

  if (isRouteHref(href)) {
    return (
      <Link href={href} className={buttonClassName} target={safeTarget} rel={safeRel} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={buttonClassName} target={safeTarget} rel={safeRel} {...props}>
      {children}
    </a>
  );
}
