'use client'

import React from 'react'
import Image from 'next/image'
import { ShieldCheck, CheckCircle2, Sparkles, Heart } from 'lucide-react'

const purityCards = [
  {
    title: 'Zero Allium Guarantee',
    subtitle: 'No Onion • No Garlic Ever',
    desc: 'Our sourcing, grinding mills, and mixing facilities have never processed onions, garlic, shallots, or leeks. You will never encounter hidden powders or ambiguous aromatic extracts.',
    icon: ShieldCheck,
  },
  {
    title: 'Micro-Screened Whole Spices',
    subtitle: 'Hand-sorted and Stone Ground',
    desc: 'Every batch of coriander, cumin, and dry red chillies undergoes physical optical sorting followed by gentle stone milling below 42°C to prevent thermal bitterness.',
    icon: Sparkles,
  },
  {
    title: 'Strict Bhoga & Seva Conformity',
    subtitle: 'Sanctified Kitchen Standards',
    desc: 'Prepared in an atmosphere of respect and hygiene suitable for Thakurji Bhoga offerings and devout household seva rituals.',
    icon: Heart,
  },
  {
    title: 'Dedicated Ekadashi Segregation',
    subtitle: 'Grain-Free Fasting Assurance',
    desc: 'Ekadashi compliant flours and snacks are produced on isolated calendar dates with dedicated equipment to ensure zero rice, wheat, or corn grain contamination.',
    icon: CheckCircle2,
  },
]

interface PurityStoryProps {
  heading?: string
  subheading?: string
  image?: string
}

export const PurityStorySection: React.FC<PurityStoryProps> = ({
  heading = 'Our standard is not a label. It is the process.',
  subheading = 'UNCOMPROMISED VOWS',
  image = '/images/generated/story-purity.jpg',
}) => {
  return (
    <section className="py-20 sm:py-32 bg-porcelain border-b border-sand/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky on Desktop */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <span className="text-xs uppercase tracking-widest text-copper font-semibold">
              {subheading}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cocoa leading-tight font-normal">
              {heading}
            </h2>
            <p className="text-base text-taupe leading-relaxed font-sans">
              True purity cannot be achieved by merely omitting an ingredient at the end. It demands dedicated equipment, verified supply chains, and cooks who share your reverence for culinary vows.
            </p>

            {/* Generated 16:9 Purity Visual */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-sand mt-6">
              <Image
                src={image}
                alt="Disciplined culinary purity and separated whole spices"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Stacked Purity Protocol Cards */}
          <div className="lg:col-span-7 space-y-6">
            {purityCards.map((card, idx) => {
              const IconComp = card.icon
              return (
                <div
                  key={idx}
                  className="p-8 sm:p-10 bg-ivory rounded-2xl border border-sand hover:border-gold/60 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-porcelain border border-sand text-burgundy flex-shrink-0">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-copper font-semibold">
                        {card.subtitle}
                      </span>
                      <h3 className="font-serif text-2xl text-cocoa font-medium">
                        {card.title}
                      </h3>
                      <p className="text-sm text-taupe leading-relaxed font-sans">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
