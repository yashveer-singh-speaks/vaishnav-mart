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
  heading,
  subheading = 'VAISHNAVA DEVOTIONAL KITCHEN',
  body,
  image = '/images/generated/hero-bg.jpg',
}) => {
  // Sacred Sanskrit Shloka with traditional variant preservation
  const displayShlokaLine1 = 'तदीयं वस्तु गोविन्द तुभ्यमेव समर्पये।'
  const displayShlokaLine2 = 'गृहाण सम्मुखो भूत्वा प्रसीद परमेश्वर॥'
  const displayEnglishMeaning =
    'Everything we have is a beautiful gift from the Almighty. Every meal cooked and served is a blessing from Him.'

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[96vh] flex items-center overflow-hidden bg-ivory">
      {/* Hero Visuals: Left Masala Image & Right Sacred Tulsi Pot */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Left Side: Masala & Spices Background */}
        <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
          <Image
            src={image}
            alt="Vaishnava Mart Pure Spices and Satvik Ingredients"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-left opacity-35 lg:opacity-40"
          />
          {/* Subtle ivory fades so the left text is clearly legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/85 to-ivory/60 lg:to-ivory/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory/40" />
        </div>

        {/* Right Side: Sacred Tulsi Pot Image */}
        <div className="absolute top-0 right-0 w-full sm:w-2/3 lg:w-1/2 h-full z-0 overflow-hidden">
          <Image
            src="/images/tulsi-pot-hero.jpg"
            alt="Sacred Holy Tulsi Pot - Vaishnava Mart"
            fill
            sizes="(max-width: 1024px) 66vw, 50vw"
            className="object-cover object-center lg:object-right opacity-85 lg:opacity-95"
          />
          {/* Fading ivory gradients on the edges of the Tulsi pot */}
          <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/40 to-transparent lg:from-ivory lg:via-transparent lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-ivory/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-transparent to-ivory" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-porcelain/90 border border-sand rounded-full text-burgundy text-[11px] sm:text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span>{subheading}</span>
          </div>

          {/* Devotional Shloka in Devanagari */}
          <div className="space-y-3 sm:space-y-4 pt-1">
            <div className="relative pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-gold/70 py-1">
              <h1 className="font-devanagari text-2xl sm:text-4xl lg:text-[44px] text-cocoa leading-[1.35] tracking-wide font-normal">
                <span className="block text-burgundy">{displayShlokaLine1}</span>
                <span className="block text-cocoa-deep mt-1 sm:mt-2">{displayShlokaLine2}</span>
              </h1>
            </div>

            {/* Accompanying English Meaning & Gratitude Message */}
            <p className="mt-6 text-base sm:text-xl text-taupe leading-relaxed font-serif italic max-w-2xl">
              "{body || displayEnglishMeaning}"
            </p>
            <p className="text-xs sm:text-sm font-sans tracking-wide uppercase text-copper font-semibold">
              — Vaishnava Mart • Dedicated Satvik Kitchen
            </p>
          </div>

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
              <span>Serving Customers Across India</span>
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
