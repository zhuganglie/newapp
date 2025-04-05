import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#d9a705] mb-4">
          {post.title ?? 'Untitled'}
        </h1>
        {post.date && (
          <time className="text-sm text-zinc-400 block">
            {new Date(post.date).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        )}
      </header>

      <article className="prose prose-lg prose-zinc prose-invert max-w-none mb-12">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      {post.tags && post.tags.length > 0 && (
        <footer className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="text-zinc-400 font-medium min-w-max">标签：</h2>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="inline-block bg-zinc-800 text-zinc-300 text-sm px-3 py-1 rounded-full hover:bg-[#d9a705] hover:text-zinc-900 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      )}
    </main>
)
}
