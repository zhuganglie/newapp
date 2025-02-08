import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

return (
<div className="flex flex-col justify-center items-center py-8">
    <div className="max-w-3xl w-full">
    
    <h1 className="text-3xl font-bold mb-4">{post.title ?? 'Untitled'}</h1>
    <hr className="mb-4" />
    <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
    <div className="flex mt-4">
     <span className="min-w-max">标签：</span>
      <ul className="flex gap-x-2 gap-y-1 flex-wrap list-none">
        {(post.tags || []).map((tag) => (
          <li key={tag} className="min-w-max"><a href={`/tags/${tag}`}><span>&#9900;</span> {tag}</a></li>
        ))}
      </ul>
      </div>
    </div>
</div>
)
}
