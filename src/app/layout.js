import './globals.css';
import 'prism-themes/themes/prism-one-light.css';
import 'katex/dist/katex.min.css';
import ClientLayout from './components/ClientLayout';
import GoogleAnalytics from './components/GoogleAnalytics';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata = generateSEOMetadata({
  title: '政治的逻辑',
  description: '用政治科学的方法，解读真实世界的政治逻辑。',
  path: '/',
  keywords: ['政治科学', '比较政治', '威权政治', '政治学科普', 'comparative politics', 'authoritarian politics', '播客']
});

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
