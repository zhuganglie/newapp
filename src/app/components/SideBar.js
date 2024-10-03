'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FaRegEnvelope, FaXTwitter, FaGithub } from 'react-icons/fa6';

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
        <h1 className="text-center font-bold text-zinc-200">Why?</h1>
        <p className="text-center text-zinc-300 font-serif font-semibold italic">Fact Rather Than Truth</p>
      </div>
      <div className="p-6">
        <ul className="text-center px-0 mx-0 list-none">
          
          <li>
            <Link
              href="/posts"
              onClick={() => handleClick('/posts')}
              className={` ${pathname.includes('/posts') ? 'font-bold text-yellow-300' : 'font-medium'}`}
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/tags"
              onClick={() => handleClick('/tags')}
              className={` ${pathname.includes('/tags') ? 'font-bold text-yellow-300' : 'font-medium'}`}
            >
              TAGS
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => handleClick('/about')}
              className={` ${pathname === '/about' ? 'font-bold text-ywllow-300' : 'font-medium'}`}
            >
              ABOUT
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-6 flex justify-center space-x-4 md:p-4">
        <a href="#" className="">
          <FaRegEnvelope />
        </a>
        <a href="#" className="">
          <FaXTwitter />
        </a>
        <a href="#" className="">
          <FaGithub />
        </a>
      </div>
      <footer className="mt-8 md:mt-0">
        <p className="text-center text-zinc-300 text-sm">&copy; {new Date().getFullYear()} zhuganglie - Powered by <a href="https://nextjs.org/">Next.js</a></p>
      </footer>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
