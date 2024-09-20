import { notFound } from 'next/navigation'
import { getPosts, getPostBySlug } from '@/lib/posts'

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <div>
      <h1>{post.title ?? 'Untitled'}</h1>
      <p>{post.content}</p>
    </div>
  )
}
