'use client'

import React from 'react'

/**
 * Continuously Scrolling Hare Krishna Mahamantra Text Strip
 * Displays:
 * HARE KRISHNA HARE KRISHNA KRISHNA KRISHNA HARE HARE
 * HARE RAM HARE RAM RAM RAM HARE HARE
 * Infinite seamless loop with respectful traditional styling.
 */
export const HareKrishnaTicker: React.FC = () => {
  const mantraSegment = (
    <span className="inline-flex items-center gap-6 sm:gap-8 mx-3 sm:mx-4">
      <span className="text-gold/90 font-serif text-base sm:text-lg tracking-wider">
        卐
      </span>
      <span className="font-serif tracking-widest text-xs sm:text-sm font-semibold uppercase text-ivory drop-shadow-sm">
        HARE KRISHNA HARE KRISHNA KRISHNA KRISHNA HARE HARE
      </span>
      <span className="text-gold/80 text-xs sm:text-sm">✦</span>
      <span className="font-serif tracking-widest text-xs sm:text-sm font-semibold uppercase text-ivory drop-shadow-sm">
        HARE RAM HARE RAM RAM RAM HARE HARE
      </span>
      <span className="text-gold/90 font-serif text-base sm:text-lg tracking-wider">
        卐
      </span>
    </span>
  )

  return (
    <div
      aria-label="Hare Krishna Mahamantra"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#5E2228] via-[#7A3037] to-[#5E2228] border-b border-gold/30 text-ivory py-2 sm:py-2.5 select-none"
    >
      {/* Decorative top & bottom subtle gold filigree lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Infinite scrolling ticker container */}
      <div className="flex w-max animate-mantra-ticker">
        {/* Repeating segments to create seamless infinite illusion */}
        <div className="flex items-center whitespace-nowrap">
          {mantraSegment}
          {mantraSegment}
          {mantraSegment}
        </div>
        <div className="flex items-center whitespace-nowrap" aria-hidden="true">
          {mantraSegment}
          {mantraSegment}
          {mantraSegment}
        </div>
      </div>
    </div>
  )
}
