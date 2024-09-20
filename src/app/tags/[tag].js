import { getPostsByTag } from '@/lib/posts'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default async function TagPage() {
  const router = useRouter()
  const { tag } = router.query

  const posts = await getPostsByTag(tag)

  return (
    <div>
      <h1>Posts tagged with "{tag}"</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                {post.title ?? 'Untitled'}
              </Link>
            </li>
          ))
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </ul>
      <Link href="/">Back to Home</Link>
    </div>
  )
}
