import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ostrusttech.uz';
  const locales = ['en', 'ru', 'uz'];
  
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/contact',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route combination
  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  return sitemapEntries;
} 