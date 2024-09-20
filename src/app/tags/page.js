import { getUniqueTags, getPostsByTag } from '@/lib/posts'
import Link from 'next/link'

export default function TagsPage({ tags }) {
  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map(({ tag, count }) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>
              {tag} ({count})
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">Back to Home</Link>
    </div>
  )
}

export async function getStaticProps() {
  const tags = await getUniqueTags();
  const tagCounts = await Promise.all(
    tags.map(async (tag) => {
      const posts = await getPostsByTag(tag);
      return { tag, count: posts.length };
    })
  );

  return {
    props: {
      tags: tagCounts,
    },
  }
}
