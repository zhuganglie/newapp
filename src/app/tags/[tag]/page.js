import Link from 'next/link'
import { getPostsByTag } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'

export default async function TagPage({ params }) {
  const posts = await getPostsByTag(params.tag)

  return (
    <div>
      <h1>Posts tagged with: {params.tag}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.title ?? 'Untitled'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
