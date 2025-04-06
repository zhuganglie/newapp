'use client';

import Link from 'next/link';
import { BreadcrumbsListProps } from './types';
import BreadcrumbItem from './BreadcrumbItem';
import HomeIcon from './icons/HomeIcon';

export default function BreadcrumbsList({ items }: BreadcrumbsListProps) {
  return (
    <ol 
      className="flex items-center list-none min-w-0 px-3 py-2 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800/50 shadow-lg"
      role="list"
    >
      <li className="flex items-center min-w-0 mb-0 mt-2 ">
        <Link 
          href="/"
          className="text-zinc-400 hover:text-zinc-100 transition-all duration-200 rounded px-2 py-1 hover:bg-zinc-800/70 hover:backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1 focus:ring-offset-zinc-900 truncate inline-flex items-center"
          aria-label="Navigate to home page"
        >
          <HomeIcon className="w-3.5 h-3.5 mr-1" />
          Home
        </Link>
      </li>

      {items.map((item, index) => (
        <BreadcrumbItem
          key={item.href}
          {...item}
          showSeparator
        />
      ))}
    </ol>
  );
}
