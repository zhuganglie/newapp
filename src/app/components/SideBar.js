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
      className={`glass border-r border-white/5 p-8 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-500 ease-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="space-y-2 animate-fade-in">
        <h1 className="text-center font-bold text-3xl text-gradient font-serif tracking-wide">Why?</h1>
        <p className="text-center text-text-muted font-serif italic text-sm tracking-wider">Fact, Not Truth</p>
      </div>

      <nav className="p-6 w-full">
        <ul className="text-center px-0 mx-0 list-none space-y-4">
          {NAV_LINKS.map(({ href, label }, index) => (
            <li key={href} className="w-full" style={{ animationDelay: `${index * 100}ms` }}>
              <Link
                href={href}
                onClick={handleClick}
                className={`block w-full py-3 px-4 rounded-lg transition-all duration-300 relative group overflow-hidden ${isActiveLink(href)
                    ? 'bg-primary/10 text-primary font-bold shadow-[0_0_20px_rgba(251,191,36,0.1)]'
                    : 'text-text-muted hover:text-text-main hover:bg-white/5'
                  }`}
              >
                <span className="relative z-10 tracking-widest text-sm">{label}</span>
                {isActiveLink(href) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 flex justify-center space-x-8 md:p-4">
        {SOCIAL_LINKS.map(({ icon: Icon, href, ariaLabel }) => (
          <a
            key={ariaLabel}
            href={href}
            aria-label={ariaLabel}
            className="text-text-muted hover:text-primary transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
          >
            <Icon size={22} />
          </a>
        ))}
      </div>

      <footer className="border-t border-white/5 pt-6">
        <p className="text-center text-text-muted/60 text-xs footer-text tracking-wider">
          &copy; {new Date().getFullYear()} zhuganglie
        </p>
      </footer>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
