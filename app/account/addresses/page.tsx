'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { Address } from '@/types'
import { MapPin, Plus, Trash2, CheckCircle2, Edit2 } from 'lucide-react'

export default function AccountAddressesPage() {
  const { user, addAddress, deleteAddress, setDefaultAddress } = useAuth()
  const [showAddModal, setShowAddModal] = useState(false)

  // New Address Form
  const [label, setLabel] = useState<'Home' | 'Work' | 'Other'>('Home')
  const [fullName, setFullName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [line1, setLine1] = useState('')
  const [area, setArea] = useState('')
  const [landmark, setLandmark] = useState('')
  const [city, setCity] = useState('New Delhi')
  const [state, setState] = useState('Delhi')
  const [pin, setPin] = useState('110018')

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    await addAddress({
      label,
      fullName,
      phone,
      line1,
      area,
      landmark: landmark || undefined,
      city,
      state,
      pin,
      isDefault: user?.addresses.length === 0,
    })
    setShowAddModal(false)
    setLine1('')
    setArea('')
    setLandmark('')
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-sand">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">Delivery Addresses</h2>
          <p className="text-xs sm:text-sm text-taupe mt-0.5">
            Manage your saved delivery destinations for quick checkout
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="btn-primary text-xs h-10 px-4 inline-flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddModal ? 'Cancel' : 'Add New Address'}</span>
        </button>
      </div>

      {/* New Address Form */}
      {showAddModal && (
        <form onSubmit={handleAddAddress} className="p-6 bg-ivory rounded-2xl border border-sand space-y-4">
          <h3 className="font-serif text-lg text-cocoa font-medium">Add Delivery Address</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-taupe block mb-1">Tag Label</label>
              <select
                value={label}
                onChange={(e) => setLabel(e.target.value as any)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-taupe block mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-taupe block mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-taupe block mb-1">House / Flat / Street *</label>
            <input
              type="text"
              required
              value={line1}
              onChange={(e) => setLine1(e.target.value)}
              className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-taupe block mb-1">Area / Sector *</label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-taupe block mb-1">Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-taupe block mb-1">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-taupe block mb-1">PIN *</label>
              <input
                type="text"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="btn-primary text-xs h-10 px-6">
              Save Address
            </button>
          </div>
        </form>
      )}

      {/* Address Cards Grid */}
      {user.addresses.length === 0 ? (
        <div className="text-center py-12 bg-ivory rounded-2xl border border-sand text-xs text-taupe">
          No saved addresses. Click &ldquo;Add New Address&rdquo; above.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.addresses.map((addr) => {
            const isDefault = user.defaultAddressId === addr.id || addr.isDefault
            return (
              <div
                key={addr.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between ${
                  isDefault ? 'bg-cream/40 border-burgundy' : 'bg-ivory border-sand'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-porcelain border border-sand text-burgundy">
                      {addr.label}
                    </span>
                    {isDefault && (
                      <span className="text-[10px] font-semibold text-botanical flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Default Address
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-sm text-cocoa">{addr.fullName}</p>
                  <p className="text-xs text-taupe mt-1 leading-relaxed">
                    {addr.line1}, {addr.area}{addr.landmark ? `, Near ${addr.landmark}` : ''}, {addr.city}, {addr.state} - {addr.pin}
                  </p>
                  <p className="text-xs text-taupe font-mono mt-2">Ph: {addr.phone}</p>
                </div>

                <div className="pt-4 mt-3 border-t border-sand/70 flex items-center justify-between text-xs">
                  {!isDefault ? (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-burgundy font-medium hover:underline text-[11px]"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-taupe hover:text-clay p-1 transition-colors"
                    aria-label="Delete address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
