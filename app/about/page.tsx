import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | The Vaishnava Mart Heritage & Philosophy',
  description:
    'Discover the origin, devotional ethics, and uncompromised culinary principles behind Vaishnava Mart.',
}

export default function AboutPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold">
            Our Purpose & Heritage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Restoring Absolute Reverence to the Daily Pantry
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            Vaishnava Mart was born out of a profound domestic dilemma: how does a devout household navigate a modern grocery landscape saturated with unverified supply chains and concealed allium additives?
          </p>
        </div>

        {/* 16:9 Origin Visual */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl border border-sand">
          <Image
            src="/images/generated/story-why-exists.jpg"
            alt="Pure culinary preparation and sacred spice sanctuary"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Story Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 text-sm sm:text-base text-taupe leading-relaxed font-sans">
          <div className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">
              The Sanctuary of Dedicated Cleanrooms
            </h2>
            <p>
              In conventional milling factories, the same grinders that crush dried garlic cloves or onion flakes in the morning are commonly used for coriander or turmeric in the afternoon. Even thorough cleaning leaves microscopic volatile oils and odor residues that violate strict Satvik and Jain vows.
            </p>
            <p>
              At Vaishnava Mart, our code is straightforward: allium vegetables never enter the facility gates. There are no shared conveyor belts, no ambiguous third-party contract grinding, and no compromise.
            </p>
          </div>

          <div className="space-y-5">
            <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">
              Crafted for Bhoga and Domestic Seva
            </h2>
            <p>
              Food offered to the Divine must be prepared with immaculate purity and joyful intention. Our whole spices are cold-ground at slow revolutions to retain the volatile aromatics bestowed by nature, without thermal scorching.
            </p>
            <p>
              Whether you are preparing daily family meals, Ekadashi fasting prasad, or temple celebrations, you can open our jars with the comforting knowledge that purity was safeguarded every step of the way.
            </p>
          </div>
        </div>

        {/* Values Callout Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-porcelain rounded-2xl border border-sand space-y-3">
            <ShieldCheck className="w-6 h-6 text-burgundy" />
            <h3 className="font-serif text-xl text-cocoa font-medium">Zero Contamination</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Strict physical and environmental separation safeguarding allium-free vows.
            </p>
          </div>

          <div className="p-6 bg-porcelain rounded-2xl border border-sand space-y-3">
            <Sparkles className="w-6 h-6 text-copper" />
            <h3 className="font-serif text-xl text-cocoa font-medium">Stone Ground Tradition</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Milled below 42°C to preserve vital therapeutic curcumin, cineole, and piperine.
            </p>
          </div>

          <div className="p-6 bg-porcelain rounded-2xl border border-sand space-y-3">
            <Heart className="w-6 h-6 text-gold" />
            <h3 className="font-serif text-xl text-cocoa font-medium">Devotional Intention</h3>
            <p className="text-xs text-taupe leading-relaxed">
              Formulated specifically for Thakurji Bhoga, temple kitchens, and spiritual feasts.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 bg-cream rounded-3xl border border-sand text-center space-y-5">
          <h3 className="font-serif text-2xl sm:text-4xl text-cocoa">
            Experience Uncompromising Purity in Your Kitchen
          </h3>
          <p className="text-xs sm:text-sm text-taupe max-w-lg mx-auto">
            Explore our curated range of authentic stone-ground spice powders, wholesome premixes, and pure fasting foods.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary inline-flex text-sm px-8">
              <span>Explore The Pantry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
