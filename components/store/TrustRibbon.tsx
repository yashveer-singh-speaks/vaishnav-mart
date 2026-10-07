'use client'

import React from 'react'

const standards = [
  { label: 'No Onion', detail: 'Zero Allium' },
  { label: 'No Garlic', detail: 'Strict Sanctuary' },
  { label: 'Jain Compliant', detail: 'Ahimsa Ethics' },
  { label: 'Vaishnav Compliant', detail: 'Sacred Seva' },
  { label: 'Bhoga Suitable', detail: 'Sanctified Purity' },
  { label: 'Ekadashi Friendly', detail: 'Grain Free' },
  { label: 'Tithi Friendly', detail: 'Fasting Ritual' },
  { label: 'Zero Contamination', detail: 'Audited Facility' },
]

export const TrustRibbon: React.FC = () => {
  return (
    <section
      aria-label="Brand Purity Standards"
      className="relative bg-burgundy text-ivory py-4 sm:py-5 overflow-hidden border-y border-gold/30 shadow-inner"
    >
      {/* Marquee Wrapper */}
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12">
          {standards.concat(standards).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="font-serif text-base sm:text-lg tracking-wide text-ivory">
                {item.label}
              </span>
              <span className="text-[10px] sm:text-xs text-gold/80 uppercase tracking-widest font-sans font-medium">
                [{item.detail}]
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
