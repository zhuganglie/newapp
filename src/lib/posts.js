import matter from 'gray-matter'
import { promises as fs } from 'fs'
import path from 'path'

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const filenames = await fs.readdir(postsDirectory)

  return Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace('.md', '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data?.title,
        content,
        tags: data?.tags || [], // Add tags field
        ...data,
      }
    })
  )
}

export async function getUniqueTags() {
  const posts = await getPosts()
  const allTags = posts.reduce((acc, post) => acc.concat(post.tags), [])
  const uniqueTags = new Set(allTags)
  const tagCount = {}
  uniqueTags.forEach((tag) => {
    tagCount[tag] = allTags.filter((t) => t === tag).length
  })
  return tagCount
}

export async function getPostBySlug(slug) {
  const postsDirectory = path.join(process.cwd(), 'src/posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data?.title,
    content,
    tags: data?.tags || [], // Add tags field
    ...data,
  }
}
