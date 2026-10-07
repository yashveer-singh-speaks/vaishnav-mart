import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductRepository } from '@/lib/data/repositories'
import { ProductDetailClient } from '@/components/store/ProductDetailClient'

const RESERVED_SLUGS = new Set([
  'shop',
  'category',
  'about',
  'our-standard',
  'services',
  'contact',
  'locations',
  'recipes',
  'cart',
  'checkout',
  'account',
  'order-success',
  'owner-login',
  'admin',
  'privacy-policy',
  'terms',
  'shipping-policy',
  'return-policy',
  'refund-policy',
  'api',
  'sitemap.xml',
  'robots.txt',
])

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (RESERVED_SLUGS.has(params.slug)) {
    return { title: 'Vaishnava Mart' }
  }

  const product = await ProductRepository.getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found | Vaishnava Mart' }

  return {
    title: product.seo?.metaTitle || `${product.name} | Vaishnava Mart`,
    description: product.seo?.metaDescription || product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [product.mainImage],
    },
  }
}

export default async function DynamicProductPage({ params }: Props) {
  // Respect system reserved routes
  if (RESERVED_SLUGS.has(params.slug)) {
    notFound()
  }

  const product = await ProductRepository.getProductBySlug(params.slug)
  if (!product) {
    notFound()
  }

  // Fetch similar products
  const similarProducts = await ProductRepository.getSimilarProducts(
    product.similarProductIds || []
  )

  return <ProductDetailClient product={product} similarProducts={similarProducts} />
}
