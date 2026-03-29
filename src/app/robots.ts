import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://ciberpme.vercel.app'
    : 'http://localhost:3000'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      },
      // Explicitly allow AI crawlers for content discovery
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Bytespider', 'PerplexityBot', 'Google-Extended'],
        allow: '/'
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl
  }
}