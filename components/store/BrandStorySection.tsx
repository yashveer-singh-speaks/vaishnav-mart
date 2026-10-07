'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck } from 'lucide-react'

interface BrandStoryProps {
  heading?: string
  subheading?: string
  body?: string
  image?: string
}

export const BrandStorySection: React.FC<BrandStoryProps> = ({
  heading = 'Why Vaishnava Mart exists',
  subheading = 'PURITY IN PURPOSE',
  body = 'In an era of industrial speed and hidden fillers, devout households spend countless hours scrutinising labels for hidden onion, garlic powder, or shared processing lines. Vaishnava Mart was established to restore absolute trust in the pantry. Every spice, flour, and delicacy is prepared in an uncompromised sanctuary of purity.',
  image = '/images/generated/story-why-exists.jpg',
}) => {
  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-sand/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column (approx 45%) */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <span className="text-xs uppercase tracking-widest text-copper font-semibold">
              {subheading}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cocoa leading-tight font-normal">
              {heading}
            </h2>
            <p className="text-base text-taupe leading-relaxed font-sans">
              {body}
            </p>

            <div className="pt-2 space-y-3 text-sm text-cocoa">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-burgundy flex-shrink-0" />
                <span>Zero cross-contamination with allium or non-satvik ingredients</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-burgundy flex-shrink-0" />
                <span>Dedicated slow stone grinding protecting aroma and essential oils</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/our-standard" className="btn-primary">
                <span>Explore Our Standards</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Image Column (approx 55%) - 16:9 safe composition */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-sand">
              <Image
                src={image}
                alt="Why Vaishnava Mart exists culinary sanctuary"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
