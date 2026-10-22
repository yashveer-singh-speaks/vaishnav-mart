import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, UtensilsCrossed, Gift, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services & Sacred Supplies | Vaishnava Mart',
  description:
    'Institutional supply for temples, ashrams, sacred event catering, and festive gifting.',
}

export default function ServicesPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold">
            Institutional & Bespoke Services
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Sacred Pantry Supply Services
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            We partner with spiritual institutions, spiritual events, and dedicated satvik food initiatives requiring certified purity at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-porcelain rounded-3xl border border-sand space-y-4 shadow-sm hover:border-gold transition-all">
            <div className="p-3 bg-cream rounded-2xl w-fit text-burgundy">
              <Building2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-cocoa font-medium">Temple & Ashram Supply</h2>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Wholesale quantities of cold-ground pure turmeric, coriander, whole spices, and Vedic Bilona ghee formulated strictly for temple seva.
            </p>
          </div>

          <div className="p-8 bg-porcelain rounded-3xl border border-sand space-y-4 shadow-sm hover:border-gold transition-all">
            <div className="p-3 bg-cream rounded-2xl w-fit text-burgundy">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-cocoa font-medium">Bespoke Event Catering Packs</h2>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Bulk pre-measured masala blends and premixes tailored for Jain wedding caterers and Ekadashi fasting retreats.
            </p>
          </div>

          <div className="p-8 bg-porcelain rounded-3xl border border-sand space-y-4 shadow-sm hover:border-gold transition-all">
            <div className="p-3 bg-cream rounded-2xl w-fit text-burgundy">
              <Gift className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl text-cocoa font-medium">Sacred Festive Gifting</h2>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed">
              Curated brass and tin boxes of Kashmiri Saffron, Mamra almonds, and royal dry fruit mixes for festivals and auspicious occasions.
            </p>
          </div>
        </div>

        <div className="p-8 bg-cream rounded-3xl border border-sand text-center space-y-4">
          <h3 className="font-serif text-2xl text-cocoa font-medium">
            Discuss a Custom Partnership
          </h3>
          <p className="text-xs sm:text-sm text-taupe max-w-md mx-auto">
            Connect directly with our institutional coordinator on WhatsApp.
          </p>
          <div className="pt-2">
            <Link
              href="https://wa.me/918595268400"
              target="_blank"
              className="btn-primary inline-flex text-xs h-11 px-7"
            >
              <span>Connect on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
