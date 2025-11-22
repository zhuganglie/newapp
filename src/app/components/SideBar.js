'use client'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FaRegEnvelope, FaXTwitter, FaGithub, FaPenNib, FaHashtag, FaUserAstronaut, FaYoutube } from 'react-icons/fa6';

const SOCIAL_LINKS = [
  { icon: FaRegEnvelope, href: 'mailto:zhuganglie@gmail.com', ariaLabel: 'Email' },
  { icon: FaXTwitter, href: 'https://twitter.com/zhugangliet', ariaLabel: 'Twitter' },
  { icon: FaYoutube, href: 'https://www.youtube.com/@gangliezhu7951', ariaLabel: 'Youtube' }
];

const NAV_LINKS = [
  { href: '/posts', label: 'BLOG', icon: FaPenNib },
  { href: '/tags', label: 'TAGS', icon: FaHashtag },
  { href: '/about', label: 'ABOUT', icon: FaUserAstronaut }
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
      className={`glass border-r border-white/5 p-8 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-500 ease-out z-50 w-80 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header / Logo Area */}
      <div className="flex flex-col items-center space-y-6 animate-fade-in">
        <div className="relative w-32 h-32 group">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50"></div>
          <Image
            src="/zhuganglie_transparent.svg"
            alt="Logo"
            width={128}
            height={128}
            className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="text-center space-y-1">
          <h1 className="font-bold text-3xl text-gradient font-serif tracking-wide">Why?</h1>
          <p className="text-text-muted font-serif italic text-sm tracking-wider opacity-80">Fact, Not Truth</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full px-2">
        <ul className="space-y-3">
          {NAV_LINKS.map(({ href, label, icon: Icon }, index) => {
            const active = isActiveLink(href);
            return (
              <li key={href} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-in-left">
                <Link
                  href={href}
                  onClick={handleClick}
                  className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 overflow-hidden
                    ${active
                      ? 'bg-white/5 text-primary shadow-[0_0_30px_rgba(251,191,36,0.15)] border border-primary/20'
                      : 'text-text-muted hover:text-text-main hover:bg-white/5 border border-transparent hover:border-white/5'
                    }`}
                >
                  {/* Active Background Glow */}
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-100" />
                  )}

                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <span className={`relative z-10 text-xl transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
                    <Icon />
                  </span>

                  {/* Label */}
                  <span className="relative z-10 font-bold tracking-widest text-sm">
                    {label}
                  </span>

                  {/* Active Indicator Dot */}
                  {active && (
                    <span className="absolute right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(251,191,36,0.8)] animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / Socials */}
      <div className="space-y-6">
        <div className="flex justify-center gap-6">
          {SOCIAL_LINKS.map(({ icon: Icon, href, ariaLabel }) => (
            <a
              key={ariaLabel}
              href={href}
              aria-label={ariaLabel}
              className="group relative p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
            >
              <Icon size={20} className="text-text-muted group-hover:text-primary transition-colors duration-300" />
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </div>

        <footer className="border-t border-white/5 pt-6 text-center">
          <p className="text-text-muted/40 text-[10px] uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} zhuganglie
          </p>
        </footer>
      </div>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
