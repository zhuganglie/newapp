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
        <Link href="/" onClick={handleClick} className="block mb-8 no-underline">
          <div className="flex flex-col items-start space-y-1">
            <h1 className="font-serif font-bold text-xl text-text-main tracking-tight border-none m-0 p-0">
              政治的逻辑
            </h1>
            <p className="text-xs text-text-muted m-0 p-0 tracking-wide">
              The Logic of Politics
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="w-full">
          <ul className="space-y-0.5 list-none p-0 m-0">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = isActiveLink(href);
              return (
                <li key={href} className="m-0 p-0">
                  <Link
                    href={href}
                    onClick={handleClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-150 text-sm no-underline
                      ${active
                        ? 'bg-primary-light text-primary font-medium'
                        : 'text-text-muted hover:text-text-main hover:bg-surface-hover'
                      }`}
                  >
                    <Icon size={16} className="flex-shrink-0" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Subscribe Card */}
      <div className="space-y-4">
        <div className="mx-2 rounded-lg bg-gradient-to-br from-primary-light/60 to-surface border border-primary/10 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
              <FiMail size={13} className="text-primary" />
            </div>
            <p className="text-xs font-semibold text-text-main m-0 p-0">
              订阅更新
            </p>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed m-0 p-0 mb-3">
            新文章发布时通知你，不定期更新。
          </p>
          <SubscribeForm compact />
        </div>

        <div className="flex justify-start gap-3 px-3">
          {SOCIAL_LINKS.map(({ icon: Icon, href, ariaLabel }) => (
            <a
              key={ariaLabel}
              href={href}
              aria-label={ariaLabel}
              className="p-1.5 rounded-md text-text-light hover:text-primary hover:bg-primary-light/50 transition-all duration-150"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <footer className="border-t border-border pt-4 px-3">
          <p className="text-text-light text-[11px] m-0">
            &copy; {new Date().getFullYear()} 政治的逻辑
          </p>
        </footer>
      </div>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
