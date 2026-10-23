'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Product, Category } from '@/types'
import { ProductCard } from '@/components/store/ProductCard'
import { ChevronRight, Filter, SlidersHorizontal, X, Check } from 'lucide-react'

interface ShopClientProps {
  initialProducts: Product[]
  categories: Category[]
}

export const ShopClient: React.FC<ShopClientProps> = ({ initialProducts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDiet, setSelectedDiet] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'best_selling'>('newest')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const dietaryFilters = [
    { id: 'jain', label: 'Jain Compliant' },
    { id: 'vaishnav', label: 'Vaishnav Compliant' },
    { id: 'ekadashi', label: 'Ekadashi Friendly' },
    { id: 'bhoga', label: 'Bhoga Suitable' },
    { id: 'no_onion', label: 'No Onion and No Garlic' },
  ]

  const toggleDiet = (id: string) => {
    setSelectedDiet((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedDiet([])
    setPriceRange('all')
    setSortBy('newest')
  }

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && !product.categoryIds.includes(selectedCategory)) {
        return false
      }

      // Dietary filter
      if (selectedDiet.length > 0) {
        const featureNames = product.features.map((f) => f.name.toLowerCase())
        const matchesAll = selectedDiet.every((d) => {
          if (d === 'jain') return featureNames.some((n) => n.includes('jain'))
          if (d === 'vaishnav') return featureNames.some((n) => n.includes('vaishnav') || n.includes('bhoga'))
          if (d === 'ekadashi') return featureNames.some((n) => n.includes('ekadashi'))
          if (d === 'bhoga') return featureNames.some((n) => n.includes('bhoga'))
          if (d === 'no_onion') return featureNames.some((n) => n.includes('no onion') || true) // all products are no onion
          if (d === 'no_garlic') return featureNames.some((n) => n.includes('no garlic') || true)
          return true
        })
        if (!matchesAll) return false
      }

      // Price filter
      if (priceRange === 'under_300' && product.price >= 300) return false
      if (priceRange === '300_700' && (product.price < 300 || product.price > 700)) return false
      if (priceRange === 'above_700' && product.price <= 700) return false

      return true
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price
      if (sortBy === 'price_high') return b.price - a.price
      if (sortBy === 'best_selling') return b.stock - a.stock // best proxy for demand in mock
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }, [initialProducts, selectedCategory, selectedDiet, priceRange, sortBy])

  return (
    <div className="bg-ivory min-h-screen py-8 sm:py-12 border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-taupe mb-6">
          <Link href="/" className="hover:text-burgundy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-cocoa font-medium">Shop</span>
          {selectedCategory !== 'all' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-burgundy font-medium">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            </>
          )}
        </nav>

        {/* Page Heading & Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-sand">
          <div>
            <h1 className="font-serif text-3xl sm:text-5xl text-cocoa font-normal">
              The Pure Satvik Pantry
            </h1>
            <p className="text-xs sm:text-sm text-taupe mt-1.5 font-sans">
              Showing {filteredProducts.length} unadulterated essentials crafted with devotion.
            </p>
          </div>

          {/* Desktop Sort Control */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-taupe font-semibold uppercase tracking-wider hidden sm:inline">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-porcelain border border-sand rounded-xl px-3.5 py-2 text-xs sm:text-sm text-cocoa font-medium focus:border-burgundy outline-none shadow-sm cursor-pointer"
            >
              <option value="newest">Newest Additions</option>
              <option value="best_selling">Best Selling</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="sm:hidden btn-secondary h-10 px-3.5 text-xs inline-flex items-center gap-1.5 bg-porcelain"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters ({selectedDiet.length + (selectedCategory !== 'all' ? 1 : 0)})</span>
            </button>
          </div>
        </div>

        {/* Main Layout: Filters Left (Desktop) + Products Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8 items-start">
          {/* DESKTOP FILTERS SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 sticky top-28 bg-porcelain p-6 rounded-2xl border border-sand">
            <div className="flex items-center justify-between pb-3 border-b border-sand">
              <span className="font-serif text-lg text-cocoa font-medium flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-copper" /> Filters
              </span>
              {(selectedCategory !== 'all' || selectedDiet.length > 0 || priceRange !== 'all') && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-burgundy font-medium hover:underline"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Categories Filter */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-taupe">Categories</h4>
              <div className="space-y-1.5 text-sm">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-cream text-burgundy font-semibold'
                      : 'text-cocoa hover:bg-cream/50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedCategory === c.id
                        ? 'bg-cream text-burgundy font-semibold'
                        : 'text-cocoa hover:bg-cream/50'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary & Purity Claims Filter */}
            <div className="space-y-3 pt-3 border-t border-sand">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-taupe">
                Purity Standards
              </h4>
              <div className="space-y-2">
                {dietaryFilters.map((diet) => {
                  const checked = selectedDiet.includes(diet.id)
                  return (
                    <label
                      key={diet.id}
                      onClick={() => toggleDiet(diet.id)}
                      className="flex items-center gap-2.5 text-xs text-cocoa cursor-pointer select-none group"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          checked
                            ? 'bg-burgundy border-burgundy text-ivory'
                            : 'border-sand group-hover:border-burgundy'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={checked ? 'font-semibold text-burgundy' : ''}>
                        {diet.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-3 border-t border-sand">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-taupe">Price Range</h4>
              <div className="space-y-1.5 text-xs text-cocoa">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under_300', label: 'Under ₹300' },
                  { id: '300_700', label: '₹300 - ₹700' },
                  { id: 'above_700', label: 'Above ₹700' },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 cursor-pointer py-1"
                    onClick={() => setPriceRange(item.id)}
                  >
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === item.id}
                      onChange={() => setPriceRange(item.id)}
                      className="accent-burgundy"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-porcelain rounded-2xl border border-sand p-8 space-y-4">
                <p className="font-serif text-2xl text-cocoa">No items match your active filters</p>
                <p className="text-xs text-taupe max-w-sm mx-auto">
                  Try unchecking some purity filters or resetting your category selection.
                </p>
                <button onClick={resetFilters} className="btn-secondary text-xs h-10 px-5">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 w-[88%] max-w-xs h-full bg-porcelain shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-sand">
              <span className="font-serif text-xl text-cocoa font-medium">Filter Pantry</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-taupe hover:text-burgundy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 flex-1">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-taupe mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`block w-full text-left py-1 text-xs ${
                      selectedCategory === 'all' ? 'text-burgundy font-bold' : 'text-cocoa'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`block w-full text-left py-1 text-xs ${
                        selectedCategory === c.id ? 'text-burgundy font-bold' : 'text-cocoa'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-taupe mb-2">
                  Purity Standards
                </h4>
                <div className="space-y-2">
                  {dietaryFilters.map((diet) => (
                    <label
                      key={diet.id}
                      onClick={() => toggleDiet(diet.id)}
                      className="flex items-center gap-2 text-xs text-cocoa"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDiet.includes(diet.id)}
                        readOnly
                        className="accent-burgundy"
                      />
                      <span>{diet.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand flex gap-3">
              <button onClick={resetFilters} className="btn-secondary h-11 text-xs flex-1">
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="btn-primary h-11 text-xs flex-1 justify-center"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
