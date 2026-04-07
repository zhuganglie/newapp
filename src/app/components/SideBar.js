'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { forwardRef, useState } from 'react';
import { FiFileText, FiHash, FiUser, FiMail, FiTwitter, FiYoutube } from 'react-icons/fi';
import SubscribeForm from './SubscribeForm';

const SOCIAL_LINKS = [
  { icon: FiMail, href: 'mailto:logicofpolitics25@gmail.com', ariaLabel: 'Email' },
  { icon: FiTwitter, href: 'https://twitter.com/zhengzhideluoji', ariaLabel: 'Twitter' },
  { icon: FiYoutube, href: 'https://www.youtube.com/@the_logic_of_politics', ariaLabel: 'Youtube' }
];

const NAV_LINKS = [
  { href: '/posts', label: '全部文章', icon: FiFileText },
  { href: '/tags', label: '主题标签', icon: FiHash },
  { href: '/about', label: '关于本站', icon: FiUser }
];

const CATEGORY_LINKS = [
  { href: '/category/专题研究', label: '专题研究', color: 'bg-primary' },
  { href: '/category/深度科普', label: '深度科普', color: 'bg-emerald-500' },
  { href: '/category/读书笔记', label: '读书笔记', color: 'bg-amber-500' },
];

const SideBar = forwardRef(({ isOpen, setIsSidebarOpen }, ref) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      handleClick();
      setSearchQuery('');
    }
  };

  const isActiveLink = (path) => {
    const decodedPath = decodeURIComponent(pathname);
    const decodedTarget = decodeURIComponent(path);
    return decodedTarget === '/about'
      ? decodedPath === decodedTarget
      : decodedPath.includes(decodedTarget);
  };

  return (
    <aside
      ref={ref}
      className={`bg-surface border-r border-border p-6 h-screen fixed top-0 left-0 flex flex-col justify-between transition-transform duration-300 ease-out z-50 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header / Logo Area */}
      <div>
        <Link href="/" onClick={handleClick} className="block mb-10 no-underline group px-2">
          <div className="flex flex-col items-start space-y-1">
            <h1 className="font-serif font-black text-2xl text-primary tracking-tighter border-none m-0 p-0 transition-all duration-300 group-hover:tracking-normal">
              政治的逻辑
            </h1>
            <p className="text-[9px] uppercase text-text-muted m-0 p-0 tracking-[0.25em] font-bold italic opacity-70">
              The Logic of Politics
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="w-full space-y-10">
          {/* Search */}
          <section className="px-1 relative group/search">
            <input 
              type="text" 
              placeholder="搜索文章或主题..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-surface-hover/50 border border-border/40 rounded-md py-2 px-3.5 text-xs placeholder:text-text-light focus:outline-none focus:border-primary/30 transition-all font-sans"
            />
          </section>

          {/* Main Links */}
          <section>
            <ul className="space-y-1 list-none p-0 m-0">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => {
                const active = isActiveLink(href);
                return (
                  <li key={href} className="m-0 p-0">
                    <Link
                      href={href}
                      onClick={handleClick}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm no-underline font-medium
                        ${active
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-text-muted hover:text-text-main hover:bg-surface-hover'
                        }`}
                    >
                      <Icon size={16} className={`flex-shrink-0 ${active ? 'text-primary' : 'text-text-light'}`} />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Knowledge Map */}
          <section>
            <h2 className="px-3 text-[10px] uppercase tracking-[0.15em] text-text-light font-bold mb-3 border-none m-0">
              知识地图
            </h2>
            <ul className="space-y-1 list-none p-0 m-0">
              {CATEGORY_LINKS.map(({ href, label, color }) => {
                const active = isActiveLink(href);
                return (
                  <li key={href} className="m-0 p-0">
                    <Link
                      href={href}
                      onClick={handleClick}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm no-underline font-medium
                        ${active
                          ? 'bg-primary/10 text-primary shadow-sm'
                          : 'text-text-muted hover:text-text-main hover:bg-surface-hover'
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${color} ${active ? 'ring-4 ring-primary/10' : 'opacity-60'}`} />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </nav>
      </div>

      {/* Footer Area */}
      <div className="space-y-8">
        {/* Subscribe Compact */}
        <div className="mx-0 rounded-lg bg-surface-hover/30 border border-border/40 p-4 shadow-sm">
          <p className="text-[11px] font-bold text-text-main mb-3 px-1 uppercase tracking-wider">邮件订阅</p>
          <SubscribeForm compact />
        </div>

        <div className="flex flex-col gap-5 px-1">
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, ariaLabel }) => (
              <a
                key={ariaLabel}
                href={href}
                aria-label={ariaLabel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-light hover:text-primary transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
});

SideBar.displayName = 'SideBar';

export default SideBar;
