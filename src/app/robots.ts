/**
 * robots.ts — Search engine crawling rules
 * 
 * Tells search engines which pages to crawl and index.
 * Also points to the sitemap for better discovery.
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/dashboard/', '/admin/'],
            },
        ],
        sitemap: 'https://collegehub.site/sitemap.xml',
    };
}
