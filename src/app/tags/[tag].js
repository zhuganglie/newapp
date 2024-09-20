import { getPostsByTag } from '@/lib/posts'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function TagPage() {
  const router = useRouter()
  const { tag } = router.query

  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPosts = async () => {
      if (tag) {
        const fetchedPosts = await getPostsByTag(tag);
        setPosts(fetchedPosts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [tag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts tagged with "{tag}"</h1>
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`}>
                {post.title ?? 'Untitled'}
              </Link>
            </li>
          ))
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </ul>
      <Link href="/">Back to Home</Link>
    </div>
  )
}
