import Link from 'next/link'
import { getPostsByCategory, getUniqueCategories } from '@/lib/posts'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'
import CategoryBadge from '@/app/components/CategoryBadge'

export async function generateMetadata({ params }) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  return generateSEOMetadata({
    title: `${decodedCategory} - 文章列表`,
    description: `浏览「政治的逻辑」中关于 ${decodedCategory} 的深度内容。`,
    path: `/category/${category}`,
  })
}

export async function generateStaticParams() {
  const categories = await getUniqueCategories()
  return categories.map((category) => ({
    category: category,
  }))
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = await getPostsByCategory(decodedCategory)

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/posts" className="text-sm text-text-muted hover:text-primary transition-colors no-underline">
              &larr; 全部文章
            </Link>
          </div>

          <h1 className="text-3xl font-serif font-bold text-text-main mb-4 border-none">
            {decodedCategory}
          </h1>

          <p className="text-text-muted text-lg leading-relaxed max-w-xl">
            本板块收录关于「{decodedCategory}」的所有文章。
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
                  className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-5 px-3 -mx-3 rounded-md hover:bg-surface-hover transition-colors no-underline"
                >
                  <time className="text-sm text-text-light font-mono whitespace-nowrap flex-shrink-0 tabular-nums">
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </time>

                  <div className="flex flex-col flex-grow min-w-0">
                    <span className="text-text-main group-hover:text-primary transition-colors font-medium truncate">
                      {post.title}
                    </span>
                    {post.description && (
                      <p className="text-xs text-text-muted line-clamp-1 mt-1 font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                        {post.description}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center py-24">
              <p className="text-text-muted">暂无该分类下的文章。</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
