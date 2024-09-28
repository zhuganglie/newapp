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

  return (
    <div>
      <h1>全部标签</h1>
      <hr></hr>
      <ul>
        {tagCounts.map(({ tag, count }) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>
            {tag} ({count})
            </Link>
          </li>
        ))}
      </ul>
      <p>Back to <a href="/">Home</a></p>
    </div>
  )
}

export async function generateStaticParams() {
  const tags = await getUniqueTags();
  return tags.map(tag => ({ tag }));
}
