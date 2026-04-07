import Link from 'next/link';
import { FiMail, FiTwitter, FiYoutube, FiRss } from 'react-icons/fi';

const SiteFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-border pt-12 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand & Mini-Bio */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border-2 border-primary/20 flex items-center justify-center font-serif font-black text-primary text-sm select-none">
               政
             </div>
             <span className="font-serif font-black text-xl text-primary tracking-tight">政治的逻辑</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed max-w-sm">
            用比较政治学视角，拆解真实世界的政治运作。这是一个致力于政治科学普及的结构化知识平台，旨在提供严谨、清晰的分析框架。
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:logicofpolitics25@gmail.com" className="text-text-light hover:text-primary transition-colors"><FiMail size={18} /></a>
            <a href="https://twitter.com/zhengzhideluoji" target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-primary transition-colors"><FiTwitter size={18} /></a>
            <a href="https://www.youtube.com/@the_logic_of_politics" target="_blank" rel="noopener noreferrer" className="text-text-light hover:text-primary transition-colors"><FiYoutube size={18} /></a>
            <Link href="/rss.xml" className="text-text-light hover:text-primary transition-colors"><FiRss size={18} /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-main mb-6">导航</h4>
          <ul className="space-y-4 list-none p-0 m-0">
            <li><Link href="/posts" className="text-sm text-text-muted hover:text-primary no-underline transition-colors">全部文章</Link></li>
            <li><Link href="/tags" className="text-sm text-text-muted hover:text-primary no-underline transition-colors">主题标签</Link></li>
            <li><Link href="/about" className="text-sm text-text-muted hover:text-primary no-underline transition-colors">关于本站</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-main mb-6">专题</h4>
          <ul className="space-y-4 list-none p-0 m-0">
            <li><Link href="/category/专题研究" className="text-sm text-text-muted hover:text-primary no-underline transition-colors">专题研究</Link></li>
            <li><Link href="/category/深度科普" className="text-sm text-text-muted hover:text-primary no-underline transition-colors">深度科普</Link></li>
            <li><Link href="/category/读书笔记" className="text-sm text-text-muted hover:text-primary no-underline transition-colors">读书笔记</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-text-light font-medium tracking-wide uppercase">
          &copy; {currentYear} THE LOGIC OF POLITICS · 政治的逻辑
        </p>
        <div className="flex items-center gap-6 text-[10px] text-text-light font-medium uppercase tracking-widest">
           <span>Academic Rigor</span>
           <span className="w-1 h-1 rounded-full bg-border" />
           <span>Empirical Analysis</span>
           <span className="w-1 h-1 rounded-full bg-border" />
           <span>Structural Framework</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
