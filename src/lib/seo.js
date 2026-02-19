// SEO configuration and utility functions

export const siteConfig = {
    name: '政治的逻辑',
    description: '用政治科学的方法，解读真实世界的政治逻辑。',
    url: 'https://zhuganglie.vercel.app',
    locale: 'zh-CN',
    author: {
        name: 'zhuganglie',
        url: 'https://zhuganglie.vercel.app/about'
    },
    social: {
        twitter: '@zhuganglie'
    }
};

/**
 * Generate metadata for a page
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
 */
export function generatePersonSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.author.name,
        url: siteConfig.author.url,
        description: '政治科学爱好者，终身学习者。用理论工具解读真实世界的政治现象。',
        jobTitle: '政治科学科普作者',
        knowsAbout: ['Political Science', 'Comparative Politics', 'Authoritarian Politics', 'Go (Board Game)', 'Cycling']
    };
}

/**
 * Generate JSON-LD structured data for breadcrumbs
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
