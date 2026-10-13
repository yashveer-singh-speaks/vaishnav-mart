'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

interface AnnouncementBarProps {
  text?: string
  link?: string
  enabled?: boolean
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = 'Serving Customers Across India • 100% No Onion, No Garlic • Pure Satvik & Jain Pantry',
  link = '/shop',
  enabled = true,
}) => {
  const [closed, setClosed] = useState(false)

  if (!enabled || closed) return null

  return (
    <aside aria-label="Announcement" className="bg-burgundy text-ivory text-xs sm:text-sm font-medium tracking-wide py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-sans">
          {link ? (
            <Link href={link} className="hover:underline transition-opacity inline-flex items-center gap-1.5">
              <span>{text}</span>
            </Link>
          ) : (
            <span>{text}</span>
          )}
        </div>
        <button
          onClick={() => setClosed(true)}
          className="text-ivory/70 hover:text-ivory p-1 -mr-2 rounded transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  )
}
