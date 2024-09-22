"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className={`text-white hover:text-gray-300 font-medium ${pathname === '/' ? 'font-bold' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={`text-white hover:text-gray-300 font-medium ${pathname === '/about' ? 'font-bold' : ''}`}>
              About
            </Link>
          </li>
          <li>
          <Link href="/tags" className={`text-white hover:text-gray-300 font-medium ${pathname === '/tags' ? 'font-bold' : ''}`}>
          Tags
          </Link>
          </li>
          <li>
            <Link href="/contact" className={`text-white hover:text-gray-300 font-medium ${pathname === '/contact' ? 'font-bold' : ''}`}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
