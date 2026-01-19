import './globals.css';
import 'prism-themes/themes/prism-dracula.css';
import 'katex/dist/katex.min.css';
import ClientLayout from './components/ClientLayout';
import GoogleAnalytics from './components/GoogleAnalytics';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: 'Why? 为什么？',
  description: 'Why? 我的好奇心 - 记录学习（摸鱼）日常，偶尔假装正经。',
  path: '/',
  keywords: ['杂记', '政治学', '比较政治', '威权政治', 'comparative politics', 'authoritarian politics']
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <GoogleAnalytics />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
