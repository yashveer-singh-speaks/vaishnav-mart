'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { UserProfile, Cart, Product } from '@/types'
import { UserRepository, CartRepository, ProductRepository } from '@/lib/data/repositories'
import { ArrowLeft, MessageSquare, Mail, User, ShoppingBag, ShieldCheck } from 'lucide-react'

export default function AdminCartUserDetailPage() {
  const params = useParams()
  const userId = params.userId as string

  const [user, setUser] = useState<UserProfile | null>(null)
  const [cart, setCart] = useState<Cart | null>(null)
  const [cartProducts, setCartProducts] = useState<
    Array<{ product: Product; quantity: number }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [u, c] = await Promise.all([
        UserRepository.getUserById(userId),
        CartRepository.getCart(userId),
      ])
      setUser(u)
      setCart(c)

      if (c && c.items.length > 0) {
        const prods: Array<{ product: Product; quantity: number }> = []
        for (const it of c.items) {
          const p = await ProductRepository.getProductById(it.productId)
          if (p) prods.push({ product: p, quantity: it.quantity })
        }
        setCartProducts(prods)
      }

      setLoading(false)
    }
    load()
  }, [userId])

  if (loading) {
    return <div className="p-8 text-center text-xs text-taupe">Loading cart details...</div>
  }

  if (!user || !cart) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="font-serif text-xl text-cocoa">Cart user record not found</p>
        <Link href="/admin/cart-users" className="btn-secondary text-xs h-10 px-5">
          Back to Cart Users
        </Link>
      </div>
    )
  }

  const totalValue = cartProducts.reduce((sum, cp) => sum + cp.product.price * cp.quantity, 0)
  const cleanPhone = user.phone ? user.phone.replace(/[^0-9]/g, '') : ''
  const waText = encodeURIComponent(
    `Hello ${user.name}, you recently added a few products to your Vaishnava Mart cart. If you had any issue while ordering, we would be happy to help.`
  )
  const waLink = user.phone ? `https://wa.me/${cleanPhone}?text=${waText}` : null

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/cart-users"
            className="p-2 rounded-xl bg-ivory border border-sand hover:text-burgundy"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-cocoa">Unfinished Cart Inspection</h1>
            <p className="text-xs text-taupe">
              Customer: {user.name} • Active since {new Date(cart.lastActivityAt).toLocaleTimeString('en-IN')}
            </p>
          </div>
        </div>

        {/* Contact CTA helpers */}
        <div className="flex items-center gap-2">
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary h-10 px-4 text-xs inline-flex items-center gap-2 bg-botanical hover:bg-botanical/90"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Follow Up</span>
            </a>
          )}
          <a
            href={`mailto:${user.email}?subject=${encodeURIComponent('Assistance with your Vaishnava Mart cart')}&body=${waText}`}
            className="btn-secondary h-10 px-4 text-xs inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Products in Cart (7 cols) */}
        <div className="lg:col-span-7 bg-ivory p-6 rounded-3xl border border-sand space-y-4">
          <h2 className="font-serif text-xl text-cocoa flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-copper" /> Items Remaining in Cart ({cartProducts.length})
          </h2>

          <div className="divide-y divide-sand">
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-porcelain border border-sand flex-shrink-0">
                    <Image src={product.mainImage} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-xs sm:text-sm text-cocoa truncate">{product.name}</p>
                    <p className="text-xs text-taupe font-mono">
                      Qty: {quantity} × ₹{product.price}
                    </p>
                  </div>
                </div>

                <span className="font-bold text-sm sm:text-base text-cocoa">
                  ₹{product.price * quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-sand flex justify-between items-center text-sm font-bold text-cocoa">
            <span>Total Abandoned Cart Value</span>
            <span className="text-burgundy text-lg">₹{totalValue}</span>
          </div>
        </div>

        {/* Right: Customer Profile Snapshot (5 cols) */}
        <div className="lg:col-span-5 bg-ivory p-6 rounded-3xl border border-sand space-y-4">
          <h3 className="font-serif text-lg text-cocoa flex items-center gap-2">
            <User className="w-4 h-4 text-copper" /> Customer Contact Info
          </h3>

          <div className="space-y-3 text-xs text-taupe">
            <div>
              <span className="text-taupe uppercase tracking-wider font-semibold block mb-0.5">Name</span>
              <p className="font-medium text-cocoa text-sm">{user.name}</p>
            </div>

            <div>
              <span className="text-taupe uppercase tracking-wider font-semibold block mb-0.5">Email</span>
              <p className="font-medium text-cocoa">{user.email}</p>
            </div>

            <div>
              <span className="text-taupe uppercase tracking-wider font-semibold block mb-0.5">Phone</span>
              <p className="font-medium text-cocoa">{user.phone || 'No phone recorded'}</p>
            </div>

            <div>
              <span className="text-taupe uppercase tracking-wider font-semibold block mb-0.5">Marketing Consent</span>
              <p className="font-medium text-cocoa">
                {user.marketingConsent ? '✓ Consented to follow-up messages' : 'No explicit consent'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
