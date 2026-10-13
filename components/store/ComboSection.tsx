'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, PackagePlus } from 'lucide-react'
import { Product } from '@/types'
import { ProductCard } from '@/components/store/ProductCard'

interface ComboSectionProps {
  combos: Product[]
  heading?: string
  subheading?: string
  body?: string
}

export const ComboSection: React.FC<ComboSectionProps> = ({
  combos,
  heading = 'Sacred Pantry Combos & Value Bundles',
  subheading = 'CURATED VALUE SETS • UP TO 50% OFF',
  body = 'Handpicked combinations of our finest stone-ground masalas, fasting energy trails, and wholesome premixes. Enjoy dedicated cleanroom purity and maximum savings for your devotional kitchen.',
}) => {
  if (!combos || combos.length === 0) return null

  return (
    <section className="py-16 sm:py-24 bg-cream/50 border-b border-sand overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sand/70 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-cocoa text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{subheading}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cocoa font-normal">
              {heading}
            </h2>
            <p className="text-sm sm:text-base text-taupe leading-relaxed font-sans pt-1">
              {body}
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-burgundy-dark transition-colors group"
            >
              <span>Explore All Pantry Items</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {combos.map((combo) => (
            <div key={combo.id} className="relative">
              <ProductCard product={combo} priorityImage />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
