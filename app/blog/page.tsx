import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Satvik Culinary Journal & Blog | Vaishnava Mart (Ras Kan)',
  description:
    'Devotional culinary insights, ancient Vedic cooking wisdom, Ekadashi vrat observance guides, and satvik recipes without onion or garlic.',
}

const articles = [
  {
    id: 'post-1',
    title: 'The Sacred Science of Bhoga: Why Temple Cooking Excludes Onion & Garlic',
    slug: 'science-of-bhoga-no-onion-garlic',
    excerpt:
      'According to Ayurvedic scriptures and the Bhagavad Gita, foods are categorized into Sattva, Rajas, and Tamas. Explore why alliums agitate the consciousness and how stone-ground whole spices create transcendent flavors for Thakurji.',
    category: 'Vedic Philosophy',
    readTime: '6 min read',
    date: 'October 18, 2026',
    image: '/images/generated/story-purity.jpg',
  },
  {
    id: 'post-2',
    title: 'Observing Ekadashi: Fasting Rules, Pure Saffron, and Sattvik Nutrition',
    slug: 'observing-ekadashi-sattvik-nutrition',
    excerpt:
      'A practical guide for devotees observing Nirjala or Phalahari Ekadashi. Discover how to maintain steady vitality with dry fruit trails, California almonds, and pure Kashmiri Mongra saffron without grain contamination.',
    category: 'Fasting & Rituals',
    readTime: '5 min read',
    date: 'October 12, 2026',
    image: '/images/generated/prod-saffron-dryfruit.jpg',
  },
  {
    id: 'post-3',
    title: 'Traditional Stone Milling: Protecting Volatile Essential Oils in Masalas',
    slug: 'traditional-stone-milling-masalas',
    excerpt:
      'Why slow, low-temperature spice milling outperforms high-speed industrial pulverizers. Learn how Ras Kan cold-grinds Shahi Paneer Masala and Garam Masala to keep their divine aromas intact.',
    category: 'Purity & Craft',
    readTime: '4 min read',
    date: 'October 05, 2026',
    image: '/images/generated/story-why-exists.jpg',
  },
]

export default function BlogPage() {
  return (
    <div className="bg-ivory min-h-screen py-14 sm:py-24 border-b border-sand">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-porcelain border border-sand rounded-full text-burgundy text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Journal & Culinary Wisdom</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            The Satvik Journal
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            Reflections on devotional cooking, Vedic dietary purity, Ekadashi observances, and authentic Ras Kan spice traditions.
          </p>
        </div>

        {/* Featured Post Card */}
        <div className="bg-porcelain border border-sand rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative h-72 sm:h-96 w-full">
            <Image
              src={articles[0].image}
              alt={articles[0].title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-3 text-xs text-copper font-semibold uppercase tracking-wider">
              <span>{articles[0].category}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {articles[0].readTime}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-cocoa font-medium leading-snug hover:text-burgundy transition-colors">
              <Link href="/blog">{articles[0].title}</Link>
            </h2>
            <p className="text-sm text-taupe leading-relaxed font-sans">
              {articles[0].excerpt}
            </p>
            <div className="pt-2">
              <Link
                href="/our-standard"
                className="inline-flex items-center gap-2 text-burgundy font-semibold text-sm hover:text-burgundy-dark transition-colors"
              >
                <span>Read Sacred Standard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(1).map((article) => (
            <article
              key={article.id}
              className="bg-porcelain border border-sand rounded-3xl overflow-hidden shadow-sm flex flex-col hover:border-gold/50 transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-copper font-semibold uppercase tracking-wider">
                    <span>{article.category}</span>
                    <span className="flex items-center gap-1 text-taupe/80">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-cocoa font-medium leading-snug hover:text-burgundy transition-colors">
                    <Link href="/blog">{article.title}</Link>
                  </h3>
                  <p className="text-sm text-taupe leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-sand/60 flex items-center justify-between">
                  <span className="text-xs text-taupe flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <Link
                    href="/shop"
                    className="text-xs font-semibold text-burgundy hover:text-burgundy-dark flex items-center gap-1"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
