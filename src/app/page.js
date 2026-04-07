import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import { generateMetadata as generateSEOMetadata, generateWebSiteSchema } from '@/lib/seo'
import SubscribeCTA from '@/app/components/SubscribeCTA'
import CategoryBadge from '@/app/components/CategoryBadge'
import { estimateReadingTime } from '@/lib/utils'

export const metadata = generateSEOMetadata({
  title: '政治的逻辑',
  description: '给认真理解政治的人，一套更清晰的分析框架。探索比较政治、威权政治、民主化等话题。',
  path: '/',
  keywords: ['政治科学', '比较政治', '威权政治', '政治学科普', '播客', 'comparative politics', 'authoritarian politics']
});

export default async function HomePage() {
  const posts = await getPosts()

  // Group posts by category
  const categories = ['专题研究', '深度科普', '读书笔记']
  const groupedPosts = categories.reduce((acc, cat) => {
    acc[cat] = posts.filter(p => p.category === cat).slice(0, 4)
    return acc
  }, {})

  return (
    <main className="min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-border bg-surface/30">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#800000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
        </div>
        
        <div className="relative max-w-2xl z-10">
          <div className="inline-block p-1.5 mb-6 rounded-full bg-primary/5 border border-primary/10">
             <div className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center font-serif font-black text-primary text-xl select-none">
               政
             </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-black text-text-main tracking-tight mb-6 border-none leading-[1.1]">
            政治的逻辑
          </h1>

          <p className="text-xl md:text-2xl text-text-muted font-serif italic leading-relaxed mb-10 max-w-xl opacity-90">
            给认真理解政治的人，一套清晰的分析框架
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-md text-sm font-bold hover:bg-primary-hover transition-all duration-300 shadow-md hover:shadow-lg no-underline"
            >
              浏览全部文章
            </Link>

            <Link
              href="/tags"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-main rounded-md text-sm font-medium hover:bg-surface-hover transition-all no-underline shadow-sm"
            >
              按主题浏览
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge Map Section */}
      <section className="py-16 space-y-16">
        {categories.map((category, idx) => (
          <div key={category} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="flex items-baseline justify-between mb-8 border-b border-border pb-2">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-serif font-bold text-text-main border-none m-0 p-0">
                  {category}
                </h2>
                <CategoryBadge category={category} />
              </div>
              <Link
                href={`/category/${category}`}
                className="text-xs text-text-muted hover:text-primary transition-colors font-medium no-underline"
              >
                查看更多 &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
              {groupedPosts[category]?.map((post) => (
                <article key={post.slug} className="group border-b border-border/50 md:border-none last:border-none">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex flex-col py-6 px-4 -mx-4 rounded-lg hover:bg-surface-hover transition-all no-underline notion-card-hover group/link"
                  >
                    <div className="flex items-center gap-3 mb-2">
                       <time className="text-[10px] text-text-light font-mono uppercase tracking-wider">
                        {new Date(post.date).toLocaleDateString('zh-CN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit'
                        })}
                      </time>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] text-text-light font-medium uppercase tracking-wider">
                        {estimateReadingTime(post.content)} min read
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-text-main group-hover/link:text-primary transition-colors mb-2 line-clamp-1 border-none m-0 leading-tight">
                      {post.title}
                    </h3>
                    {post.description && (
                      <p className="text-sm text-text-muted line-clamp-2 m-0 leading-relaxed opacity-80 group-hover/link:opacity-100 transition-opacity">
                        {post.description}
                      </p>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Subscribe CTA */}
      <section className="py-12 border-t border-border">
        <SubscribeCTA />
      </section>
    </main>
  )
}