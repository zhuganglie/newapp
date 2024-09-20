import matter from 'gray-matter'
import { promises as fs } from 'fs'
import path from 'path'

export async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filenames = await fs.readdir(postsDirectory)

  return Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace('.md', '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = await fs.readFile(fullPath, 'utf8')
      const {  frontmatter, content } = matter(fileContents)

      return {
        slug,
        title: frontmatter.title,
        content,
        ...frontmatter,
      }
    })
  )
}

export function getPostBySlug(posts, slug) {
  return posts.find((post) => post.slug === slug)
}
