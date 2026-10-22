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
      className="fixed bottom-6 right-6 z-50 flex items-center group pointer-events-auto print:hidden"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-porcelain text-cocoa text-xs font-semibold shadow-lg border border-sand opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        Chat with us on WhatsApp
      </span>

      {/* Floating Badge Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-white/50"
      >
        <MessageCircle className="w-7 h-7 fill-current stroke-white stroke-[1.5]" />
        
        {/* Subtle pulsating ping ring */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#128C7E] border-2 border-white" />
        </span>
      </a>
    </aside>
  )
}
