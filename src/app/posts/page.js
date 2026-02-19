import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: '全部文章',
  description: '浏览「政治的逻辑」全部文章，涵盖比较政治、威权政治、民主化等话题。',
  path: '/posts',
  keywords: ['文章列表', '政治科学', '比较政治', '威权政治']
});


export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-text-main mb-8 border-none animate-fade-in">
          全部文章
        </h1>

        <div className="space-y-0">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <Link
                href={`/posts/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 px-3 -mx-3 rounded-md hover:bg-surface-hover transition-colors no-underline hover:no-underline"
              >
                <time className="text-sm text-text-light font-mono whitespace-nowrap flex-shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </time>

                <span className="text-text-main group-hover:text-primary transition-colors font-medium flex-grow">
                  {post.title ?? 'Untitled'}
                </span>

                {post.tags && post.tags.length > 0 && (
                  <div className="hidden md:flex gap-1.5 flex-shrink-0">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs text-text-light px-2 py-0.5 bg-surface rounded">
                        {tag}
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
