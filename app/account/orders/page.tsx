'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/auth/AuthContext'
import { Order } from '@/types'
import { OrderRepository } from '@/lib/data/repositories'
import { Package, ArrowRight } from 'lucide-react'

export default function AccountOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      OrderRepository.getOrders({ userId: user.uid }).then((data) => {
        setOrders(data)
        setLoading(false)
      })
    }
  }, [user])

  if (loading) {
    return <div className="p-8 text-center text-xs text-taupe">Loading order records...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">Order Chronicle</h2>
        <p className="text-xs sm:text-sm text-taupe mt-1">
          Review past deliveries and track pending Satvik orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-ivory rounded-2xl border border-sand space-y-4">
          <Package className="w-10 h-10 mx-auto text-taupe opacity-40" />
          <p className="font-serif text-xl text-cocoa">No orders yet</p>
          <p className="text-xs text-taupe">Your past orders will appear here for easy reordering.</p>
          <Link href="/shop" className="btn-primary text-xs h-10 px-5 inline-flex">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 bg-ivory rounded-2xl border border-sand space-y-4 hover:border-gold/60 transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-sand text-xs">
                <div>
                  <span className="font-mono font-bold text-burgundy text-sm">
                    #{order.orderNumber}
                  </span>
                  <span className="text-taupe ml-2">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-cream text-burgundy">
                    {order.orderStatus}
                  </span>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-botanical/15 text-botanical">
                    {order.paymentState}
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="divide-y divide-sand/60">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-porcelain border border-sand flex-shrink-0">
                        <Image
                          src={item.imageSnapshot}
                          alt={item.productNameSnapshot}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-cocoa">{item.productNameSnapshot}</p>
                        <p className="text-taupe font-mono">Qty: {item.quantity} × ₹{item.priceSnapshot}</p>
                      </div>
                    </div>
                    <span className="font-bold text-cocoa">₹{item.priceSnapshot * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="pt-3 border-t border-sand flex items-center justify-between">
                <div>
                  <span className="text-xs text-taupe">Total Amount:</span>
                  <span className="text-sm font-bold text-burgundy ml-2">₹{order.finalTotal}</span>
                </div>

                <Link
                  href={`/order-success/${order.id}`}
                  className="btn-secondary h-9 px-4 text-xs inline-flex items-center gap-1.5"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
