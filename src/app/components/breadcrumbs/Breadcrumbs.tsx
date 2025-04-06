'use client';

import { BreadcrumbsProps } from './types';
import { useBreadcrumbs } from './hooks/useBreadcrumbs';
import BreadcrumbsList from './BreadcrumbsList';

/**
 * Breadcrumbs component that shows the current page location in a hierarchy.
 * Automatically generates breadcrumbs from the current URL path, or accepts custom items.
 *
 * @example
 * // Automatic breadcrumbs from URL
 * <Breadcrumbs />
 *
 * @example
 * // Custom breadcrumbs
 * <Breadcrumbs
 *   items={[
 *     { label: 'Category', href: '/category' },
 *     { label: 'Subcategory', href: '/category/subcategory' }
 *   ]}
 * />
 */
export default function Breadcrumbs({ 
  className,
  items: customItems,
 // showHomeIcon = true,
 // homeLabel = 'Home'
}: BreadcrumbsProps) {
  // Get breadcrumb items either from custom props or generated from URL
  const items = useBreadcrumbs(customItems);

  // Don't render if there are no breadcrumbs to show
  if (!items.length) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className={`flex sticky top-4 z-10 mb-6 mx-4 overflow-x-auto scrollbar-hide motion-safe:animate-fadeIn ${className ?? ''}`}
    >
      <BreadcrumbsList items={items} />
    </nav>
  );
}
