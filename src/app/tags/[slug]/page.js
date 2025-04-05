import { getPostsByTag } from '@/lib/posts'
import Link from 'next/link'

export default async function TagPage({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const posts = await getPostsByTag(decodedSlug);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#d9a705] text-center">
            {decodedSlug}
          </h1>
          <div className="text-zinc-400">
            {posts.length} 篇文章
          </div>
        </div>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block p-6 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors group"
            >
              <article>
                {post.date && (
                  <time className="text-sm text-zinc-400 mb-2 block">
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
                <h2 className="text-2xl font-semibold text-zinc-100 group-hover:text-[#d9a705] transition-colors">
                  {post.title}
                </h2>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-zinc-400">
          未找到相关文章
        </div>
      )}
    </main>
  )
}
