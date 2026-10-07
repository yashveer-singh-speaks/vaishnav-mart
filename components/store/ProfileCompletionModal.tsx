'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CheckCircle2, ArrowRight, User, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'

export const ProfileCompletionModal: React.FC = () => {
  const { user, isProfileModalOpen, setIsProfileModalOpen, updateProfile, addAddress } = useAuth()
  const [step, setStep] = useState<1 | 2>(1)
  const [saving, setSaving] = useState(false)

  // Step 1 Fields
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [secondaryPhone, setSecondaryPhone] = useState('')
  const [gender, setGender] = useState<'Male' | 'Female' | 'Prefer not to say'>('Male')
  const [age, setAge] = useState<number | ''>(30)

  // Step 2 Fields
  const [addressLine, setAddressLine] = useState('')
  const [area, setArea] = useState('')
  const [landmark, setLandmark] = useState('')
  const [city, setCity] = useState('New Delhi')
  const [state, setState] = useState('Delhi')
  const [pin, setPin] = useState('110018')

  if (!isProfileModalOpen || !user) return null

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({
        name,
        phone,
        secondaryPhone: secondaryPhone || undefined,
        gender,
        age: age ? Number(age) : undefined,
        profileComplete: true,
      })

      if (addressLine.trim()) {
        await addAddress({
          label: 'Home',
          fullName: name,
          phone,
          line1: addressLine,
          area,
          landmark: landmark || undefined,
          city,
          state,
          pin,
          isDefault: true,
        })
      }

      setIsProfileModalOpen(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-cocoa/60 backdrop-blur-sm" />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-porcelain border border-sand rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col">
        {/* Progress header */}
        <div className="flex items-center justify-between pb-4 border-b border-sand">
          <div>
            <h3 className="font-serif text-2xl text-cocoa">Complete Your Profile</h3>
            <p className="text-xs text-taupe mt-0.5">Please provide your details for smooth order deliveries</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-cream rounded-full text-burgundy">
            Step {step} of 2
          </span>
        </div>

        {step === 1 ? (
          <form onSubmit={handleStep1Next} className="mt-6 space-y-4">
            <div className="flex items-center gap-4 pb-2">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-burgundy flex-shrink-0">
                {user.photoURL ? (
                  <Image src={user.photoURL} alt={name || 'Profile'} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-cream flex items-center justify-center text-taupe">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="text-left text-xs text-taupe">
                <p className="font-medium text-cocoa">{user.email}</p>
                <p className="text-[11px] mt-0.5 text-botanical">✓ Verified with Google</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                placeholder="Your full name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  Primary Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  Secondary Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                  placeholder="+91 98110 00000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="16"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                  placeholder="30"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <span>Continue to Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleComplete} className="mt-6 space-y-4">
            <div className="flex items-center gap-2 text-xs text-taupe pb-1">
              <MapPin className="w-4 h-4 text-copper" />
              <span>Step 2: Enter Primary Delivery Address</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                House / Flat / Street *
              </label>
              <input
                type="text"
                required
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                placeholder="House / Flat / Building No."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  Area / Sector *
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                  placeholder="Vikaspuri / Keshopur"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                  placeholder="Near Temple / Garden"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-taupe mb-1">
                  PIN *
                </label>
                <input
                  type="text"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full p-3 bg-ivory border border-sand rounded-xl text-sm text-cocoa focus:border-burgundy outline-none"
                  placeholder="110018"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary h-11 px-4 text-xs"
              >
                Back
              </button>
              <button type="submit" disabled={saving} className="btn-primary flex-1 h-11 text-sm justify-center">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save & Continue'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
