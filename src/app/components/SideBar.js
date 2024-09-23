'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SideBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-2 text-white bg-blue-500 rounded"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <aside
        className={`bg-gray-900 p-8 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'block' : 'hidden'} md:block`}
      >
        <h1 className="text-center text-3xl font-bold text-blue-500">YZC</h1>
        <div className="p-6">
          <ul className="text-center">
            <li>
              <Link
                href="/about"
                className={`text-white hover:text-gray-300 ${pathname === '/about' ? 'font-bold' : 'font-medium'}`}
              >
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className={`text-white hover:text-gray-300 ${pathname.includes('/posts') ? 'font-bold' : 'font-medium'}`}
              >
                BLOG
              </Link>
            </li>
            <li>
              <Link
                href="/tags"
                className={`text-white hover:text-gray-300 ${pathname.includes('/tags') ? 'font-bold' : 'font-medium'}`}
              >
                TAGS
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-6 flex justify-center space-x-4 md:p-4 md:justify-end">
          <a href="#" className="text-white hover:text-gray-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            <i className="fab fa-github"></i>
          </a>
        </div>
        <footer className="mt-8 md:mt-0">
          <p className="text-center text-gray-500 text-sm">&copy; 2024 My Blog - Built with Next.js</p>
        </footer>
      </aside>
    </div>
  );
}
