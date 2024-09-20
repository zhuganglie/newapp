import { getPostsByTag } from '@/lib/posts'
import Link from 'next/link'

export default async function TagPage({ params }) {
  const { slug } = params;
  const posts = await getPostsByTag(slug);

  return (
    <div>
      <h1>Posts tagged with "{slug}"</h1>
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
