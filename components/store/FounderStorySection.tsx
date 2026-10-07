'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen } from 'lucide-react'

interface FounderStoryProps {
  heading?: string
  subheading?: string
  body?: string
  image?: string
}

export const FounderStorySection: React.FC<FounderStoryProps> = ({
  heading = 'Rooted in timeless tradition',
  subheading = 'OUR BEGINNING',
  body = 'Handwritten culinary journals, brass mortar mills, and centuries of ancestral wisdom inspire every blend we create. We measure our ingredients not merely by weight, but by the sanctity of intention.',
  image = '/images/generated/story-origin.jpg',
}) => {
  return (
    <section className="py-20 sm:py-28 bg-ivory border-b border-sand/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-5 mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{subheading}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cocoa font-normal">
            {heading}
          </h2>
          <p className="text-base sm:text-lg text-taupe max-w-2xl mx-auto leading-relaxed font-sans">
            {body}
          </p>
        </div>

        {/* 16:9 Origin Still Life Image with Framing */}
        <div className="relative aspect-[16/9] max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-2 border-sand">
          <Image
            src={image}
            alt="Ancestral recipes and Satvik culinary craftsmanship"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cocoa/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-ivory max-w-xl">
            <p className="font-serif text-xl sm:text-2xl italic text-ivory/95">
              &ldquo;When food is prepared with reverence, nourishment reaches beyond the palate.&rdquo;
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:underline"
              >
                <span>Read the Complete Chronicle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
