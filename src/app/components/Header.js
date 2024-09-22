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
            <Link href="/" className={`text-white hover:text-gray-300 ${pathname === '/' ? 'font-bold' : 'font-medium'}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={`text-white hover:text-gray-300 ${pathname === '/about' ? 'font-bold' : 'font-medium'}`}>
              About
            </Link>
          </li>
          <li>
          <Link href="/tags" className={`text-white hover:text-gray-300 ${pathname.includes( '/tags') ? 'font-bold' : 'font-medium'}`}>
          Tags
          </Link>
          </li>
          <li>
            <Link href="/blog" className={`text-white hover:text-gray-300 ${pathname === '/blog' ? 'font-bold' : 'font-medium'}`}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`text-white hover:text-gray-300 ${pathname === '/contact' ? 'font-bold' : 'font-medium'}`}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
