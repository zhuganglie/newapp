import { getPosts, getUniqueTags, getUniqueCategories } from '@/lib/posts'
import { siteConfig } from '@/lib/seo'

export default async function sitemap() {
    const siteUrl = siteConfig.url;
    const posts = await getPosts();
    const tags = await getUniqueTags();
    const categories = await getUniqueCategories();

    // Static pages
    const staticPages = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1
        },
        {
            url: `${siteUrl}/posts`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9
        },
        {
            url: `${siteUrl}/tags`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7
        }
    ];

    // Post pages
    const postPages = posts.map((post) => ({
        url: `${siteUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.8
    }));

    // Tag pages
    const tagPages = tags.map((tag) => ({
        url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6
    }));

    // Category pages
    const categoryPages = categories.map((category) => ({
        url: `${siteUrl}/category/${encodeURIComponent(category)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7
    }));

    return [...staticPages, ...postPages, ...tagPages, ...categoryPages];
}

