// SEO configuration and utility functions

export const siteConfig = {
    name: 'Why? 为什么？',
    description: 'Why? 我的好奇心 - 记录学习（摸鱼）日常，偶尔假装正经。',
    url: 'https://zhuganglie.vercel.app',
    locale: 'zh-CN',
    author: {
        name: 'zhuganglie',
        url: 'https://zhuganglie.vercel.app/about'
    },
    social: {
        twitter: '@zhuganglie' // Update with actual Twitter handle if available
    }
};

/**
 * Generate metadata for a page
 * @param {Object} options - Metadata options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.path - Page path (relative to site root)
 * @param {string[]} [options.keywords] - SEO keywords
 * @param {string} [options.image] - Open Graph image URL
 * @param {string} [options.type] - Open Graph type (default: 'website')
 * @returns {Object} Next.js metadata object
 */
export function generateMetadata({
    title,
    description,
    path = '',
    keywords = [],
    image,
    type = 'website'
}) {
    const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
    const url = `${siteConfig.url}${path}`;
    const ogImage = image || `${siteConfig.url}/a.png`;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(', '),
        authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
        creator: siteConfig.author.name,
        publisher: siteConfig.author.name,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: url
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: siteConfig.name,
            locale: siteConfig.locale,
            type,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            creator: siteConfig.social.twitter,
            images: [ogImage]
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        }
    };
}

/**
 * Generate JSON-LD structured data for an article
 * @param {Object} article - Article data
 * @param {string} article.title - Article title
 * @param {string} article.description - Article description
 * @param {string} article.slug - Article slug
 * @param {string} article.date - Publication date (ISO string)
 * @param {string[]} [article.tags] - Article tags
 * @returns {Object} JSON-LD structured data
 */
export function generateArticleSchema({ title, description, slug, date, tags = [] }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        url: `${siteConfig.url}/posts/${slug}`,
        datePublished: date,
        dateModified: date,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.author.url
        },
        publisher: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url
        },
        keywords: tags.join(', '),
        inLanguage: siteConfig.locale
    };
}

/**
 * Generate JSON-LD structured data for the website
 * @returns {Object} JSON-LD structured data
 */
export function generateWebSiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: siteConfig.locale,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.author.url
        }
    };
}

/**
 * Generate JSON-LD structured data for a person
 * @returns {Object} JSON-LD structured data
 */
export function generatePersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.author.url,
        description: 'Life-long learner, grassroots leader, and hobbyist. A middle-aged guy who believes he has a few good years left.',
        jobTitle: 'Educator & Life-long Learner',
        knowsAbout: ['Political Science', 'Education', 'Go (Board Game)', 'Cycling']
    };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
 * @param {Array<{name: string, url: string}>} items - Breadcrumb items
 * @returns {Object} JSON-LD structured data
 */
export function generateBreadcrumbSchema(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.url}`
        }))
    };
}
