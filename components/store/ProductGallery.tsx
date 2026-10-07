'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  // Ensure exactly 4 slots
  const validImages = images.length > 0 ? images.slice(0, 4) : ['/images/generated/prod-shahi-masala.jpg']
  while (validImages.length < 4) {
    validImages.push(validImages[0])
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Autoplay every 3.8s until user interacts
  useEffect(() => {
    if (userInteracted) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validImages.length)
    }, 3800)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [userInteracted, validImages.length])

  const handleManualSelect = (index: number) => {
    setUserInteracted(true) // Halts autoplay permanently
    setActiveIndex(index)
  }

  const handleNext = () => {
    setUserInteracted(true)
    setActiveIndex((prev) => (prev + 1) % validImages.length)
  }

  const handlePrev = () => {
    setUserInteracted(true)
    setActiveIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Main 1:1 Large Image Frame */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-porcelain border border-sand group shadow-sm">
        <Image
          src={validImages[activeIndex]}
          alt={`${productName} view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* Navigation arrows (trigger manual interaction) */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-porcelain/80 backdrop-blur-sm text-cocoa hover:text-burgundy opacity-0 group-hover:opacity-100 transition-all shadow-md"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-porcelain/80 backdrop-blur-sm text-cocoa hover:text-burgundy opacity-0 group-hover:opacity-100 transition-all shadow-md"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Small Active Indicator Badge */}
        <div className="absolute bottom-3 right-3 bg-cocoa/70 backdrop-blur-sm text-ivory text-[10px] px-2.5 py-1 rounded-full font-mono">
          {activeIndex + 1} / {validImages.length}
        </div>
      </div>

      {/* Exactly 4 Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {validImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => handleManualSelect(idx)}
            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
              activeIndex === idx
                ? 'border-burgundy ring-2 ring-burgundy/20 shadow-md scale-95'
                : 'border-sand hover:border-copper opacity-70 hover:opacity-100'
            }`}
            aria-label={`Select thumbnail ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${productName} thumb ${idx + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
