"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ClientComponent = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = '/' + segments.slice(0, index + 1).join('/');
     /*   const segmentDisplay = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '); */
        const decodedSegment = decodeURIComponent(segment);

        return (
          <li key={segment} aria-current={isLast ? 'page' : undefined}>
            <span className="mx-1 text-gray-500">/</span>
            {isLast ? (
              <span className="text-gray-700 truncate text-ellipsis overflow-hidden">{decodedSegment}</span>
            ) : (
              <Link href={href} className="hover:text-gray-600 truncate text-ellipsis overflow-hidden">
               {decodedSegment}
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
};

export default function Breadcrumbs() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-1 text-sm text-zinc-400 list-none list-inside">
        <li className="">
          <Link href="/" className="hover:text-zinc-400">
            Home
          </Link>
        </li>
        <ClientComponent />
      </ol>
    </nav>
  );
}
