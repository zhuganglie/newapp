export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;
  
  /**
   * Optional custom items to override automatic path-based breadcrumbs
   */
  items?: BreadcrumbItem[];
  
  /**
   * Whether to show the home icon
   * @default true
   */
  showHomeIcon?: boolean;
  
  /**
   * Custom home label text
   * @default "Home"
   */
  homeLabel?: string;
}

export interface BreadcrumbItemProps extends BreadcrumbItem {
  /**
   * Whether to show the separator before this item
   */
  showSeparator?: boolean;
}

export interface BreadcrumbsListProps {
  items: BreadcrumbItem[];
}
