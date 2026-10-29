'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

interface FloatingWhatsAppProps {
  phoneNumber?: string
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '8595268400',
}) => {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/91${cleanNumber}?text=Hare%20Krishna!%20I%20would%20like%20to%20inquire%20about%20Vaishnava%20Mart%20products.`

  return (
    <aside
      aria-label="Direct WhatsApp Support"
      className="fixed bottom-5 left-5 z-50 flex items-center group pointer-events-auto print:hidden"
    >
      {/* Floating Badge Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 ring-2 ring-white/70"
      >
        <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 fill-current stroke-white stroke-[1.5]" />

        {/* Subtle pulsating ping ring */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#128C7E] border border-white" />
        </span>
      </a>

      {/* Tooltip on hover (appears to the right since badge is on the left) */}
      <span className="hidden sm:inline-block ml-2.5 px-3 py-1 rounded-full bg-porcelain text-cocoa text-[11px] font-semibold shadow-md border border-sand opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform -translate-x-2 group-hover:translate-x-0">
        WhatsApp
      </span>
    </aside>
  )
}
