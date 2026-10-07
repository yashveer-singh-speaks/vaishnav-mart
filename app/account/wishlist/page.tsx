'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useWishlist } from '@/lib/data/WishlistContext'
import { Product } from '@/types'
import { ProductRepository } from '@/lib/data/repositories'
import { ProductCard } from '@/components/store/ProductCard'
import { Heart } from 'lucide-react'

export default function AccountWishlistPage() {
  const { wishlistIds } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWishlisted() {
      const all = await ProductRepository.getAllProducts({ status: 'active' })
      const matched = all.filter((p) => wishlistIds.includes(p.id))
      setProducts(matched)
      setLoading(false)
    }
    loadWishlisted()
  }, [wishlistIds])

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-sand">
        <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">Sacred Wishlist</h2>
        <p className="text-xs sm:text-sm text-taupe mt-0.5">
          Saved delicacies and pantry essentials for upcoming occasions
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-taupe">Loading wishlist...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-ivory rounded-2xl border border-sand space-y-4">
          <Heart className="w-10 h-10 mx-auto text-taupe opacity-40" />
          <p className="font-serif text-xl text-cocoa">Your wishlist is empty</p>
          <p className="text-xs text-taupe">
            Click the heart icon on any product to bookmark it for later.
          </p>
          <Link href="/shop" className="btn-primary text-xs h-10 px-5 inline-flex">
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
