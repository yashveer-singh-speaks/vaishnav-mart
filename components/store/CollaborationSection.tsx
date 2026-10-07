'use client'

import React from 'react'
import Image from 'next/image'
import { MessageSquare, ArrowRight } from 'lucide-react'

interface CollaborationProps {
  heading?: string
  subheading?: string
  body?: string
  image?: string
}

export const CollaborationSection: React.FC<CollaborationProps> = ({
  heading = 'Have something worth building together?',
  subheading = 'COLLABORATE & WHOLESALE',
  body = 'We partner with temples, ashrams, sacred caterers, and pure Satvik culinary ventures committed to authentic ingredients.',
  image = '/images/generated/collaboration-bg.jpg',
}) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+919876543210'
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  const message = encodeURIComponent(
    'Hello Vaishnava Mart, I would like to discuss a potential collaboration or business opportunity. Please let me know a convenient time to connect.'
  )
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`

  return (
    <section className="relative py-24 sm:py-32 bg-ivory overflow-hidden border-b border-sand">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 opacity-15">
        <Image
          src={image}
          alt="Vaishnava Mart Collaboration"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ivory/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-copper font-semibold">
          {subheading}
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-cocoa font-normal">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-taupe max-w-2xl mx-auto leading-relaxed font-sans">
          {body}
        </p>

        <div className="pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-3"
          >
            <MessageSquare className="w-5 h-5 text-gold" />
            <span>Talk to Us</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
