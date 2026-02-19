import { getUniqueTags, getPostsByTag } from '@/lib/posts'
import Link from 'next/link'
import { generateMetadata as generateSEOMetadata } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: '主题标签',
  description: '按主题浏览「政治的逻辑」全部文章，包括独裁政治、比较政治、民主化等。',
  path: '/tags',
  keywords: ['标签', '分类', '主题', '政治科学']
});


export default async function TagsPage() {
  const tags = await getUniqueTags();
  const tagCounts = await Promise.all(
    tags.map(async (tag) => {
      const posts = await getPostsByTag(tag);
      return { tag, count: posts.length };
    })
  );

  const sortedTagCounts = tagCounts.sort((a, b) => b.count - a.count);

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-text-main mb-8 border-none animate-fade-in">
          主题标签
        </h1>

        <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {sortedTagCounts.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-md text-sm text-text-main hover:bg-surface-hover hover:border-border-dark transition-all duration-150 no-underline hover:no-underline"
            >
              <span className="font-medium group-hover:text-primary transition-colors">
                {tag}
              </span>
              <span className="text-xs text-text-light bg-white px-1.5 py-0.5 rounded">
                {count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const tags = await getUniqueTags();
  return tags.map(tag => ({ slug: tag }));
}
