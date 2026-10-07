import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CategoryRepository, ProductRepository } from '@/lib/data/repositories'
import { ProductCard } from '@/components/store/ProductCard'
import { ChevronRight, ShieldCheck } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await CategoryRepository.getCategoryBySlug(params.slug)
  if (!category) return { title: 'Category Not Found' }

  return {
    title: category.seoTitle || `${category.name} | Vaishnava Mart`,
    description:
      category.seoDescription ||
      `Shop pure Satvik, onion-free, garlic-free ${category.name} at Vaishnava Mart. Dedicated preparation for devout homes.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const category = await CategoryRepository.getCategoryBySlug(params.slug)
  if (!category) notFound()

  const allProducts = await ProductRepository.getAllProducts({
    status: 'active',
    categoryId: category.id,
  })

  return (
    <div className="bg-ivory min-h-screen py-8 sm:py-12 border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-taupe mb-6">
          <Link href="/" className="hover:text-burgundy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-burgundy transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-burgundy font-medium">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="pb-8 mb-8 border-b border-sand">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-copper font-semibold">
              Pantry Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-cocoa mt-2 font-normal">
              {category.name}
            </h1>
            <p className="text-sm sm:text-base text-taupe mt-3 leading-relaxed font-sans">
              {category.description}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        {allProducts.length === 0 ? (
          <div className="text-center py-20 bg-porcelain rounded-2xl border border-sand p-8 space-y-4">
            <p className="font-serif text-2xl text-cocoa">No items in this collection yet</p>
            <p className="text-xs text-taupe max-w-sm mx-auto">
              Our curators are currently milling fresh batches for this collection.
            </p>
            <Link href="/shop" className="btn-primary inline-flex text-xs h-10 px-6">
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* SEO Editorial Description (Positioned BELOW products as requested) */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 bg-porcelain rounded-2xl border border-sand max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-burgundy font-serif text-xl font-medium">
            <ShieldCheck className="w-5 h-5 text-copper" />
            <h3>Purity & Sourcing Notes for {category.name}</h3>
          </div>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed font-sans">
            At Vaishnava Mart, every item listed under {category.name} conforms to our rigorous culinary code. We explicitly prohibit the use of onions, garlic, non-vegetarian enzymes, and synthetic food additives. All equipment is dedicated and subjected to stringent ritual and physical cleansing prior to milling. Devout households can rely on our uncompromising commitment to devotional purity.
          </p>
        </div>
      </div>
    </div>
  )
}
