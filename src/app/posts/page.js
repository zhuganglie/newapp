import Link from 'next/link'
import { getPosts } from '@/lib/posts'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#d9a705] mb-12 text-center">
        全部文章
      </h1>

      <div className="grid gap-8">
        {posts.map((post) => (
          <article 
            key={post.slug}
            className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-[#d9a705] transition-colors group"
          >
            <time className="text-sm text-zinc-400 mb-2 block">
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>

            <Link 
              href={`/posts/${post.slug}`} 
              className="block text-2xl font-semibold text-zinc-100 group-hover:text-[#d9a705] transition-colors mb-4"
            >
              {post.title ?? 'Untitled'}
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    href={`/tags/${tag}`}
                    className="inline-block bg-zinc-700 text-zinc-300 text-xs px-3 py-1 rounded-full hover:bg-[#d9a705] hover:text-zinc-900 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
