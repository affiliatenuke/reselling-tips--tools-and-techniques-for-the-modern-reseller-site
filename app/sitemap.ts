import { MetadataRoute } from 'next';
import posts from '@/data/posts.json';
import pillars from '@/data/pillars.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resaleedge.com';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/affiliate-disclosure`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Blog posts
  const blogPosts: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishDate ? new Date(post.publishDate) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: post.isFeaturedPost ? 0.9 : 0.7,
  }));

  // Topic/Pillar pages
  const topicPages: MetadataRoute.Sitemap = pillars.map((pillar: any) => ({
    url: `${baseUrl}/topics/${pillar.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...topicPages];
}
