'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, X, Sparkles, ArrowRight } from 'lucide-react'
import { Product, Category } from '@/types'
import { ProductRepository, CategoryRepository } from '@/lib/data/repositories'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const popularSearches = [
    'No Onion No Garlic',
    'Ekadashi Foods',
    'Jain Masala',
    'Lemon Rice',
    'Bilona Cow Ghee',
    'Saffron',
  ]

  useEffect(() => {
    async function loadData() {
      const [prods, cats] = await Promise.all([
        ProductRepository.getAllProducts({ status: 'active' }),
        CategoryRepository.getAllCategories(),
      ])
      setAllProducts(prods)
      setAllCategories(cats)
    }
    loadData()
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setFilteredProducts([])
      setFilteredCategories([])
      return
    }

    const matchedProds = allProducts.filter((p) => {
      const inName = p.name.toLowerCase().includes(q)
      const inDesc = p.description.toLowerCase().includes(q)
      const inFeatures = p.features.some((f) => f.name.toLowerCase().includes(q))
      const inIngredients = p.ingredients?.toLowerCase().includes(q) || false
      return inName || inDesc || inFeatures || inIngredients
    })

    const matchedCats = allCategories.filter((c) =>
      c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    )

    setFilteredProducts(matchedProds)
    setFilteredCategories(matchedCats)
  }, [query, allProducts, allCategories])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ivory/95 backdrop-blur-md animate-in fade-in duration-200">
      {/* Top Bar with Input */}
      <div className="border-b border-sand bg-porcelain px-4 sm:px-8 py-5 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Search className="w-6 h-6 text-taupe flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search masalas, snacks, premixes, dry fruits..."
            className="w-full text-lg sm:text-2xl font-serif text-cocoa bg-transparent placeholder:text-taupe/60 outline-none"
          />
          <button
            onClick={onClose}
            className="p-2 text-taupe hover:text-burgundy rounded-full hover:bg-cream/40 transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 max-w-4xl mx-auto w-full">
        {!query.trim() ? (
          <div>
            <h4 className="text-xs uppercase tracking-widest text-taupe font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-copper" /> Popular Searches
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 bg-porcelain border border-sand rounded-full text-sm text-cocoa hover:border-burgundy hover:text-burgundy transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>

            <h4 className="text-xs uppercase tracking-widest text-taupe font-semibold mt-10 mb-4">
              Browse by Category
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allCategories.slice(0, 6).map((c) => (
                <Link
                  key={c.id}
                  href={`/category/${c.slug}`}
                  onClick={onClose}
                  className="p-4 bg-porcelain border border-sand rounded-xl hover:border-burgundy transition-all group"
                >
                  <p className="font-medium text-cocoa group-hover:text-burgundy transition-colors">{c.name}</p>
                  <p className="text-xs text-taupe line-clamp-1 mt-1">{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Matching Categories */}
            {filteredCategories.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-taupe font-semibold mb-3">
                  Matching Categories ({filteredCategories.length})
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {filteredCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/category/${c.slug}`}
                      onClick={onClose}
                      className="px-4 py-2 bg-porcelain border border-copper/30 rounded-lg text-sm text-burgundy font-medium hover:bg-cream/50 transition-colors flex items-center gap-2"
                    >
                      <span>{c.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Matching Products */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-taupe font-semibold mb-4">
                Products ({filteredProducts.length})
              </h4>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-porcelain rounded-2xl border border-sand">
                  <p className="font-serif text-xl text-cocoa">No products match &ldquo;{query}&rdquo;</p>
                  <p className="text-sm text-taupe mt-1">Try searching for &apos;Jain&apos;, &apos;Ekadashi&apos;, &apos;Masala&apos;, or &apos;Ghee&apos;.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProducts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 bg-porcelain border border-sand rounded-xl hover:border-burgundy transition-all group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream/40 flex-shrink-0">
                        <Image
                          src={p.mainImage}
                          alt={p.name}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-cocoa text-sm group-hover:text-burgundy transition-colors truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-taupe mt-0.5 line-clamp-1">
                          {p.features.slice(0, 2).map((f) => f.name).join(' • ')}
                        </p>
                        <p className="text-sm font-semibold text-burgundy mt-1">₹{p.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
