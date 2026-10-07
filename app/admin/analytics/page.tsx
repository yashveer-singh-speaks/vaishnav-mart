'use client'

import React, { useState, useEffect } from 'react'
import { Order, Product, Category } from '@/types'
import { OrderRepository, ProductRepository, CategoryRepository, CartRepository } from '@/lib/data/repositories'
import { BarChart3, TrendingUp, Users, ShoppingBag, ArrowUpRight } from 'lucide-react'

export default function AdminAnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [cartUsersCount, setCartUsersCount] = useState(0)
  const [abandonedValue, setAbandonedValue] = useState(0)

  useEffect(() => {
    async function load() {
      const [o, p, cu] = await Promise.all([
        OrderRepository.getOrders(),
        ProductRepository.getAllProducts(),
        CartRepository.getCartUsers(),
      ])
      setOrders(o)
      setProducts(p)
      setCartUsersCount(cu.length)
      setAbandonedValue(cu.reduce((sum, item) => sum + item.totalValue, 0))
    }
    load()
  }, [])

  const totalRevenue = orders.reduce((sum, o) => sum + o.finalTotal, 0)
  const totalOrders = orders.length
  const aov = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-cocoa">Business Analytics</h1>
        <p className="text-xs sm:text-sm text-taupe mt-1">
          Simple, plain-language metrics on orders, revenue, and customer patterns.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block">Total Revenue</span>
          <p className="font-serif text-3xl font-bold text-burgundy mt-2">₹{totalRevenue}</p>
          <span className="text-[11px] text-botanical font-medium mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> Organic Sales
          </span>
        </div>

        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block">Completed Orders</span>
          <p className="font-serif text-3xl font-bold text-cocoa mt-2">{totalOrders}</p>
          <span className="text-[11px] text-taupe mt-1 block">Live fulfilled orders</span>
        </div>

        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block">Average Order Value</span>
          <p className="font-serif text-3xl font-bold text-cocoa mt-2">₹{aov}</p>
          <span className="text-[11px] text-taupe mt-1 block">Per successful cart</span>
        </div>

        <div className="p-5 bg-ivory rounded-2xl border border-sand">
          <span className="text-[11px] font-bold uppercase tracking-wider text-taupe block">Abandoned Cart Value</span>
          <p className="font-serif text-3xl font-bold text-copper mt-2">₹{abandonedValue}</p>
          <span className="text-[11px] text-copper font-medium mt-1 block">{cartUsersCount} Pending patrons</span>
        </div>
      </div>

      {/* Top Ordered Products */}
      <div className="bg-ivory p-6 sm:p-8 rounded-3xl border border-sand space-y-4">
        <h2 className="font-serif text-xl text-cocoa font-medium">Most Ordered Products</h2>

        <div className="divide-y divide-sand">
          {products.slice(0, 5).map((p, idx) => (
            <div key={p.id} className="py-3.5 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-taupe w-5">{idx + 1}.</span>
                <div>
                  <p className="font-medium text-cocoa">{p.name}</p>
                  <p className="text-[11px] text-taupe font-mono">₹{p.price} • Stock remaining: {p.stock}</p>
                </div>
              </div>
              <span className="font-bold text-burgundy">In High Demand</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
