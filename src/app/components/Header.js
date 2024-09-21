'use client'
import Link from 'next/navigation';
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()
  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className={`${router === '/' ? 'font-bold' : ''} text-white hover:text-gray-300 font-medium`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className={`${router === '/about' ? 'font-bold' : ''} text-white hover:text-gray-300 font-medium`}>
              About
            </Link>
          </li>
          <li>
            <Link href="/tags" className={`${router === '/tags' ? 'font-bold' : ''} text-white hover:text-gray-300 font-medium`}>
              Tags
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
