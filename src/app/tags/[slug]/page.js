import { getPostsByTag, getUniqueTags } from '@/lib/posts'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Generate metadata for tag pages
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = slug.includes('%') ? decodeURIComponent(slug) : slug;
  const posts = await getPostsByTag(decodedSlug);

  return generateSEOMetadata({
    title: `${decodedSlug}`,
    description: `浏览所有关于「${decodedSlug}」的文章 (${posts.length} 篇)`,
    path: `/tags/${slug}`,
    keywords: [decodedSlug, '标签', '政治科学']
  });
}

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = await getUniqueTags();
  return tags.map((tag) => ({
    slug: tag
  }));
}

export default async function TagPage({ params }) {
  const { slug } = await params;
  const decodedSlug = slug.includes('%') ? decodeURIComponent(slug) : slug;
  const posts = await getPostsByTag(decodedSlug);

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/tags"
              className="text-sm text-text-light hover:text-text-muted transition-colors no-underline hover:no-underline"
            >
              主题标签
            </Link>
            <span className="text-text-light">/</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-main border-none mb-2">
            {decodedSlug}
          </h1>
          <p className="text-sm text-text-muted m-0">
            {posts.length} 篇文章
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="space-y-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 px-3 -mx-3 rounded-md hover:bg-surface-hover transition-colors no-underline hover:no-underline"
              >
                {post.date && (
                  <time className="text-sm text-text-light font-mono whitespace-nowrap flex-shrink-0 tabular-nums">
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </time>
                )}
                <span className="text-text-main group-hover:text-primary transition-colors font-medium">
                  {post.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-text-muted">暂无相关文章</p>
          </div>
        )}
      </div>
    </main>
  )
}
