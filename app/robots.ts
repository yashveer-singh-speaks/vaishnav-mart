import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vaishnavamart.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*', '/owner-login', '/checkout', '/account/*', '/api/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
