'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CategoryRepository } from '@/lib/data/repositories'
import { ArrowLeft, CheckCircle2, Tag } from 'lucide-react'

export default function AddCategoryPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('/images/generated/prod-saffron-dryfruit.jpg')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setName(val)
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    setSlug(autoSlug)
    setSeoTitle(`${val} | Vaishnava Mart`)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const newCat = {
      id: `cat-${Date.now()}`,
      name,
      slug: slug || `cat-${Date.now()}`,
      description,
      image,
      seoTitle,
      seoDescription,
      visible: true,
      sortOrder: 10,
    }
    await CategoryRepository.saveCategory(newCat)
    router.push(`/category/${newCat.slug}`)
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto pb-16">
      <div className="flex items-center gap-3 pb-6 border-b border-sand">
        <Link href="/admin/add" className="p-2 rounded-xl bg-ivory border border-sand hover:text-burgundy">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cocoa">Create New Category</h1>
          <p className="text-xs text-taupe">Add a dedicated pantry collection to your store.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-ivory p-6 sm:p-8 rounded-3xl border border-sand space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Category Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Traditional Vrat Flours"
            value={name}
            onChange={handleNameChange}
            className="w-full p-3 bg-porcelain border border-sand rounded-xl text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Category URL Address
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-taupe font-mono">vaishnavamart.com/category/</span>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Collection Description *
          </label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-porcelain border border-sand rounded-xl text-xs"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
            Banner Image URL
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs font-mono"
          />
        </div>

        <div className="pt-4 border-t border-sand flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary text-sm px-8 h-11">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            <span>{saving ? 'Creating Category...' : 'Create Category'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
