export async function getPosts() {
  // ... Fetches list of posts
  return [
    {
      slug: 'first-post',
      title: 'First Post',
      content: 'Content of my first post',
    },
  ]
}

export function getPostBySlug(posts, slug) {
  return posts.find(post => post.slug === slug)
}
