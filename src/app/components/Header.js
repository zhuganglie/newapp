'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('ul.flex.space-x-6')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
        <ul className={`flex space-x-6 ${isOpen ? 'flex flex-col' : 'hidden'} md:flex md:flex-row md:space-x-6`} onClick={() => setIsOpen(false)}>
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
            <Link href="/posts" className={`text-white hover:text-gray-300 ${pathname.includes('/posts') ? 'font-bold' : 'font-medium'}`}>
              Blog
            </Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}
