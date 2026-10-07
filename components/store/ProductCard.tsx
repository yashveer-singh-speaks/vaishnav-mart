'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Plus, Minus, Check } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/lib/data/CartContext'
import { useWishlist } from '@/lib/data/WishlistContext'

interface ProductCardProps {
  product: Product
  priorityImage?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priorityImage = false }) => {
  const { addToCart, updateQuantity, items } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [justAdded, setJustAdded] = useState(false)

  const cartItem = items.find((i) => i.productId === product.id)
  const quantity = cartItem?.quantity || 0
  const isWishlisted = isInWishlist(product.id)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    await addToCart(product.id, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }

  const handleMinus = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateQuantity(product.id, quantity - 1)
  }

  const handlePlus = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateQuantity(product.id, quantity + 1)
  }

  return (
    <div className="group relative bg-porcelain border border-sand rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg flex flex-col justify-between">
      {/* Top Media Container (1:1 Ratio) */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-cream/30 mb-3 sm:mb-4">
        <Link href={`/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priorityImage}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Feature Badges */}
        {product.features && product.features.length > 0 && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
            <span className="bg-ivory/90 backdrop-blur-md text-burgundy text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm border border-sand">
              {product.features[0].name}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 p-1.5 sm:p-2 bg-ivory/80 backdrop-blur-md rounded-full text-cocoa hover:text-burgundy transition-all hover:scale-110 z-10"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-burgundy text-burgundy' : ''}`} />
        </button>

        {/* Quick Add Overlay for Desktop */}
        <div className="absolute bottom-2.5 inset-x-2.5 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          {quantity === 0 ? (
            <button
              onClick={handleQuickAdd}
              className="w-full bg-burgundy/95 hover:bg-burgundy text-ivory text-xs font-semibold py-2.5 px-3 rounded-xl shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-1.5"
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-gold" />
                  <span>Added ✓</span>
                </>
              ) : (
                <span>Quick Add</span>
              )}
            </button>
          ) : (
            <div className="w-full bg-porcelain/95 border border-sand py-1.5 px-3 rounded-xl shadow-md flex items-center justify-between text-xs font-semibold">
              <button
                onClick={handleMinus}
                className="p-1 hover:text-burgundy transition-colors"
                aria-label="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-cocoa">{quantity}</span>
              <button
                onClick={handlePlus}
                className="p-1 hover:text-burgundy transition-colors"
                aria-label="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Information Area */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[10px] sm:text-xs text-taupe uppercase tracking-wider font-semibold block mb-1">
            {product.categoryIds[0]?.replace('cat-', 'Pantry #') || 'Pure Satvik'}
          </span>
          <Link href={`/${product.slug}`}>
            <h3 className="font-serif text-base sm:text-lg text-cocoa font-medium line-clamp-1 group-hover:text-burgundy transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-taupe line-clamp-1 mt-0.5">
            {product.features.map((f) => f.name).join(' • ')}
          </p>
        </div>

        {/* Price & Mobile Add */}
        <div className="mt-3 pt-2 border-t border-sand/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-bold text-base sm:text-lg text-burgundy">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="font-sans text-xs text-taupe line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>

          {/* Mobile Always-Visible Quick Add */}
          <div className="sm:hidden">
            {quantity === 0 ? (
              <button
                onClick={handleQuickAdd}
                className="bg-burgundy text-ivory text-xs px-2.5 py-1.5 rounded-lg font-medium"
              >
                {justAdded ? '✓' : 'Add'}
              </button>
            ) : (
              <div className="flex items-center gap-2 border border-sand bg-porcelain px-2 py-0.5 rounded-lg text-xs">
                <button onClick={handleMinus} className="p-0.5">-</button>
                <span className="font-mono font-bold">{quantity}</span>
                <button onClick={handlePlus} className="p-0.5">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
