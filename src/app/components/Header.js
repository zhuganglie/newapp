'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', matchPattern: (path) => path === '/' },
  { href: '/about', label: 'About', matchPattern: (path) => path === '/about' },
  { href: '/tags', label: 'Topics', matchPattern: (path) => path.includes('/tags') },
  { href: '/posts', label: 'Blog', matchPattern: (path) => path.includes('/posts') }
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest('ul.flex.space-x-6')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const getLinkClassName = (matchPattern) => `
    text-white hover:text-gray-300 
    ${matchPattern(pathname) ? 'font-bold text-yellow-400' : 'font-medium'}
  `.trim();

  return (
    <header className="bg-gray-900">
      <nav className="container mx-auto px-2 py-3 md:px-4 md:py-6 flex items-center justify-between">
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <ul
          className={`flex space-x-2 md:space-x-6 md:flex-row ${
            isOpen
              ? 'flex flex-col absolute top-16 left-0 right-0 bg-gray-900 p-4 space-y-4'
              : 'hidden md:flex'
          } md:static text-base md:text-lg`}
        >
          {NAV_ITEMS.map(({ href, label, matchPattern }) => (
            <li key={href}>
              <Link
                href={href}
                className={getLinkClassName(matchPattern)}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
