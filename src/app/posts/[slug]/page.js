import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import { generateMetadata as generateSEOMetadata, generateArticleSchema } from '@/lib/seo'

// Generate metadata for the post page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }

  // Extract first sentence for description if no excerpt
  const getFirstSentence = (content) => {
    if (!content) return '';
    const plainText = content
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`{1,3}[^`]+`{1,3}/g, '')
      .replace(/[*_~]+/g, '')
      .trim();
    const match = plainText.match(/^[^.!?]+[.!?]/);
    return match ? match[0].trim() : plainText.split('\n')[0].slice(0, 150) + '...';
  };

  const description = post.excerpt || getFirstSentence(post.content) || post.title;

  return generateSEOMetadata({
    title: post.title || 'Untitled',
    description,
    path: `/posts/${slug}`,
    keywords: post.tags || [],
    type: 'article'
  });
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug
  }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound()
  }

  return (
    <main className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              title: post.title || 'Untitled',
              description: post.excerpt || post.title,
              slug,
              date: post.date,
              tags: post.tags || []
            })
          )
        }}
      />

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <article className="max-w-3xl mx-auto relative">
        <header className="mb-16 text-center space-y-6 animate-fade-in">
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-light via-white to-secondary tracking-tight drop-shadow-lg pb-2 leading-tight">
              {post.title ?? 'Untitled'}
            </h1>
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-50 mb-6" />

            {post.date && (
              <time className="block text-primary/60 font-mono text-sm tracking-wider uppercase">
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
          </div>
        </header>

        <div className="prose prose-lg prose-invert max-w-none mb-16 animate-slide-up glass p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
          <MDXRemote
            source={post.content}
            options={{
              mdExtensions: true,
              rmdExtensions: true,
              parseFrontmatter: false,
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypePrism]
              }
            }}
          />
        </div>

        {post.tags && post.tags.length > 0 && (
          <footer className="border-t border-white/10 pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-text-muted font-medium min-w-max flex items-center gap-2">
                <span className="text-primary">#</span> Tags
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="px-4 py-1.5 rounded-full bg-surface/50 border border-white/10 text-sm text-text-muted hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </footer>
        )}

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Posts
          </Link>
        </div>
      </article>
    </main>
  )
}
