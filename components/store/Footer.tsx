'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react'

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
            <div className="relative w-44 h-14 bg-porcelain/95 p-2 rounded-lg">
              <Image
                src="/images/logo/logo.jpg"
                alt="Vaishnava Mart"
                fill
                sizes="176px"
                className="object-contain p-1"
              />
            </div>
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
                <Link href="/category/jain-foods" className="hover:text-gold transition-colors">
                  Jain Foods
                </Link>
              </li>
              <li>
                <Link href="/category/ekadashi-foods" className="hover:text-gold transition-colors">
                  Ekadashi Foods
                </Link>
              </li>
              <li>
                <Link href="/category/vaishnav-foods" className="hover:text-gold transition-colors">
                  Vaishnav Bhoga
                </Link>
              </li>
              <li>
                <Link href="/category/masalas" className="hover:text-gold transition-colors">
                  Pure Masalas
                </Link>
              </li>
              <li>
                <Link href="/category/dry-fruits" className="hover:text-gold transition-colors">
                  Dry Fruits & Saffron
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
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
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
            <span>© {new Date().getFullYear()} Vaishnava Mart. Purity you never have to question.</span>
            <span>FSSAI Lic. No. 10023011000987</span>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="https://instagram.com/vaishnavamart"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://wa.me/919876543210"
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
    </footer>
  )
}
