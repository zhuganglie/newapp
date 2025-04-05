'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * @param {{ segment: string; href: string; isLast: boolean }} props
 */
const BreadcrumbSegment = ({ segment, href, isLast }) => {
  const decodedSegment = decodeURIComponent(segment);

  return (
    <li key={segment} aria-current={isLast ? 'page' : undefined}>
      <div className="flex items-center">
        <span className="mx-2 text-zinc-600" aria-hidden="true">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        {isLast ? (
          <span 
            className="text-zinc-300 font-medium truncate max-w-[200px] inline-block align-middle"
            title={decodedSegment}
          >
            {decodedSegment}
          </span>
        ) : (
          <Link 
            href={href}
            className="text-zinc-400 hover:text-[#d9a705] hover:scale-105 active:scale-95 transition-all duration-200 truncate max-w-[200px] inline-block align-middle rounded px-2 py-1 hover:bg-zinc-700/30"
            title={decodedSegment}
          >
            {decodedSegment}
          </Link>
        )}
      </div>
    </li>
  );
};

const BreadcrumbSegments = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = '/' + segments.slice(0, index + 1).join('/');
        
        return (
          <BreadcrumbSegment 
            key={segment}
            segment={segment}
            href={href}
            isLast={isLast}
          />
        );
      })}
    </>
  );
};

export default function Breadcrumbs() {
  return (
    <nav 
      aria-label="breadcrumb"
      className="sticky top-4 z-10 mb-6 mx-4 overflow-x-auto scrollbar-none motion-safe:animate-fadeIn"
    >
      <ul className="flex items-center text-sm whitespace-nowrap bg-zinc-800/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-zinc-700/50 shadow-lg shadow-black/5">
        <li>
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-zinc-400 hover:text-[#d9a705] hover:scale-105 active:scale-95 transition-all duration-200 rounded px-2 py-1 hover:bg-zinc-700/30 inline-block align-middle"
            >
              Home
            </Link>
          </div>
        </li>
        <li className="flex items-center">
        <BreadcrumbSegments />
        </li>
      </ul>
    </nav>
  );
}
