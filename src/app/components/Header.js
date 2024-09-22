"use client"
import Breadcrumbs from './Breadcrumbs';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-4 py-6">
        <Breadcrumbs />
      </nav>
    </header>
  );
}
