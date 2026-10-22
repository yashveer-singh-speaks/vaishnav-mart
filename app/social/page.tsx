import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Instagram, Facebook, MessageCircle, ExternalLink, Share2, Sparkles, Phone, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Connect With Our Social Community | Vaishnava Mart (Ras Kan)',
  description:
    'Join our devotional and satvik culinary community across Instagram, Facebook, and WhatsApp. Stay updated with recipes, festival schedules, and new Ras Kan blends.',
}

export default function SocialPage() {
  const socialChannels = [
    {
      name: 'Instagram (@raskanspices)',
      handle: '@raskanspices',
      url: 'https://www.instagram.com/raskanspices?rpxt=MWtmMTUyMmdkM2MxeA%3D%3D&utm_source=qr',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584]',
      description:
        'Daily devotional reels, recipes without onion or garlic, culinary purity showcases, and behind-the-scenes stone grinding.',
      actionText: 'Follow on Instagram',
    },
    {
      name: 'Official Facebook Page (Ras Kan Foods)',
      handle: 'Ras Kan Foods',
      url: 'https://www.facebook.com/share/1F7rjb2e7P/?mibextid=wwXIfr',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      description:
        'Engage with our wider devotional community, special festive discount announcements, and spiritual food articles.',
      actionText: 'Connect on Facebook',
    },
    {
      name: 'Vaishnava Mart Community',
      handle: 'Vaishnava Mart Devotees',
      url: 'https://www.facebook.com/share/1FP5f2cSjQ/?mibextid=wwXIfr',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      description:
        'Community group for temple cooks, Jain households, and Satvik cuisine enthusiasts sharing prasad preparation ideas.',
      actionText: 'Join Facebook Group',
    },
    {
      name: 'WhatsApp Dedicated Concierge',
      handle: '+91 85952 68400',
      url: 'https://wa.me/918595268400',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      description:
        'Direct personal assistance for temple bulk supplies, Ekadashi parcel dispatch queries, and quick doorstep ordering.',
      actionText: 'Chat on WhatsApp',
    },
  ]

  return (
    <div className="bg-ivory min-h-screen py-14 sm:py-24 border-b border-sand">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-porcelain border border-sand rounded-full text-burgundy text-xs font-bold uppercase tracking-widest">
            <Share2 className="w-3.5 h-3.5 text-copper" />
            <span>Community & Channels</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Connect With Our Social Channels
          </h1>
          <p className="text-base text-taupe leading-relaxed font-sans">
            Follow our culinary journey, devotional kitchen tips, festival announcements, and direct WhatsApp customer support.
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socialChannels.map((channel) => {
            const Icon = channel.icon
            return (
              <div
                key={channel.name}
                className="bg-porcelain border border-sand rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:border-gold/60 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl ${channel.color} text-white flex items-center justify-center shadow-md flex-shrink-0`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl text-cocoa font-semibold">
                        {channel.name}
                      </h2>
                      <span className="text-xs text-copper font-medium tracking-wide">
                        {channel.handle}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-taupe leading-relaxed font-sans">
                    {channel.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-sand/80">
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full h-12 text-sm justify-center group"
                  >
                    <span>{channel.actionText}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Operating Company Reference */}
        <div className="bg-cream/60 border border-sand rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-burgundy font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>NIMAI TRADE • Vaishnava Mart • Ras Kan Foods</span>
          </div>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed">
            Registered Hub: 23/76 Tilak Nagar, New Delhi 110018 • WhatsApp / Call: +91 85952 68400
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-cocoa pt-1">
            <a href="mailto:nimaitrade55@gmail.com" className="hover:text-burgundy flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> nimaitrade55@gmail.com
            </a>
            <span>•</span>
            <a href="mailto:raskanfood@gmail.com" className="hover:text-burgundy flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> raskanfood@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
