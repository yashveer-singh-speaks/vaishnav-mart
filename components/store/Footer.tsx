'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react'
import { VaishnavaTilak } from './VaishnavaTilak'
import { TulsiPlant } from './TulsiPlant'

// Lazy load Three.js Medallion with clean fallback
const FooterMedallion = dynamic(
  () => import('@/components/three/FooterMedallion').then((mod) => mod.FooterMedallion),
  { ssr: false, loading: () => <div className="w-[120px] h-[120px]" /> }
)

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5E2228] text-ivory/90 pt-16 pb-8 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-ivory/10">
          {/* Brand & Philosophy Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative w-14 h-9 rounded-lg overflow-hidden border border-gold/40 bg-black flex-shrink-0 shadow-xs">
                <Image src="/images/logo/logo.png" alt="Ras Kan Logo" fill sizes="64px" className="object-contain p-0.5" />
              </div>
              <TulsiPlant className="w-9 h-9" />
              <VaishnavaTilak className="w-5 h-7" />
              <div className="flex flex-col text-left leading-none">
                <span className="font-serif text-2xl font-bold text-ivory">Vaishnava Mart</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-gold font-semibold mt-1">
                  Pure • Satvik • Devotional
                </span>
              </div>
            </Link>
            <p className="text-sm text-ivory/70 leading-relaxed max-w-sm font-sans pt-1">
              Vaishnava Mart represents an uncompromised commitment to devotional culinary purity. Every spice, flour, and grain is ground in dedicated allium-free chambers for Jain, Vaishnav, and devout households.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold/90 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Certified No Onion • No Garlic • Zero Contamination</span>
            </div>
          </div>

          {/* Column: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">Pantry Collections</h4>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li>
                <Link href="/shop" className="hover:text-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link href="/category/blend-masala-seasoning" className="hover:text-gold transition-colors">
                  Blend Masala & Seasoning
                </Link>
              </li>
              <li>
                <Link href="/category/dry-fruits-mix-trails" className="hover:text-gold transition-colors">
                  Dry Fruits & Mix Trails
                </Link>
              </li>
              <li>
                <Link href="/category/khakhras" className="hover:text-gold transition-colors">
                  Khakhras
                </Link>
              </li>
              <li>
                <Link href="/category/soup-premix" className="hover:text-gold transition-colors">
                  Soup Premix
                </Link>
              </li>
              <li>
                <Link href="/category/milk-premix" className="hover:text-gold transition-colors">
                  Milk Premix
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Heritage & Standards */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">Our Philosophy</h4>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li>
                <Link href="/our-standard" className="hover:text-gold transition-colors">
                  Our Sacred Standard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  Origin & Craft
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-gold transition-colors">
                  Satvik Recipes
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-gold transition-colors">
                  Delivery Localities
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Bulk & Ashram Supply
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Help & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-gold font-semibold">Help & Legal</h4>
            <ul className="space-y-2 text-sm text-ivory/80">
              <li>
                <Link href="/shipping-policy" className="hover:text-gold transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-gold transition-colors">
                  Return & Refund
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gold transition-colors">Satvik Journal & Blog</Link>
              </li>
              <li>
                <Link href="/social" className="hover:text-gold transition-colors">Social Channels</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Middle Seal row */}
        <div className="py-6 flex flex-col items-center justify-center border-b border-ivory/10">
          <FooterMedallion />
        </div>

        {/* Absolute Bottom Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory/60 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Vaishnava Mart. Divine Satvik culinary purity.</span>
            <span>FSSAI Lic. No. 10023011000987</span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="https://www.instagram.com/raskanspices?rpxt=MWtmMTUyMmdkM2MxeA%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://wa.me/918595268400"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              WhatsApp
            </Link>

            {/* SPECIAL OWNER LOGIN ICON ONLY: NO VISIBLE ADMIN TEXT */}
            <Link
              href="/owner-login"
              aria-label="Owner Login"
              title="Owner Login"
              className="inline-flex items-center justify-center text-ivory/40 hover:text-gold transition-colors text-[20px] sm:text-[22px] leading-none p-1 rounded hover:scale-110 active:scale-95"
            >
              📧
            </Link>
          </div>
        </div>
      </div>
    
      {/* Discreet Bottom-most Site Attribution */}
      <div className="mt-8 pt-4 pb-2 border-t border-black/20 text-center">
        <p className="text-[11px] sm:text-xs text-ivory/35 tracking-wide font-sans">
          Site built by{' '}
          <Link
            href="/yashveer-singh-rajpoot"
            className="text-ivory/45 hover:text-ivory/70 transition-colors underline decoration-ivory/25 underline-offset-2"
          >
            Yashveer Singh Rajpoot
          </Link>
          , the Founder of{' '}
          <Link
            href="/yashveer-labs"
            className="text-ivory/45 hover:text-ivory/70 transition-colors underline decoration-ivory/25 underline-offset-2"
          >
            Yashveer Labs
          </Link>{' '}
          and{' '}
          <Link
            href="/rajpoot-industries"
            className="text-ivory/45 hover:text-ivory/70 transition-colors underline decoration-ivory/25 underline-offset-2"
          >
            Rajpoot Industries
          </Link>
        </p>
      </div>
    </footer>
  )
}
