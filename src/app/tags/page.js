import { getUniqueTags, getPostsByTag } from '@/lib/posts'
import Link from 'next/link'

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
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#d9a705] mb-12 text-center">
        全部标签
      </h1>

      <div className="flex flex-wrap gap-3">
        {sortedTagCounts.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="inline-flex items-center bg-zinc-800 hover:bg-[#d9a705] text-zinc-300 hover:text-zinc-900 text-base px-4 py-2 rounded-lg transition-colors group"
          >
            <span>{tag}</span>
            <span className="ml-2 text-sm text-zinc-400 group-hover:text-zinc-800">
              ({count})
            </span>
          </Link>
        ))}
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  const tags = await getUniqueTags();
  return tags.map(tag => ({ tag }));
}
