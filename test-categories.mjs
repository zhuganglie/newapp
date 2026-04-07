import { getUniqueCategories, getPostsByCategory } from './src/lib/posts.js'

async function test() {
  const categories = await getUniqueCategories()
  console.log('Categories:', categories)

  for (const cat of categories) {
    const posts = await getPostsByCategory(cat)
    console.log(`Posts in ${cat}:`, posts.length)
  }
}

test()
