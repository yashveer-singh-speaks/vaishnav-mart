'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/auth/AuthContext'
import { useCart } from '@/lib/data/CartContext'
import { Order } from '@/types'
import { OrderRepository } from '@/lib/data/repositories'
import { Package, MapPin, ShoppingBag, ArrowRight, Clock } from 'lucide-react'

export default function AccountDashboardPage() {
  const { user } = useAuth()
  const { itemCount } = useCart()
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    if (user) {
      OrderRepository.getOrders({ userId: user.uid }).then(setOrders)
    }
  }, [user])

  const defaultAddress = user?.addresses.find((a) => a.isDefault) || user?.addresses[0]
  const recentOrder = orders[0]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">Patron Overview</h2>
        <p className="text-xs sm:text-sm text-taupe mt-1">
          Welcome back to your Vaishnava Mart account. Manage your deliveries and sacred orders.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs font-semibold uppercase tracking-wider">Past Orders</span>
            <Package className="w-4 h-4 text-burgundy" />
          </div>
          <p className="font-serif text-3xl font-bold text-cocoa mt-3">{orders.length}</p>
          <Link href="/account/orders" className="text-xs text-burgundy font-semibold hover:underline mt-2 inline-block">
            View history →
          </Link>
        </div>

        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs font-semibold uppercase tracking-wider">Saved Addresses</span>
            <MapPin className="w-4 h-4 text-copper" />
          </div>
          <p className="font-serif text-3xl font-bold text-cocoa mt-3">
            {user?.addresses.length || 0}
          </p>
          <Link href="/account/addresses" className="text-xs text-burgundy font-semibold hover:underline mt-2 inline-block">
            Manage addresses →
          </Link>
        </div>

        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <div className="flex items-center justify-between text-taupe">
            <span className="text-xs font-semibold uppercase tracking-wider">Pantry Cart</span>
            <ShoppingBag className="w-4 h-4 text-gold" />
          </div>
          <p className="font-serif text-3xl font-bold text-cocoa mt-3">{itemCount}</p>
          <Link href="/cart" className="text-xs text-burgundy font-semibold hover:underline mt-2 inline-block">
            Proceed to cart →
          </Link>
        </div>
      </div>

      {/* Most Recent Order */}
      <div className="space-y-4 pt-4 border-t border-sand">
        <h3 className="font-serif text-xl text-cocoa flex items-center gap-2">
          <Clock className="w-4 h-4 text-copper" /> Most Recent Order
        </h3>

        {recentOrder ? (
          <div className="p-6 bg-ivory rounded-2xl border border-sand space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-sand text-xs">
              <div>
                <span className="font-mono font-bold text-burgundy text-sm">
                  #{recentOrder.orderNumber}
                </span>
                <span className="text-taupe ml-2">
                  Placed on {new Date(recentOrder.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
              <span className="font-bold uppercase text-[11px] px-2.5 py-0.5 rounded-full bg-cream text-burgundy w-fit">
                Status: {recentOrder.orderStatus}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-porcelain border border-sand flex-shrink-0">
                <Image
                  src={recentOrder.items[0]?.imageSnapshot || '/images/generated/prod-shahi-masala.jpg'}
                  alt="Order item"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-cocoa text-sm line-clamp-1">
                  {recentOrder.items[0]?.productNameSnapshot}
                </p>
                <p className="text-xs text-taupe mt-0.5">
                  {recentOrder.items.length > 1 ? `+ ${recentOrder.items.length - 1} more items` : '1 item'}
                </p>
                <p className="font-semibold text-burgundy text-sm mt-1">₹{recentOrder.finalTotal}</p>
              </div>

              <Link
                href={`/order-success/${recentOrder.id}`}
                className="btn-secondary h-10 px-4 text-xs inline-flex items-center gap-1.5"
              >
                <span>Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-ivory rounded-2xl border border-sand text-xs text-taupe space-y-3">
            <p className="text-sm text-cocoa font-medium">No orders placed yet</p>
            <p>Once you place your first order, real-time tracking will appear here.</p>
            <Link href="/shop" className="btn-primary text-xs h-10 px-5 inline-flex">
              Explore Pantry
            </Link>
          </div>
        )}
      </div>

      {/* Primary Delivery Address */}
      <div className="space-y-3 pt-4 border-t border-sand">
        <h3 className="font-serif text-xl text-cocoa flex items-center gap-2">
          <MapPin className="w-4 h-4 text-copper" /> Primary Delivery Destination
        </h3>
        {defaultAddress ? (
          <div className="p-5 bg-ivory rounded-2xl border border-sand text-xs text-taupe space-y-1">
            <p className="font-bold text-cocoa text-sm">{defaultAddress.fullName}</p>
            <p>{defaultAddress.line1}, {defaultAddress.area}</p>
            <p>{defaultAddress.city}, {defaultAddress.state} - {defaultAddress.pin}</p>
            <p className="font-mono text-cocoa pt-1">Ph: {defaultAddress.phone}</p>
          </div>
        ) : (
          <p className="text-xs text-taupe italic">No saved address yet.</p>
        )}
      </div>
    </div>
  )
}
