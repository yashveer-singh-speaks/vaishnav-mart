'use client'

import React from 'react'
import { ProductFeature } from '@/types'
import { ShieldCheck, Sparkles, Heart, Leaf, Check, Clock } from 'lucide-react'

interface FeatureCardsProps {
  features: ProductFeature[]
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  heart: Heart,
  leaf: Leaf,
  check: Check,
  clock: Clock,
}

export const ProductFeatureCards: React.FC<FeatureCardsProps> = ({ features }) => {
  if (!features || features.length === 0) return null

  // Double features for smooth continuous marquee
  const looped = features.concat(features)

  return (
    <div className="py-8 border-y border-sand overflow-hidden bg-porcelain/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4">
        <span className="text-[11px] uppercase tracking-widest font-semibold text-copper">
          Purity Attributes & Diet Conformity
        </span>
      </div>

      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center space-x-4 pr-4">
          {looped.map((f, idx) => {
            const IconComp = iconMap[f.iconValue || 'shield'] || ShieldCheck
            return (
              <div
                key={idx}
                className="w-[180px] sm:w-[220px] flex-shrink-0 p-4 bg-ivory rounded-xl border border-sand hover:border-burgundy transition-all flex items-center gap-3 shadow-sm"
              >
                <div className="p-2 rounded-lg bg-porcelain border border-sand text-burgundy flex-shrink-0">
                  <IconComp className="w-5 h-5 text-burgundy" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-cocoa truncate">{f.name}</h4>
                  <p className="text-[10px] sm:text-xs text-taupe truncate mt-0.5">
                    {f.explanation || 'Certified Satvik Standard'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
