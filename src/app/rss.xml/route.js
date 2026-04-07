import { getAllPosts } from '@/lib/posts';
import { siteConfig } from '@/lib/seo';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = siteConfig.url;

  const rssItemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/posts/${post.slug}`;
      // Clean up description: remove markdown headers and take first 200 chars
      const description = post.description || 
        (post.content 
          ? post.content
              .replace(/#+\s+.*\n/g, '') // Remove headers
              .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
              .substring(0, 250)
              .trim() + '...' 
          : '');
      
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${description}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
    })
    .join('');

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>zh-cn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItemsXml}
  </channel>
</rss>`;

  return new Response(rssFeedXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
