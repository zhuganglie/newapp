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
          className="text-zinc-100 font-medium truncate inline-block px-2 py-1 rounded bg-zinc-800/50 backdrop-blur-sm"
          aria-current="page"
          title={label}
        >
          {label}
        </span>
      ) : (
        <Link 
          href={href}
          className="text-zinc-400 hover:text-zinc-100 transition-all duration-200 truncate inline-block rounded px-2 py-1 hover:bg-zinc-800/70 hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-zinc-900"
          title={label}
        >
          {label}
        </Link>
      )}
    </li>
  );
}
