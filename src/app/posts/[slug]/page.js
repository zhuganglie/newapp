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
      <hr></hr>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <div className="flex">
     <span className="min-w-max">标签：</span>
      <ul className="flex gap-x-2 gap-y-1 flex-wrap list-none">
        {(post.tags || []).map((tag) => (
          <li key={tag} className="min-w-max"><a href={`/tags/${tag}`}><span>&#9900;</span> {tag}</a></li>
        ))}
      </ul>
      </div>
    </div>
  )
}
