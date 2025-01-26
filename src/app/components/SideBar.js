'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FaRegEnvelope, FaXTwitter, FaGithub } from 'react-icons/fa6';

const SOCIAL_LINKS = [
  { icon: FaRegEnvelope, href: '#', ariaLabel: 'Email' },
  { icon: FaXTwitter, href: '#', ariaLabel: 'Twitter' },
  { icon: FaGithub, href: '#', ariaLabel: 'GitHub' }
];

const NAV_LINKS = [
  { href: '/posts', label: 'BLOG' },
  { href: '/tags', label: 'TAGS' },
  { href: '/about', label: 'ABOUT' }
];

const SideBar = forwardRef(({ isOpen, setIsSidebarOpen }, ref) => {
  const pathname = usePathname();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const isActiveLink = (path) => {
    return path === '/about' 
      ? pathname === path
      : pathname.includes(path);
  };

  return (
    <aside
      ref={ref}
      className={`bg-zinc-900 p-8 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-300 ${isOpen ? 'flex' : 'hidden'}`}
    >
      <div>
        <h1 className="text-center font-bold text-yellow-500">Why?</h1>
        <p className="text-center text-zinc-300 font-serif font-semibold italic">Fact, Not Truth</p>
      </div>

      <nav className="p-6">
        <ul className="text-center px-0 mx-0 list-none">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={handleClick}
                className={isActiveLink(href) ? 'font-bold text-yellow-300' : 'font-medium'}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 flex justify-center space-x-4 md:p-4">
        {SOCIAL_LINKS.map(({ icon: Icon, href, ariaLabel }) => (
          <a key={ariaLabel} href={href} aria-label={ariaLabel}>
            <Icon />
          </a>
        ))}
      </div>

      <footer>
        <p className="text-center text-zinc-300 text-sm footer-text">
          &copy; {new Date().getFullYear()} zhuganglie - <a href="https://aider.chat/">aider</a> as copilot
        </p>
      </footer>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
