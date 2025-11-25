import { getUniqueTags, getPostsByTag } from '@/lib/posts'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: '全部标签',
  description: '按标签浏览文章，包括政治学、比较政治、威权政治、笔记管理等主题。',
  path: '/tags',
  keywords: ['标签', '分类', '话题']
});


export default async function TagsPage() {
  const tags = await getUniqueTags();
  const tagCounts = await Promise.all(
    tags.map(async (tag) => {
      const posts = await getPostsByTag(tag);
      return { tag, count: posts.length };
    })
  );

  // Sort tags by post count (descending)
  const sortedTagCounts = tagCounts.sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto space-y-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary animate-fade-in tracking-tight drop-shadow-lg">
          全部标签
        </h1>

        <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {sortedTagCounts.map(({ tag, count }, index) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="group relative"
              style={{ animation: `fadeIn 0.5s ease-out forwards ${index * 0.05}s`, opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-3 px-6 py-3 bg-surface/40 backdrop-blur-md border border-white/10 rounded-full transition-all duration-300 group-hover:bg-surface/60 group-hover:scale-105 group-hover:border-primary/30 shadow-lg">
                <span className="text-lg font-medium text-text-main group-hover:text-primary transition-colors">
                  {tag}
                </span>
                <span className="flex items-center justify-center h-6 min-w-[1.5rem] px-2 text-xs font-bold text-surface bg-primary/80 rounded-full group-hover:bg-primary group-hover:text-black transition-colors">
                  {count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const tags = await getUniqueTags();
  return tags.map(tag => ({ slug: encodeURIComponent(tag) }));
}
