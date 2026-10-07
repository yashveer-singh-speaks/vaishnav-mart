import { Metadata } from 'next'
import { ProductRepository, CategoryRepository } from '@/lib/data/repositories'
import { ShopClient } from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop All Pure Satvik & Jain Products | Vaishnava Mart',
  description:
    'Browse our complete catalogue of onion-free, garlic-free whole spices, Ekadashi foods, authentic Jain premixes, and royal dry fruits.',
}

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    ProductRepository.getAllProducts({ status: 'active' }),
    CategoryRepository.getAllCategories(),
  ])

  return <ShopClient initialProducts={products} categories={categories} />
}
