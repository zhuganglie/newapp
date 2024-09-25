'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FaRegEnvelope,  FaXTwitter, FaGithub  } from 'react-icons/fa6';

const SideBar = forwardRef(({ isOpen, setIsSidebarOpen }, ref) => {
  const pathname = usePathname();

  const handleClick = (href) => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside
      ref={ref}
      className={`bg-gray-900 p-8 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-300 md:flex-col ${isOpen ? 'flex-col' : 'hidden'}`}
    >
      <div>
      <h1 className="text-center text-3xl font-bold text-blue-500">Why?</h1>
      <p className="text-center">γνῶθι σεαυτόν</p>
      </div>
      <div className="p-6">
        <ul className="text-center">
          <li>
            <Link
              href="/about"
              onClick={() => handleClick('/about')}
              className={`text-white hover:text-gray-300 ${pathname === '/about' ? 'font-bold' : 'font-medium'}`}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              onClick={() => handleClick('/posts')}
              className={`text-white hover:text-gray-300 ${pathname.includes('/posts') ? 'font-bold' : 'font-medium'}`}
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/tags"
              onClick={() => handleClick('/tags')}
              className={`text-white hover:text-gray-300 ${pathname.includes('/tags') ? 'font-bold' : 'font-medium'}`}
            >
              TAGS
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-6 flex justify-center space-x-4 md:p-4 ">
        <a href="#" className="text-white hover:text-gray-300">
        <FaRegEnvelope />
        </a>
        <a href="#" className="text-white hover:text-gray-300">
        <FaXTwitter />
        </a>
        <a href="#" className="text-white hover:text-gray-300">
        <FaGithub />
        </a>
      </div>
      <footer className="mt-8 md:mt-0">
        <p className="text-center text-gray-500 text-sm">&copy; 2024 zhuganglie - Built with Next.js</p>
      </footer>
    </aside>
  );
});

export default SideBar;
