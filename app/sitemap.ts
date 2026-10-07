import { MetadataRoute } from 'next'
import { ProductRepository, CategoryRepository } from '@/lib/data/repositories'
import { initialLocations } from '@/lib/data/mockData'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vaishnavamart.com'

  const staticRoutes = [
    '',
    '/shop',
    '/our-standard',
    '/about',
    '/recipes',
    '/services',
    '/contact',
    '/locations',
    '/shipping-policy',
    '/return-policy',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const products = await ProductRepository.getAllProducts({ status: 'active' })
  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: new Date(p.updatedAt || p.createdAt),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  const categories = await CategoryRepository.getAllCategories()
  const categoryRoutes = categories.map((c) => ({
    url: `${baseUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const locationRoutes = initialLocations.map((l) => ({
    url: `${baseUrl}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...locationRoutes]
}
