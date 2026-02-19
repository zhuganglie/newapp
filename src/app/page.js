import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { generateMetadata as generateSEOMetadata, generateWebSiteSchema } from '@/lib/seo'
import SubscribeCTA from '@/app/components/SubscribeCTA'

export const metadata = generateSEOMetadata({
  title: '政治的逻辑',
  description: '用政治科学的方法，解读真实世界的政治逻辑。探索比较政治、威权政治、民主化等话题。',
  path: '/',
  keywords: ['政治科学', '比较政治', '威权政治', '政治学科普', '播客', 'comparative politics', 'authoritarian politics']
});

// Helper function to extract the first sentence from content
function getFirstSentence(content) {
  if (!content) return ''

  const plainText = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`{1,3}[^`]+`{1,3}/g, '')
    .replace(/[*_~]+/g, '')
    .trim()

  const match = plainText.match(/^[^.!?。！？]+[.!?。！？]/)
  return match ? match[0].trim() : plainText.split('\n')[0].slice(0, 150) + '...'
}

export default async function HomePage() {
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <main className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />

      {/* Hero Section */}
      <section className="py-16 md:py-24 animate-fade-in">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-main tracking-tight mb-4 border-none">
            政治的逻辑
          </h1>

          <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 max-w-xl">
            用政治科学的方法，解读真实世界的政治逻辑。
          </p>

          <div className="flex gap-3">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-text-main text-white rounded-md text-sm font-medium hover:bg-text-main/90 transition-colors no-underline hover:no-underline"
            >
              浏览全部文章
            </Link>

            <Link
              href="/tags"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-main rounded-md text-sm font-medium hover:bg-surface-hover transition-colors no-underline hover:no-underline"
            >
              按主题浏览
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <hr className="border-border" />

      {/* Recent Posts Section */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-serif font-bold text-text-main border-none m-0 p-0">
            最新文章
          </h2>
          <Link href="/posts" className="text-sm text-text-muted hover:text-text-main transition-colors no-underline hover:no-underline">
            查看全部 →
          </Link>
        </div>

        <div className="space-y-1">
          {recentPosts.map((post, index) => (
            <article
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <Link
                href={`/posts/${post.slug}`}
                className="group flex items-baseline gap-4 py-3 px-3 -mx-3 rounded-md hover:bg-surface-hover transition-colors no-underline hover:no-underline"
              >
                <time className="text-sm text-text-light font-mono whitespace-nowrap flex-shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>

                <span className="text-text-main group-hover:text-primary transition-colors font-medium truncate">
                  {post.title ?? 'Untitled'}
                </span>

                {post.tags && post.tags.length > 0 && (
                  <span className="hidden md:inline text-xs text-text-light flex-shrink-0">
                    {post.tags[0]}
                  </span>
                )}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Subscribe CTA */}
      <hr className="border-border" />
      <SubscribeCTA />
    </main>
  )
}