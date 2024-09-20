import Link from 'next/link'
import { getUniqueTags, getPostsByTag } from '@/lib/posts'

export default async function TagsPage() {
  const tags = await getUniqueTags()

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {Object.entries(tags).map(([tag, count]) => (
          <li key={tag}>
            <Link href={`/tags/${tag}`} onClick={() => showPosts(tag)}>
              {tag} ({count})
            </Link>
          </li>
        ))}
      </ul>
      <div id="postContainer"></div>
    </div>
  )
}

async function showPosts(tag) {
  const posts = await getPostsByTag(tag);
  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = ''; // Clear previous posts

  if (posts.length > 0) {
    const postList = document.createElement('ul');
    posts.forEach(post => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `/posts/${post.id}`; // Assuming post has an id
      link.textContent = post.title; // Assuming post has a title
      listItem.appendChild(link);
      postList.appendChild(listItem);
    });
    postContainer.appendChild(postList);
  } else {
    postContainer.innerHTML = '<p>No posts found for this tag.</p>';
  }
}
