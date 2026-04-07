import Link from 'next/link'
import { searchPosts } from '@/lib/posts'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import CategoryBadge from '@/app/components/CategoryBadge'

export async function generateMetadata({ searchParams }) {
  const { q } = await searchParams
  const query = q || ''
  return generateSEOMetadata({
    title: query ? `搜索结果: ${query}` : '搜索文章',
    description: `在「政治的逻辑」中搜索关于 ${query} 的文章。`,
    path: `/search?q=${encodeURIComponent(query)}`,
  })
}

export default async function SearchPage({ searchParams }) {
  const { q } = await searchParams
  const query = q || ''
  const posts = await searchPosts(query)

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center gap-2 text-text-muted mb-4">
            <Link href="/posts" className="hover:text-primary transition-colors no-underline text-xs uppercase tracking-widest font-bold">
              全部文章
            </Link>
            <span className="text-border">/</span>
            <span className="text-xs uppercase tracking-widest font-bold">搜索结果</span>
          </div>
          
          <h1 className="text-3xl font-serif font-bold text-text-main mb-2 border-none">
            {query ? `“${query}” 的搜索结果` : '搜索文章'}
          </h1>
          <p className="text-sm text-text-muted">
            {query ? `找到 ${posts.length} 篇相关文章` : '请输入搜索关键词...'}
          </p>
        </header>

        <div className="space-y-0">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <article
                key={post.slug}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-6 px-3 -mx-3 rounded-md hover:bg-surface-hover transition-colors border-b border-border/40 last:border-none no-underline"
                >
                  <time className="text-sm text-text-light font-mono whitespace-nowrap flex-shrink-0 tabular-nums">
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </time>

                  <div className="flex flex-col flex-grow min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-text-main group-hover:text-primary transition-colors font-bold truncate text-lg">
                        {post.title ?? 'Untitled'}
                      </span>
                      <CategoryBadge category={post.category} className="hidden sm:inline-flex" />
                    </div>
                    {post.description && (
                      <p className="text-sm text-text-muted line-clamp-1 italic opacity-80 group-hover:opacity-100 transition-opacity">
                        {post.description}
                      </p>
                    )}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="hidden lg:flex gap-1.5 flex-shrink-0">
                      {post.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="text-[10px] text-text-light/70 uppercase tracking-widest">
                          # {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))
          ) : (
            query && (
              <div className="py-20 text-center bg-surface-hover/30 rounded-xl border border-border/40">
                <p className="text-text-muted mb-4">没有找到与 “{query}” 相关的文章</p>
                <Link href="/posts" className="text-primary hover:underline text-sm font-medium">
                  浏览全部文章 &rarr;
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  )
}
