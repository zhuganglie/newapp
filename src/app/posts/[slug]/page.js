import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <div>
      <h1>{post.title ?? 'Untitled'}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <ul className="flex gap-2">
        {(post.tags || []).map((tag) => (
          <li key={tag}><a href={`/tags/${tag}`}>{tag}</a></li>
        ))}
      </ul>
    </div>
  )
}
