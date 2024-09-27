import { getPostsByTag } from '@/lib/posts'
import Link from 'next/link'

export default async function TagPage({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug); // Decode the slug
  const posts = await getPostsByTag(decodedSlug);

  return (
    <div>
      <h1> &quot;{decodedSlug}&quot; 标签下的文章</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map(post => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
               {post.title}
              </Link>
            </li>
          ))
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </ul>
      <Link href="/tags">Back to Tags</Link>
    </div>
  )
}
