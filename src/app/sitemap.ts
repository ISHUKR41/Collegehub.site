/**
 * sitemap.ts — Dynamic sitemap for SEO
 * 
 * Generates a sitemap.xml with all public pages.
 * Search engines use this to discover and index pages.
 * 
 * To extend: Add dynamic routes from the database
 * (e.g., all course pages, blog posts).
 */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://collegehub.site';

    /* Static pages */
    const staticPages = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
        { url: `${baseUrl}/school`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${baseUrl}/coding`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
        { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    ];

    /* Course pages — in production, fetch slugs from database */
    const courseSlugs = [
        'cpp', 'java', 'python', 'web-development',
        'class9-mathematics', 'class9-science', 'class9-english',
        'class10-mathematics', 'class10-science', 'class10-english',
    ];

    const coursePages = courseSlugs.map((slug) => ({
        url: `${baseUrl}/courses/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...coursePages];
}
