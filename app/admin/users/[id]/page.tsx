'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { UserProfile, Order, Cart } from '@/types'
import { UserRepository, OrderRepository, CartRepository } from '@/lib/data/repositories'
import { ArrowLeft, User, Package, ShoppingCart, MapPin, ShieldCheck, Mail, Phone } from 'lucide-react'

export default function AdminUserDetailPage() {
  const params = useParams()
  const uid = params.id as string

  const [user, setUser] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [cart, setCart] = useState<Cart | null>(null)
  const [activeTab, setActiveTab] = useState<'orders' | 'cart' | 'addresses'>('orders')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [u, o, c] = await Promise.all([
        UserRepository.getUserById(uid),
        OrderRepository.getOrders({ userId: uid }),
        CartRepository.getCart(uid),
      ])
      setUser(u)
      setOrders(o)
      setCart(c)
      setLoading(false)
    }
    load()
  }, [uid])

  if (loading) {
    return <div className="p-8 text-center text-xs text-taupe">Loading customer profile...</div>
  }

  if (!user) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="font-serif text-xl text-cocoa">Customer not found</p>
        <Link href="/admin/users" className="btn-secondary text-xs h-10 px-5">
          Back to Directory
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-sand">
        <Link
          href="/admin/users"
          className="p-2 rounded-xl bg-ivory border border-sand hover:text-burgundy"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cocoa">Customer Profile</h1>
          <p className="text-xs text-taupe font-mono">UID: {user.uid}</p>
        </div>
      </div>

      {/* Customer Snapshot Box */}
      <div className="p-6 bg-ivory rounded-3xl border border-sand flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-porcelain border-2 border-burgundy flex-shrink-0 shadow">
          {user.photoURL ? (
            <Image src={user.photoURL} alt={user.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-taupe text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-serif text-2xl text-cocoa font-medium">{user.name}</h2>
            <span
              className={`text-[11px] font-bold px-3 py-1 rounded-full w-fit mx-auto sm:mx-0 ${
                user.profileComplete
                  ? 'bg-botanical/15 text-botanical'
                  : 'bg-clay/15 text-clay'
              }`}
            >
              {user.profileComplete ? '✓ Profile Complete' : 'Profile Incomplete'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-taupe">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-copper" /> {user.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-copper" /> {user.phone || 'No phone'}
            </span>
            {user.gender && <span>Gender: {user.gender}</span>}
            {user.age && <span>Age: {user.age} yrs</span>}
          </div>

          <div className="pt-2 text-[11px] text-taupe">
            <span>Customer since {new Date(user.createdAt).toLocaleDateString('en-IN')}</span>
            <span className="ml-3">• Marketing Consent: {user.marketingConsent ? 'Granted' : 'Not Granted'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-sand pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'orders'
              ? 'bg-burgundy text-ivory'
              : 'text-taupe hover:text-cocoa bg-ivory border border-sand'
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'cart'
              ? 'bg-burgundy text-ivory'
              : 'text-taupe hover:text-cocoa bg-ivory border border-sand'
          }`}
        >
          Active Cart ({cart?.items.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'addresses'
              ? 'bg-burgundy text-ivory'
              : 'text-taupe hover:text-cocoa bg-ivory border border-sand'
          }`}
        >
          Addresses ({user.addresses.length})
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="p-8 text-center text-xs text-taupe bg-ivory rounded-2xl border border-sand">
              No orders placed by this user yet.
            </p>
          ) : (
            orders.map((o) => (
              <Link
                key={o.id}
                href={`/admin/orders/${o.id}`}
                className="p-4 bg-ivory rounded-2xl border border-sand hover:border-gold/60 flex items-center justify-between text-xs block group"
              >
                <div>
                  <span className="font-mono font-bold text-burgundy">#{o.orderNumber}</span>
                  <span className="text-taupe ml-2">
                    {new Date(o.createdAt).toLocaleDateString('en-IN')}
                  </span>
                  <p className="text-taupe mt-1">{o.items.length} items</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm text-cocoa block">₹{o.finalTotal}</span>
                  <span className="font-bold uppercase text-[10px] text-burgundy">{o.orderStatus}</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {activeTab === 'cart' && (
        <div className="bg-ivory p-6 rounded-3xl border border-sand space-y-3">
          {!cart || cart.items.length === 0 ? (
            <p className="text-xs text-taupe text-center py-6">Customer cart is currently empty.</p>
          ) : (
            cart.items.map((item, idx) => (
              <div key={idx} className="p-3 bg-porcelain rounded-xl border border-sand flex justify-between text-xs">
                <span>Product ID: {item.productId}</span>
                <span className="font-bold font-mono">Qty: {item.quantity}</span>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.addresses.map((a) => (
            <div key={a.id} className="p-5 bg-ivory rounded-2xl border border-sand text-xs space-y-1">
              <span className="font-bold uppercase tracking-wider text-copper">{a.label}</span>
              <p className="font-bold text-cocoa">{a.fullName}</p>
              <p className="text-taupe">{a.line1}, {a.area}</p>
              <p className="text-taupe">{a.city}, {a.state} - {a.pin}</p>
              <p className="font-mono text-cocoa pt-1">Ph: {a.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
