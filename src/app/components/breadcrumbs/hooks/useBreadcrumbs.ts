import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbItem } from '../types';

export function useBreadcrumbs(customItems?: BreadcrumbItem[]) {
  const pathname = usePathname();

  return useMemo(() => {
    // If custom items are provided, use those instead of generating from pathname
    if (customItems) {
      return customItems;
    }

    // Skip empty segments and decode URI components
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .map(segment => decodeURIComponent(segment));

    // Generate breadcrumb items from path segments
    return segments.map((segment, index) => {
      // Build the href by joining all segments up to current index
      const href = '/' + segments.slice(0, index + 1).join('/');
      
      return {
        label: segment,
        href,
        // Last item in the array is the current page
        isCurrent: index === segments.length - 1
      };
    });
  }, [pathname, customItems]);
}
