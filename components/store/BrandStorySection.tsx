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
  heading = 'Why Devotees Choose Rasikan',
  subheading = 'SPIRITUAL PURPOSE & SATTVIC VALUES',
  body,
  image = '/images/generated/story-why-exists.jpg',
}) => {
  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-sand/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column (approx 50%) */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-5">
            <span className="text-xs uppercase tracking-widest text-copper font-semibold">
              {subheading}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-cocoa leading-tight font-normal">
              {heading}
            </h2>

            {/* Divided Readable Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-taupe leading-relaxed font-sans pt-1">
              <p>
                For a true Bhakti Yogi or anyone seeking spiritual clarity, what you eat directly influences how you think. Scriptural and Ayurvedic traditions teach that onion and garlic possess Rajasic and Tamasic qualities, which can disturb consciousness and interfere with deep meditation.
              </p>
              <p className="font-medium text-cocoa/90">
                True Sattvic food should elevate the soul and be suitable for offering to the Lord.
              </p>
              <p>
                Rasikan Spices bridges the gap for modern devotees by offering small batch, purely handmade masalas that are exceptionally clean and carefully prepared. Unlike ordinary brands that process mixed ingredients, our masalas are produced in a 100% dedicated facility that strictly excludes onion and garlic.
              </p>
              <p>
                We use absolutely no artificial preservatives, colours, or fillers, ensuring that every spice blend remains entirely Sattvic and follows Vedic principles. We source clean, natural ingredients so devotees can confidently prepare daily Bhog, Vrat meals, and temple offerings.
              </p>
              <p className="text-burgundy font-serif italic text-base sm:text-lg">
                Our goal is to help transform your everyday kitchen into a place of devotion without sacrificing the rich, traditional aromas of authentic Indian spices.
              </p>
            </div>

            <div className="pt-2 space-y-2.5 text-xs sm:text-sm text-cocoa">
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

          {/* Image Column (approx 50%) - 16:9 safe composition */}
          <div className="lg:col-span-6 order-1 lg:order-2">
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
