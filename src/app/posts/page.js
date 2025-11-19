import Link from 'next/link'
import { getPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary animate-fade-in tracking-tight drop-shadow-lg">
          全部文章
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative flex flex-col h-full"
              style={{ animation: `slideUp 0.8s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full glass p-8 rounded-2xl border border-white/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary/30 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <time className="text-sm font-mono text-primary/80 mb-4 block">
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                <Link
                  href={`/posts/${post.slug}`}
                  className="block text-2xl font-bold text-text-main group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-white transition-all mb-4 flex-grow"
                >
                  {post.title ?? 'Untitled'}
                </Link>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="px-3 py-1 text-xs rounded-full bg-surface/50 border border-white/10 text-text-muted hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
