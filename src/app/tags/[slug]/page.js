import { getPostsByTag, getUniqueTags } from '@/lib/posts'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

// Generate metadata for tag pages
export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Handle both encoded and non-encoded slugs for compatibility
  const decodedSlug = slug.includes('%') ? decodeURIComponent(slug) : slug;
  const posts = await getPostsByTag(decodedSlug);

  return generateSEOMetadata({
    title: `${decodedSlug} - 标签`,
    description: `浏览所有关于 "${decodedSlug}" 的文章 (${posts.length} 篇)`,
    path: `/tags/${slug}`,
    keywords: [decodedSlug, '标签', '文章']
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
  // Handle both encoded and non-encoded slugs for compatibility
  const decodedSlug = slug.includes('%') ? decodeURIComponent(slug) : slug;
  const posts = await getPostsByTag(decodedSlug);

  return (
    <main className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary tracking-tight drop-shadow-lg pb-2">
              {decodedSlug}
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50" />
          </div>
          <div className="flex items-center justify-center gap-2 text-text-muted">
            <span className="px-3 py-1 rounded-full bg-surface/50 border border-white/5 text-sm font-mono">
              {posts.length} 篇文章
            </span>
          </div>
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group relative block"
                style={{ animation: `slideUp 0.8s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <article className="relative glass p-8 rounded-2xl border border-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-4 pl-4 border-l border-white/5 group-hover:border-transparent transition-colors">
                    {post.date && (
                      <time className="text-sm font-mono text-primary/80 block">
                        {new Date(post.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                    <h2 className="text-2xl font-bold text-text-main group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-white transition-all">
                      {post.title}
                    </h2>
                    {post.description && (
                      <p className="text-text-muted line-clamp-2 group-hover:text-text-main/80 transition-colors">
                        {post.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-secondary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <span>Read more</span>
                      <span>→</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl border border-white/5 animate-fade-in">
            <p className="text-xl text-text-muted">未找到相关文章</p>
          </div>
        )}
      </div>
    </main>
  )
}
