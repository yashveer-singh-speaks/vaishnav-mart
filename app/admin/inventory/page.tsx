'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Product } from '@/types'
import { ProductRepository } from '@/lib/data/repositories'
import { Boxes, AlertTriangle, Check, RefreshCw } from 'lucide-react'

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all')
  const [stockInputs, setStockInputs] = useState<Record<string, number>>({})
  const [updatedMsg, setUpdatedMsg] = useState('')

  useEffect(() => {
    async function load() {
      const data = await ProductRepository.getAllProducts()
      setProducts(data)
      const inputs: Record<string, number> = {}
      data.forEach((p) => {
        inputs[p.id] = p.stock
      })
      setStockInputs(inputs)
    }
    load()
  }, [])

  const handleUpdateStock = async (product: Product) => {
    const newQty = stockInputs[product.id]
    if (newQty === undefined || newQty < 0) return

    const updated = await ProductRepository.saveProduct({
      ...product,
      stock: newQty,
    })

    setProducts(products.map((p) => (p.id === updated.id ? updated : p)))
    setUpdatedMsg(`Updated stock for ${product.name} to ${newQty}`)
    setTimeout(() => setUpdatedMsg(''), 3000)
  }

  const displayedProducts = products.filter((p) => {
    if (filter === 'low') return p.stock <= p.lowStockThreshold && p.stock > 0
    if (filter === 'out') return p.stock <= 0
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-cocoa">Inventory Management</h1>
          <p className="text-xs sm:text-sm text-taupe mt-1">
            Real-time stock controls, batch thresholds, and restock actions.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filter === 'all' ? 'bg-burgundy text-ivory' : 'bg-ivory border border-sand text-cocoa'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filter === 'low' ? 'bg-burgundy text-ivory' : 'bg-ivory border border-sand text-copper'
            }`}
          >
            Low Stock ({products.filter((p) => p.stock <= p.lowStockThreshold && p.stock > 0).length})
          </button>
          <button
            onClick={() => setFilter('out')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filter === 'out' ? 'bg-burgundy text-ivory' : 'bg-ivory border border-sand text-clay'
            }`}
          >
            Out of Stock ({products.filter((p) => p.stock <= 0).length})
          </button>
        </div>
      </div>

      {updatedMsg && (
        <div className="p-3 bg-botanical/15 border border-botanical/30 rounded-xl text-botanical text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{updatedMsg}</span>
        </div>
      )}

      <div className="bg-ivory rounded-3xl border border-sand overflow-hidden">
        <div className="divide-y divide-sand">
          {displayedProducts.map((p) => {
            const isLow = p.stock <= p.lowStockThreshold && p.stock > 0
            const isOut = p.stock <= 0

            return (
              <div
                key={p.id}
                className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-porcelain border border-sand flex-shrink-0">
                    <Image src={p.mainImage} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-base text-cocoa font-medium truncate">{p.name}</p>
                    <p className="text-xs text-taupe font-mono">
                      SKU: {p.sku || 'N/A'} • Unit: {p.weight} {p.unit} • Threshold: {p.lowStockThreshold}
                    </p>
                    <div className="pt-1">
                      {isOut ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-clay/15 text-clay">
                          Out of Stock
                        </span>
                      ) : isLow ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-copper/15 text-copper flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> Low Stock Warning ({p.stock} units)
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-botanical/15 text-botanical">
                          In Stock ({p.stock} units)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stock Controls */}
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs text-taupe">Stock:</label>
                    <input
                      type="number"
                      min="0"
                      value={stockInputs[p.id] ?? p.stock}
                      onChange={(e) =>
                        setStockInputs({ ...stockInputs, [p.id]: Number(e.target.value) })
                      }
                      className="w-20 p-2 bg-porcelain border border-sand rounded-xl text-center text-xs font-mono font-bold"
                    />
                  </div>

                  <button
                    onClick={() => handleUpdateStock(p)}
                    className="btn-primary h-9 px-4 text-xs inline-flex items-center gap-1"
                  >
                    <span>Update</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
