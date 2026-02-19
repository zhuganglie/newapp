'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FiFileText, FiHash, FiUser, FiMail, FiTwitter, FiYoutube } from 'react-icons/fi';
import SubscribeForm from './SubscribeForm';

const SOCIAL_LINKS = [
  { icon: FiMail, href: 'mailto:pyrrhonianpig@gmail.com', ariaLabel: 'Email' },
  { icon: FiTwitter, href: 'https://twitter.com/zhugangliet', ariaLabel: 'Twitter' },
  { icon: FiYoutube, href: 'https://www.youtube.com/@gangliezhu7951', ariaLabel: 'Youtube' }
];

const NAV_LINKS = [
  { href: '/posts', label: '全部文章', icon: FiFileText },
  { href: '/tags', label: '主题标签', icon: FiHash },
  { href: '/about', label: '关于', icon: FiUser }
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
      className={`bg-surface border-r border-border p-6 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-300 ease-out z-50 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header / Logo Area */}
      <div>
        <Link href="/" onClick={handleClick} className="block mb-8 no-underline group">
          <div className="flex flex-col items-center space-y-1 text-center">
            <h1 className="font-serif font-bold text-xl text-text-main tracking-tight border-none m-0 p-0 group-hover:text-primary transition-colors duration-200">
              政治的逻辑
            </h1>
            <p className="text-xs text-text-muted m-0 p-0 tracking-wide font-medium">
              The Logic of Politics
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="w-full px-2">
          <ul className="space-y-1 list-none p-0 m-0">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = isActiveLink(href);
              return (
                <li key={href} className="m-0 p-0">
                  <Link
                    href={href}
                    onClick={handleClick}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm no-underline font-medium
                      ${active
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-muted hover:text-text-main hover:bg-surface-hover'
                      }`}
                  >
                    <Icon size={18} className={`flex-shrink-0 ${active ? 'text-primary' : 'text-text-light group-hover:text-text-main'}`} />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Subscribe Card */}
      <div className="space-y-5 pb-2">
        <div className="mx-2 rounded-xl bg-gradient-to-br from-white to-surface-hover border border-border/60 shadow-sm p-4 text-center">
          <div className="flex flex-col items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-0.5">
              <FiMail size={14} />
            </div>
            <p className="text-xs font-bold text-text-main m-0 p-0">
              订阅更新
            </p>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed m-0 p-0 mb-3 px-1">
            新文章发布时通知你，<br />不定期更新。
          </p>
          <SubscribeForm compact />
        </div>

        <div className="flex justify-center gap-4 px-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, ariaLabel }) => (
            <a
              key={ariaLabel}
              href={href}
              aria-label={ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-text-light hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <footer className="border-t border-border/60 pt-4 px-3 text-center">
          <p className="text-text-light text-[10px] m-0 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} 政治的逻辑
          </p>
        </footer>
      </div>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
