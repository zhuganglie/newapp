import matter from 'gray-matter'
import { promises as fs, existsSync } from 'fs'
import path from 'path'

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const filenames = await fs.readdir(postsDirectory)

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      if (data.draft === true) {
        return null;
      }

      return {
        slug,
        title: data?.title,
        content,
        tags: data?.tags || [], // Add tags field
        date: data.date,
        ...data,
      }
    })
  )

  return posts.filter(post => post !== null).sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getUniqueTags() {
  const posts = await getPosts()
  const allTags = posts.flatMap(post => post.tags);
  return [...new Set(allTags)];
}

export async function getPostsByTag(tag) {
  const posts = await getPosts()
  return posts.filter(post => post.tags.includes(tag));
}

export async function getPostBySlug(slug) {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  let fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${slug}.mdx`)
  }

  let fileContents
  try {
    fileContents = await fs.readFile(fullPath, 'utf8')
  } catch (error) {
    return null
  }
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data?.title,
    content,
    tags: data?.tags || [], // Add tags field
    ...data,
  }
}
