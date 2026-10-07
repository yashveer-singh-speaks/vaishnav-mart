'use client'

import React from 'react'
import { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface MostOrderedProps {
  products: Product[]
  heading?: string
  subheading?: string
  body?: string
}

export const MostOrderedSection: React.FC<MostOrderedProps> = ({
  products,
  heading = 'What people keep coming back for',
  subheading = 'HOUSEHOLD FAVORITES',
  body = 'Trusted daily by families who hold their dietary vows sacred.',
}) => {
  if (!products || products.length === 0) return null
  const displayItems = products.slice(0, 4)

  return (
    <section className="py-20 sm:py-28 bg-porcelain border-b border-sand/70">
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

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  )
}
