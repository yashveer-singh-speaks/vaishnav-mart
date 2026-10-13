import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, CheckCircle2, Heart, Sparkles, Leaf, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Sacred Standards | Vaishnava Mart Purity Code',
  description:
    'Read the detailed dietary and ethical standards governing Vaishnava Mart. Jain compliant, Vaishnav compliant, Ekadashi friendly, and zero contamination.',
}

const standards = [
  {
    title: 'Vaishnav & Bhoga Purity',
    subtitle: 'Suitable for Sacred Seva',
    desc: 'Prepared in clean, sanctified environments by individuals mindful of devotion. Suitable for Thakurji Bhoga and temple prasad offerings.',
    icon: Heart,
  },
  {
    title: 'Zero Onion Policy',
    subtitle: 'Absolute Allium Exclusion',
    desc: 'Onion in raw, dehydrated, flaked, powder, or extract forms is categorically barred from all supply streams and handling facilities.',
    icon: ShieldCheck,
  },
  {
    title: 'Zero Garlic Policy',
    subtitle: 'Uncompromising Sanctuary',
    desc: 'Garlic and related allium aromatics never cross our facility threshold. We preserve kitchens free from pungent volatile traces.',
    icon: ShieldCheck,
  },
  {
    title: 'Jain Dietary Ethics',
    subtitle: 'Ahimsa & Root Vegetable Free',
    desc: 'Our Jain-certified selections exclude root vegetables (kandmool) such as potatoes, carrots, and radishes, adhering to strict compassion protocols.',
    icon: CheckCircle2,
  },
  {
    title: 'Ekadashi Fasting Compliance',
    subtitle: 'Grain-Free Vrat Delicacies',
    desc: 'Formulated with certified Sendha Namak (Himalayan rock salt) and pure tapioca, singhara, or dry fruits without grain, pulse, or wheat cross-contact.',
    icon: Leaf,
  },
  {
    title: 'Tithi & Fasting Friendly',
    subtitle: 'Conformity to Sacred Calendars',
    desc: 'Engineered for sensitive holy days where dietary discipline is paramount, honoring ancestral scriptures and culinary vows.',
    icon: Sparkles,
  },
  {
    title: 'Zero Shared Equipment',
    subtitle: 'Dedicated Cold Milling',
    desc: 'Our machines only ever mill our verified satvik ingredients. We do not participate in shared commercial milling batches.',
    icon: ShieldCheck,
  },
  {
    title: 'Tamper-Evident Barrier Packaging',
    subtitle: 'Sealed Freshness & Purity',
    desc: 'Packaged in multi-layer aroma barrier containers and nitrogen-flushed pouches to shield products from ambient moisture and odors.',
    icon: CheckCircle2,
  },
]

export default function OurStandardPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold">
            The Vaishnava Mart Purity Code
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Our Standard is Not a Label. It is the Process.
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            Every specification below represents a binding covenant with our community. We do not compromise on dietary vows.
          </p>
        </div>

        {/* 8 Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((std, idx) => {
            const IconComp = std.icon
            return (
              <div
                key={idx}
                className="p-8 bg-porcelain rounded-2xl border border-sand hover:border-gold/60 transition-all space-y-3 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-ivory border border-sand text-burgundy flex-shrink-0">
                    <IconComp className="w-5 h-5 text-burgundy" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-copper">
                      {std.subtitle}
                    </span>
                    <h2 className="font-serif text-xl text-cocoa font-medium">{std.title}</h2>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-taupe leading-relaxed font-sans pt-1">
                  {std.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom Callout */}
        <div className="p-8 sm:p-12 bg-cream rounded-3xl border border-sand text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-cocoa font-medium">
            Have Questions Regarding Specific Ingredients?
          </h3>
          <p className="text-xs sm:text-sm text-taupe max-w-md mx-auto">
            Our purity team is available to assist temple cooks, ashram administrators, and devout patrons with detailed batch specifications.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/contact" className="btn-secondary text-xs h-10 px-5">
              Contact Us
            </Link>
            <Link href="/shop" className="btn-primary text-xs h-10 px-6">
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
