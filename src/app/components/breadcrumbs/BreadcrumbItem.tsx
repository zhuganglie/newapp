'use client';

import Link from 'next/link';
import { BreadcrumbItemProps } from './types';
import ChevronIcon from './icons/ChevronIcon';

export default function BreadcrumbItem({
  label,
  href,
  isCurrent,
  showSeparator
}: BreadcrumbItemProps) {
  return (
    <li className="flex items-center min-w-0">
      {showSeparator && (
        <span
          className="mx-1.5 text-zinc-500 inline-flex items-center motion-safe:animate-fadeIn"
          aria-hidden="true"
        >
          <ChevronIcon className="h-3 w-3 transform transition-transform duration-200" />
        </span>
      )}

      {isCurrent ? (
        <span
          className="text-primary font-medium truncate inline-block px-2 py-1 rounded-full bg-primary/10 border border-primary/20"
          aria-current="page"
          title={label}
        >
          {label}
        </span>
      ) : (
        <Link
          href={href}
          className="text-text-muted hover:text-primary transition-all duration-300 truncate inline-block rounded-full px-2 py-1 hover:bg-surface/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          title={label}
        >
          {label}
        </Link>
      )}
    </li>
  );
}
