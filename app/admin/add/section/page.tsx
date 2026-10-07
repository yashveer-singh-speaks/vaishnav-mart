'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PageSection, LayoutType } from '@/types'
import { PageRepository } from '@/lib/data/repositories'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

const brandSwatches = [
  { name: 'Warm Ivory', hex: '#FBF6EC' },
  { name: 'Sand Cream', hex: '#F3E7D3' },
  { name: 'Soft Porcelain', hex: '#FFFDF8' },
  { name: 'Heritage Burgundy', hex: '#7A3037' },
  { name: 'Spice Copper', hex: '#B76B43' },
  { name: 'Antique Gold', hex: '#C69A5A' },
]

export default function AddSectionPage() {
  const router = useRouter()
  const [selectedPage, setSelectedPage] = useState('home')
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('layout_1')
  const [heading, setHeading] = useState('')
  const [subheading, setSubheading] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('/images/generated/story-why-exists.jpg')
  const [bgColor, setBgColor] = useState('#FBF6EC')
  const [buttonText, setButtonText] = useState('Shop Collection')
  const [buttonUrl, setButtonUrl] = useState('/shop')
  const [saving, setSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const pageData = await PageRepository.getPage(selectedPage)

    const newSec: PageSection = {
      id: `sec-${Date.now()}`,
      type: 'custom',
      order: pageData.draftSections.length + 1,
      visible: true,
      layout: selectedLayout,
      heading,
      subheading,
      body,
      image,
      background: { type: 'color', value: bgColor },
      button: { visible: true, text: buttonText, url: buttonUrl },
      styleSettings: { textAlign: 'left', headingAlign: 'left', imagePosition: 'right' },
    }

    const updatedSections = [...pageData.draftSections, newSec]
    await PageRepository.saveDraftSections(selectedPage, updatedSections)
    router.push(`/admin/edit/${selectedPage}`)
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-16">
      <div className="flex items-center gap-3 pb-6 border-b border-sand">
        <Link href="/admin/add" className="p-2 rounded-xl bg-ivory border border-sand hover:text-burgundy">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cocoa">Add Website Section</h1>
          <p className="text-xs text-taupe">Add a structured Lego block to any store page.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-ivory p-6 sm:p-8 rounded-3xl border border-sand space-y-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            1. Select Destination Page
          </label>
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="w-full p-3 bg-porcelain border border-sand rounded-xl text-sm"
          >
            <option value="home">Home Page</option>
            <option value="about">About Page</option>
            <option value="services">Services Page</option>
            <option value="contact">Contact Page</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            2. Choose Approved Layout
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'layout_1', label: 'Layout 1', desc: 'Heading, Image Left' },
              { id: 'layout_2', label: 'Layout 2', desc: 'Heading, Image Right' },
              { id: 'layout_3', label: 'Layout 3', desc: 'Card Showcase' },
            ].map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setSelectedLayout(l.id as LayoutType)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedLayout === l.id
                    ? 'bg-cream border-burgundy ring-1 ring-burgundy'
                    : 'bg-porcelain border-sand'
                }`}
              >
                <p className="font-bold text-xs text-cocoa">{l.label}</p>
                <p className="text-[10px] text-taupe">{l.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            3. Section Heading *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Traditional Sun-Dried Spices"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-3 bg-porcelain border border-sand rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Eyebrow / Subheading
          </label>
          <input
            type="text"
            placeholder="HANDCRAFTED HERITAGE"
            value={subheading}
            onChange={(e) => setSubheading(e.target.value)}
            className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Narrative Body
          </label>
          <textarea
            rows={3}
            placeholder="Describe the craft or culinary story..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-3 bg-porcelain border border-sand rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Background Color
          </label>
          <div className="flex flex-wrap gap-2">
            {brandSwatches.map((swatch) => (
              <button
                key={swatch.hex}
                type="button"
                onClick={() => setBgColor(swatch.hex)}
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 ${
                  bgColor === swatch.hex ? 'bg-cream border-burgundy font-bold' : 'bg-porcelain border-sand'
                }`}
              >
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: swatch.hex }} />
                <span>{swatch.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-sand flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary text-sm px-8 h-11">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            <span>{saving ? 'Adding Section...' : 'Add Section to Draft'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
