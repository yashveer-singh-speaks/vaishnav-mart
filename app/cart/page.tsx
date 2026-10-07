'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/data/CartContext'
import { useAuth } from '@/lib/auth/AuthContext'
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const router = useRouter()
  const { items, itemCount, subtotal, shippingCost, total, updateQuantity, removeFromCart } = useCart()
  const { isAuthenticated, user, setIsLoginModalOpen, setIsProfileModalOpen } = useAuth()

  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError('')
    if (couponCode.trim().toUpperCase() === 'SATVIK50') {
      setDiscount(50)
      setCouponApplied(true)
    } else if (couponCode.trim().toUpperCase() === 'EKADASHI') {
      setDiscount(75)
      setCouponApplied(true)
    } else {
      setCouponError('Invalid coupon code. Try "SATVIK50"')
    }
  }

  const finalTotal = Math.max(0, total - discount)

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true)
      return
    }
    if (!user?.profileComplete) {
      setIsProfileModalOpen(true)
      return
    }
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center bg-porcelain p-8 sm:p-12 rounded-3xl border border-sand space-y-4 shadow-sm">
          <div className="w-20 h-20 mx-auto rounded-full bg-cream/70 flex items-center justify-center text-taupe">
            <ShoppingBag className="w-10 h-10 opacity-40 text-burgundy" />
          </div>
          <h1 className="font-serif text-3xl text-cocoa">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-taupe leading-relaxed">
            Your sacred pantry awaits. Discover cold-ground masalas, fragrant Kashmiri saffron, and pure Ekadashi fasting foods.
          </p>
          <div className="pt-3">
            <Link href="/shop" className="btn-primary w-full justify-center">
              <span>Explore The Pantry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl text-cocoa mb-2">Shopping Cart</h1>
        <p className="text-xs sm:text-sm text-taupe mb-8">
          You have {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Products Column (Left) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-4 sm:p-5 bg-porcelain rounded-2xl border border-sand flex gap-4 sm:gap-6 items-center shadow-sm"
              >
                {/* 1:1 Image */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-ivory border border-sand flex-shrink-0">
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1">
                  <div>
                    <Link
                      href={`/${product.slug}`}
                      className="font-serif text-base sm:text-lg text-cocoa hover:text-burgundy font-medium line-clamp-1 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] sm:text-xs text-taupe mt-0.5">
                      Net Wt: {product.weight} {product.unit}
                    </p>
                    <p className="font-semibold text-sm sm:text-base text-burgundy mt-1">
                      ₹{product.price}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-sand rounded-xl bg-ivory overflow-hidden h-9">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 text-taupe hover:text-burgundy"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 font-mono text-xs font-semibold text-cocoa">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2.5 text-taupe hover:text-burgundy"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="flex items-center gap-4">
                      <span className="font-sans font-bold text-sm sm:text-base text-cocoa">
                        ₹{product.price * quantity}
                      </span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1.5 text-taupe/60 hover:text-clay rounded-lg hover:bg-cream/40 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Right) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
            <div className="p-6 sm:p-8 bg-porcelain rounded-3xl border border-sand shadow-sm space-y-6">
              <h2 className="font-serif text-2xl text-cocoa">Order Summary</h2>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs uppercase font-semibold text-taupe tracking-wider block">
                  Promo / Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-taupe/60" />
                    <input
                      type="text"
                      placeholder="e.g. SATVIK50"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-ivory border border-sand rounded-xl text-xs uppercase font-mono tracking-wider focus:border-burgundy outline-none"
                    />
                  </div>
                  <button type="submit" className="btn-secondary h-10 px-4 text-xs">
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs text-clay">{couponError}</p>}
                {couponApplied && (
                  <p className="text-xs text-botanical font-medium">✓ Coupon applied! ₹{discount} saved</p>
                )}
              </form>

              {/* Line Items */}
              <div className="space-y-3 text-sm text-taupe border-t border-sand pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-cocoa">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-botanical">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-botanical font-medium">Free</span>
                    ) : (
                      `₹${shippingCost}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-cocoa pt-3 border-t border-sand">
                  <span>Total Due</span>
                  <span className="text-burgundy text-xl">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="btn-primary w-full h-13 text-sm justify-center rounded-xl shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-taupe/80 pt-1">
                <ShieldCheck className="w-4 h-4 text-botanical" />
                <span>100% Secure Checkout & Dedicated Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
