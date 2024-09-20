import Link from 'next/link'

export default async function HomePage() {
  const posts = await getPosts()
  return (
    <div>
      <h1>Welcome to My Blog</h1>

    </div>
  )
}
