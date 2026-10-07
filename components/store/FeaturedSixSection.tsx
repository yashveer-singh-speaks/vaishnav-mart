'use client'

import React from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ArrowRight } from 'lucide-react'

interface FeaturedSixProps {
  products: Product[]
  heading?: string
  subheading?: string
  body?: string
}

export const FeaturedSixSection: React.FC<FeaturedSixProps> = ({
  products,
  heading = 'Explore the pantry',
  subheading = 'HANDCRAFTED PURITY',
  body = 'From royal stone-ground spices to festive Ekadashi treats.',
}) => {
  if (!products || products.length === 0) return null
  const displayItems = products.slice(0, 6)

  return (
    <section className="py-20 sm:py-28 bg-cream/50 border-b border-sand/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold">
            {subheading}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-cocoa mt-2 font-normal">
            {heading}
          </h2>
          <p className="text-sm sm:text-base text-taupe mt-3 leading-relaxed">
            {body}
          </p>
        </div>

        {/* 3 Columns x 2 Rows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayItems.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <Link
            href="/shop"
            className="btn-primary text-sm px-8"
          >
            <span>View All Pantry Offerings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
