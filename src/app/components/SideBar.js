'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FaRegEnvelope,  FaXTwitter, FaGithub  } from 'react-icons/fa6';

const SideBar = forwardRef(({ isOpen, setIsSidebarOpen }, ref) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside
      ref={ref}
      className={`bg-zinc-900 p-8 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-300 md:flex-col ${isOpen ? 'flex-col' : 'hidden'}`}
    >
      <div>
      <h1 className="text-center text-3xl font-bold text-yellow-500">Why?</h1>
      <p className="text-center text-zinc-300">γνῶθι σεαυτόν</p>
      </div>
      <div className="p-6">
        <ul className="text-center px-0 mx-0">
          <li>
            <Link
              href="/about"
              onClick={() => handleClick('/about')}
              className={`text-zinc-300 hover:text-zinc-300 ${pathname === '/about' ? 'font-bold text-yellow-500' : 'font-medium'}`}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href="/posts"
              onClick={() => handleClick('/posts')}
              className={`text-zinc-300 hover:text-zinc-300 ${pathname.includes('/posts') ? 'font-bold text-yellow-500' : 'font-medium'}`}
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/tags"
              onClick={() => handleClick('/tags')}
              className={`text-zinc-300 hover:text-zinc-300 ${pathname.includes('/tags') ? 'font-bold text-yellow-500' : 'font-medium'}`}
            >
              TAGS
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-6 flex justify-center space-x-4 md:p-4 ">
        <a href="#" className="text-zinc-300 hover:text-zinc-300">
        <FaRegEnvelope />
        </a>
        <a href="#" className="text-zinc-300 hover:text-zinc-300">
        <FaXTwitter />
        </a>
        <a href="#" className="text-zinc-300 hover:text-zinc-300">
        <FaGithub />
        </a>
      </div>
      <footer className="mt-8 md:mt-0">
        <p className="text-center text-zinc-500 text-sm">&copy; 2024 zhuganglie - Built with Next.js</p>
      </footer>
    </aside>
  );
});

export default SideBar;
