import Link from 'next/link'
import { getPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div>
    <h1>Welcome to My Blog</h1>
    <ul>
    {posts.map((post) => (
      <li key={post.slug}>
      <Link href={`/posts/${post.slug}`}>
      {post.title ?? 'Untitled'}
      </Link>
      <div>
      {post.tags && post.tags.length > 0 && (
        <span>
        Tags: {post.tags.map(tag => (
          <Link key={tag} href={`/tags/${tag}`} style={{ marginLeft: '5px' }}>
          {tag}
          </Link>
        ))}
        </span>
      )}
      </div>
      </li>
    ))}
    </ul>
    </div>
  )
}
