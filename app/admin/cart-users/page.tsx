'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserProfile, Cart } from '@/types'
import { CartRepository } from '@/lib/data/repositories'
import { ShoppingCart, MessageSquare, Mail, ArrowRight, User, AlertCircle } from 'lucide-react'

export default function AdminCartUsersPage() {
  const [cartUsers, setCartUsers] = useState<
    Array<{ user: UserProfile; cart: Cart; totalValue: number }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await CartRepository.getCartUsers()
      setCartUsers(data)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-cocoa">Cart Users (Unfinished Carts)</h1>
        <p className="text-xs sm:text-sm text-taupe mt-1">
          Follow up with verified customers who added items to their cart without completing checkout.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-xs text-taupe">Loading unfinished carts...</div>
      ) : cartUsers.length === 0 ? (
        <div className="text-center py-20 bg-ivory rounded-3xl border border-sand p-8 space-y-3">
          <ShoppingCart className="w-10 h-10 mx-auto text-taupe opacity-40" />
          <p className="font-serif text-xl text-cocoa">No unfinished carts right now</p>
          <p className="text-xs text-taupe">All active shoppers have completed their purchases!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartUsers.map(({ user, cart, totalValue }) => {
            const hasPhone = Boolean(user.phone)
            const cleanPhone = user.phone ? user.phone.replace(/[^0-9]/g, '') : ''
            const waText = encodeURIComponent(
              `Hello ${user.name}, you recently added a few products to your Vaishnava Mart cart. If you had any issue while ordering, we would be happy to help.`
            )
            const waLink = hasPhone ? `https://wa.me/${cleanPhone}?text=${waText}` : null

            return (
              <div
                key={user.uid}
                className="p-6 bg-ivory rounded-2xl border border-sand hover:border-gold/60 shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-porcelain border border-sand flex-shrink-0">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-taupe font-bold">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm sm:text-base text-cocoa truncate">{user.name}</p>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          hasPhone
                            ? 'bg-botanical/15 text-botanical'
                            : 'bg-clay/15 text-clay'
                        }`}
                      >
                        {hasPhone ? 'Contact Available' : 'Profile Incomplete'}
                      </span>
                    </div>

                    <p className="text-xs text-taupe mt-0.5">
                      {user.email} {hasPhone ? `• ${user.phone}` : ''}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-copper font-medium mt-1">
                      <span>{cart.items.length} items in cart</span>
                      <span>• Total: ₹{totalValue}</span>
                      <span className="text-[11px] text-taupe">
                        (Active {new Date(cart.lastActivityAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-sand/70">
                  {waLink && (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary h-10 px-3.5 text-xs inline-flex items-center gap-1.5 text-botanical border-botanical/30 hover:bg-botanical/10"
                      title="Follow up on WhatsApp"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  <a
                    href={`mailto:${user.email}?subject=${encodeURIComponent('Your Vaishnava Mart Pantry Cart')}&body=${waText}`}
                    className="btn-secondary h-10 px-3.5 text-xs inline-flex items-center gap-1.5"
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </a>

                  <Link
                    href={`/admin/cart-users/${user.uid}`}
                    className="btn-primary h-10 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <span>Inspect Cart</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
