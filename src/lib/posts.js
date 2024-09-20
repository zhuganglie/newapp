const posts = [
  {
    slug: 'post-1',
    title: 'Post 1',
    tags: ['javascript', 'react']
  },
  {
    slug: 'post-2',
    title: 'Post 2',
    tags: ['python']
  },
  {
    slug: 'post-3',
    title: 'Post 3',
    tags: ['html', 'css']
  }
];

export async function getPosts() {
  // Simulate fetching posts from a database or API
  return posts;
}

export async function getUniqueTags() {
  const allTags = posts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}

export async function getPostsByTag(tag) {
  return posts.filter(post => post.tags.includes(tag));
}
