import Link from 'next/link'
import { getUniqueTags } from '@/lib/posts'

export default async function TagsPage() {
  const tags = await getUniqueTags()

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {Object.entries(tags).map(([tag, count]) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`}>
              {tag} ({count})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
