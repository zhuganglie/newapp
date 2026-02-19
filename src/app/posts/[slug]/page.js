import React from 'react'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { generateMetadata as generateSEOMetadata, generateArticleSchema } from '@/lib/seo'
import ShareButtons from '@/app/components/ShareButtons'
import SubscribeCTA from '@/app/components/SubscribeCTA'
import Mermaid from '@/app/components/Mermaid'

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

  const getFirstSentence = (content) => {
    if (!content) return '';
    const plainText = content
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/`{1,3}[^`]+`{1,3}/g, '')
      .replace(/[*_~]+/g, '')
      .trim();
    const match = plainText.match(/^[^.!?。！？]+[.!?。！？]/);
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

const components = {
  h1: (props) => <h1 className="text-3xl font-serif font-bold mt-10 mb-4 text-text-main" {...props} />,
  h2: (props) => <h2 className="text-2xl font-serif font-bold mt-10 mb-3 pb-2 border-b border-border text-text-main" {...props} />,
  h3: (props) => <h3 className="text-xl font-serif font-bold mt-8 mb-2 text-text-main" {...props} />,
  ul: (props) => <ul className="list-disc pl-5 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-5 mb-4" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  pre: ({ children, ...props }) => {
    const codeElement = React.Children.toArray(children).find(
      child => React.isValidElement(child) &&
        child.type === 'code' &&
        (child.props.className?.includes('language-mermaid'))
    );

    if (codeElement) {
      return <div {...props}>{children}</div>;
    }
    return <pre {...props}>{children}</pre>
  },
  code: ({ className, children, ...props }) => {
    const isMermaid = className?.includes('language-mermaid');

    if (isMermaid) {
      const extractText = (node) => {
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (React.isValidElement(node)) {
          if (node.type === 'br') return '<br/>';
          if (node.type === 'hr') return '<hr/>';
          if (node.props && node.props.children) {
            return extractText(node.props.children);
          }
        }
        return '';
      };

      const chartString = extractText(children);
      return <Mermaid chart={chartString} />;
    }
    return <code className={className} {...props}>{children}</code>
  }
}


export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound()
  }

  return (
    <main className="min-h-screen py-12">
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

      <article className="max-w-3xl mx-auto">
        <header className="mb-10 animate-fade-in">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-xs text-text-light px-2 py-0.5 bg-surface rounded hover:bg-surface-hover hover:text-text-muted transition-colors no-underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-main leading-tight mb-3 border-none">
            {post.title ?? 'Untitled'}
          </h1>

          {post.date && (
            <time className="block text-sm text-text-light font-mono">
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          )}

          <div className="h-px w-full bg-border mt-6" />
        </header>

        <div className="prose prose-lg max-w-none mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdExtensions: true,
              rmdExtensions: true,
              parseFrontmatter: false,
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [[rehypePrism, { ignoreMissing: true }], rehypeKatex]
              }
            }}
          />
        </div>

        <div className="mb-8">
          <ShareButtons title={post.title} slug={slug} />
        </div>

        <SubscribeCTA />

        <div className="border-t border-border pt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors no-underline hover:no-underline"
          >
            <span>←</span>
            返回全部文章
          </Link>
        </div>
      </article>
    </main>
  )
}
