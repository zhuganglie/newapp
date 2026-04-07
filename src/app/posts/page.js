import Link from 'next/link'
import { getPosts, getUniqueCategories } from '@/lib/posts'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import CategoryBadge from '@/app/components/CategoryBadge'

export const metadata = generateSEOMetadata({
  title: '全部文章列表',
  description: '浏览「政治的逻辑」全部文章，涵盖比较政治、威权政治、民主化等话题。',
  path: '/posts',
  keywords: ['文章列表', '政治科学', '比较政治', '威权政治']
});

export default async function BlogPage() {
  const posts = await getPosts()
  const categories = await getUniqueCategories()

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 animate-fade-in">
          <h1 className="text-3xl font-serif font-bold text-text-main mb-6 border-none">
            全部文章
          </h1>
          
          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="text-text-muted mr-2">筛选分类:</span>
            <Link 
              href="/posts" 
              className="px-3 py-1 bg-primary text-white rounded-full text-xs font-medium no-underline"
            >
              全部
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat} 
                href={`/category/${cat}`}
                className="px-3 py-1 bg-surface border border-border text-text-muted hover:text-primary transition-colors rounded-full text-xs font-medium no-underline"
              >
                {cat}
              </Link>
            ))}
          </div>
        </header>

        <div className="space-y-0">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <Link
                href={`/posts/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-4 px-3 -mx-3 rounded-md hover:bg-surface-hover transition-colors no-underline"
              >
                <time className="text-sm text-text-light font-mono whitespace-nowrap flex-shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>

                <div className="flex flex-col flex-grow min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-text-main group-hover:text-primary transition-colors font-medium truncate">
                      {post.title ?? 'Untitled'}
                    </span>
                    <CategoryBadge category={post.category} className="hidden sm:inline-flex" />
                  </div>
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
          ))}
        </div>
      </div>
    </main>
  )
}
