import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export function getSortedPostsData() {
  // Get file names under /src/posts
  const fileNames = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))

  // Remove '.md' from file names
  const allPostsData = fileNames.map(fileName => {
    const id = fileName.replace(/\\\\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Separate title and date
    const matterResult = matter(fileContents)

    return {
      id,
      tags: matterResult.data.tags || [],
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}



export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`.replace(/\.md\.md$/, '.md'))
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    tags: matterResult.data.tags || [],
    ...matterResult.data
  }
}

export function getPosts() {
  const allPostsData = getSortedPostsData()
  return allPostsData.map((post) => ({
    slug: post.id,
    title: post.title,
    date: post.date,
    tags: post.tags
  }))
}
