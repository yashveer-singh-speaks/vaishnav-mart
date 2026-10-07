'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck } from 'lucide-react'

interface HomeHeroProps {
  heading?: string
  subheading?: string
  body?: string
  image?: string
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  heading = 'Purity you never have to question.',
  subheading = 'PURE. SATVIK. UNCOMPROMISED.',
  body = 'Vaishnava Mart crafts noble pantry essentials for Jain, Vaishnav, and devout Satvik homes. Prepared with zero onion, zero garlic, and absolute reverence for sacred dietary standards.',
  image = '/images/generated/hero-bg.jpg',
}) => {
  return (
    <section className="relative w-full min-h-[88vh] lg:min-h-[94vh] flex items-center overflow-hidden bg-ivory">
      {/* 16:9 Background Visual with Subtle Scale In */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt="Vaishnava Mart Pure Spices and Satvik Ingredients"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:object-right scale-100 transition-transform duration-1000 ease-out"
        />
        {/* Editorial Ivory Gradient Overlay ensuring generous negative space on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/85 to-transparent sm:via-ivory/70 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-ivory/30 lg:hidden" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-porcelain/90 border border-sand rounded-full text-burgundy text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span>{subheading}</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-cocoa leading-[1.08] font-normal tracking-tight">
            {heading}
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 text-base sm:text-lg text-taupe leading-relaxed font-sans max-w-xl">
            {body}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link href="/shop" className="btn-primary text-base px-8 py-3.5">
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link href="/our-standard" className="btn-secondary text-base px-8 py-3.5 bg-porcelain/80 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-burgundy" />
              <span>Our Standard</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-sand/80 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-cocoa font-medium">
            <div className="flex items-center gap-2">
              <span className="text-burgundy font-bold">✓</span>
              <span>100% No Onion, No Garlic</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-burgundy font-bold">✓</span>
              <span>Dedicated Clean Facilities</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-burgundy font-bold">✓</span>
              <span>Bhoga & Ekadashi Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
