import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Moon, Sparkles, BellRing, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vaishnav Calendar | Sacred Tithis & Fasting Days | Vaishnava Mart',
  description:
    'Dedicated Vaishnav Calendar for sacred Ekadashi vrat dates, tithis, and festival observances. Serving devotees across India.',
}

export default function VaishnavCalendarPage() {
  const upcomingObservances = [
    {
      date: 'Upcoming Tithi',
      title: 'Rama Ekadashi',
      type: 'Ekadashi Vrat',
      significance: 'Dedicated grain-free fast pacifying sins and elevating devotion.',
      suitableCategory: 'Dry Fruits & Mix Trails',
      categorySlug: 'dry-fruits-mix-trails',
    },
    {
      date: 'Kartik Krishna Chaturdashi',
      title: 'Deepawali & Lakshmi-Govinda Pujan',
      type: 'Maha Mahotsav',
      significance: 'Auspicious ghee deepam seva and royal satvik bhoga offerings.',
      suitableCategory: 'Milk Premix',
      categorySlug: 'milk-premix',
    },
    {
      date: 'Kartik Shukla Pratipada',
      title: 'Annakut & Govardhan Puja',
      type: 'Chappan Bhog Festival',
      significance: 'Offering mounds of sanctified delicacies and pure stone-ground spices.',
      suitableCategory: 'Blend Masala & Seasoning',
      categorySlug: 'blend-masala-seasoning',
    },
    {
      date: 'Kartik Shukla Ekadashi',
      title: 'Devutthana (Prabodhini) Ekadashi',
      type: 'Mahadvadasi Vrat',
      significance: 'Awakening of Lord Vishnu and commencement of auspicious ceremonies.',
      suitableCategory: 'Ready to Eat Premix',
      categorySlug: 'ready-to-eat-premix',
    },
  ]

  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-porcelain border border-sand rounded-full text-burgundy text-xs font-bold uppercase tracking-widest shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-gold" />
            <span>Sacred Tithi & Fasting Schedule</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Vaishnav Calendar
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            Honour sacred fasting codes and festive deity seva with pure, uncompromised satvik pantry provisions.
          </p>
        </div>

        {/* Notice of Feature Clarification */}
        <div className="p-6 bg-porcelain rounded-2xl border border-sand shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-copper font-serif text-lg font-semibold">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Devotional Vrat Alignment</span>
          </div>
          <p className="text-xs sm:text-sm text-cocoa leading-relaxed">
            This calendar serves as a dedicated guide for devout households planning Ekadashi fasting, Vrat observances, and Vaishnav festival Bhog. All Vaishnava Mart products are prepared strictly without onion or garlic in dedicated facilities to honour these sacred dates.
          </p>
          <p className="text-xs text-taupe">
            *Final regional panchangam timings and calendar customization features will be synchronized with client specifications.
          </p>
        </div>

        {/* Calendar Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingObservances.map((obs, idx) => (
            <div
              key={idx}
              className="p-6 bg-porcelain rounded-2xl border border-sand hover:border-gold/60 transition-all space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-sand pb-3">
                <span className="text-xs font-mono uppercase text-copper font-bold">{obs.date}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-burgundy/10 text-burgundy uppercase">
                  {obs.type}
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="font-serif text-2xl text-cocoa font-medium">{obs.title}</h2>
                <p className="text-xs sm:text-sm text-taupe leading-relaxed font-sans">{obs.significance}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-sand/60">
                <span className="text-taupe">Recommended Pantry:</span>
                <Link
                  href={`/category/${obs.categorySlug}`}
                  className="font-semibold text-burgundy hover:underline flex items-center gap-1"
                >
                  <span>{obs.suitableCategory}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pan India Support Banner */}
        <div className="p-6 bg-gradient-to-r from-cream via-ivory to-cream rounded-2xl border border-gold/40 text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-copper font-bold">Serving Customers Across India</p>
          <p className="font-serif text-xl sm:text-2xl text-cocoa">
            Ensure your kitchen is prepared before every holy Tithi.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary text-sm px-6 h-11">
              Shop Vrat & Festival Pantry
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
