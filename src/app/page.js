import Link from 'next/link'
import { getPosts } from '@/lib/posts'

// Helper function to extract the first sentence from content
function getFirstSentence(content) {
  if (!content) return ''

  // Remove markdown syntax (headers, links, code blocks, etc.)
  const plainText = content
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/`{1,3}[^`]+`{1,3}/g, '') // Remove inline code and code blocks
    .replace(/[*_~]+/g, '') // Remove emphasis markers
    .trim()

  // Find the first sentence (ending with period, exclamation, or question mark)
  const match = plainText.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : plainText.split('\n')[0].slice(0, 150) + '...'
}

export default async function HomePage() {
  const posts = await getPosts()
  const recentPosts = posts.slice(0, 3)

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center text-center p-8 relative">
        <div className="space-y-8 max-w-4xl mx-auto z-10">
          <div className="inline-block px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm font-mono mb-4 animate-fade-in">
            ⚠️ Warning: May contain traces of bugs and bad puns.
          </div>

          <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary-light via-primary to-primary-dark animate-fade-in tracking-tighter drop-shadow-2xl">
            杂记
          </h1>

          <h2 className="text-2xl md:text-4xl text-text-muted font-light animate-slide-up tracking-wide leading-relaxed" style={{ animationDelay: '0.2s' }}>
            记录学习（摸鱼）日常，<br className="md:hidden" />偶尔假装正经。
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/posts"
              className="group relative w-56 h-16 flex items-center justify-center bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-surface/50 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative text-lg font-bold text-text-main group-hover:text-primary transition-colors tracking-widest">
                探索废话
              </span>
            </Link>

            <Link
              href="/tags"
              className="group relative w-56 h-16 flex items-center justify-center bg-surface/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-surface/50 hover:border-secondary/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative text-lg font-bold text-text-main group-hover:text-secondary transition-colors tracking-widest">
                脑洞合集
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">
            最新（凑数）文章
          </h3>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {recentPosts.map((post, index) => (
            <article
              key={post.slug}
              className="group relative flex flex-col h-full"
              style={{ animation: `slideUp 0.8s ease-out forwards ${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex flex-col h-full glass p-6 rounded-2xl border border-white/10 transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary/30 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <time className="text-xs font-mono text-primary/80 mb-3 block">
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>

                <Link
                  href={`/posts/${post.slug}`}
                  className="block text-xl font-bold text-text-main group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-light group-hover:to-white transition-all mb-3"
                >
                  {post.title ?? 'Untitled'}
                </Link>

                <p className="text-text-muted text-sm line-clamp-3 mb-4 flex-grow">
                  {post.excerpt || getFirstSentence(post.content) || 'No summary available... probably because I was too lazy to write one.'}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags && post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs text-text-muted/60">#{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/posts" className="text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-2 group">
            查看全部 <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </section>
    </main>
  )
}