import { notFound } from 'next/navigation'
import { getPostData, getAllPostIds } from '@/lib/posts'

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths
}

export default async function Post({ params }) {
  const postData = await getPostData(params.slug)

  if (!postData) {
    notFound()
  }

  return (
    <article>
      <h1>{postData.title}</h1>
      <p>{postData.date}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  )
}
