'use client';

import Link from 'next/link';
import { BreadcrumbsListProps } from './types';
import BreadcrumbItem from './BreadcrumbItem';
import HomeIcon from './icons/HomeIcon';

export default function BreadcrumbsList({ items }: BreadcrumbsListProps) {
  return (
    <ol
      className="flex items-center list-none min-w-0 px-3 py-2 bg-surface/30 backdrop-blur-md rounded-full border border-white/10 shadow-lg hover:border-primary/20 transition-colors duration-300"
      role="list"
    >
      <li className="flex items-center min-w-0 mb-0 mt-2 ">
        <Link
          href="/"
          className="text-text-muted hover:text-primary transition-all duration-300 rounded-full px-2 py-1 hover:bg-surface/50 focus:outline-none focus:ring-2 focus:ring-primary/50 truncate inline-flex items-center"
          aria-label="Navigate to home page"
        >
          <HomeIcon className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
      </li>

      {items.map((item) => (
        <BreadcrumbItem
          key={item.href}
          {...item}
          showSeparator
        />
      ))}
    </ol>
  );
}
