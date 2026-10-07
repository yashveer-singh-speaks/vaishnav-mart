'use client'

import React from 'react'
import Link from 'next/link'
import { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { ArrowRight } from 'lucide-react'

interface TopTwoSectionProps {
  products: Product[]
  heading?: string
  subheading?: string
  body?: string
}

export const TopTwoSection: React.FC<TopTwoSectionProps> = ({
  products,
  heading = 'Chosen for your kitchen',
  subheading = 'CURATED ESSENTIALS',
  body = 'Two foundational creations that embody our dedication to cold-ground purity and unadulterated taste.',
}) => {
  if (!products || products.length === 0) return null
  const displayItems = products.slice(0, 2)

  return (
    <section className="py-16 sm:py-24 bg-ivory border-b border-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
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

        {/* Two Featured Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {displayItems.map((prod) => (
            <ProductCard key={prod.id} product={prod} priorityImage />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-burgundy font-semibold text-sm hover:underline"
          >
            <span>View All Curated Essentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
