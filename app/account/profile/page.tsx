'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/lib/auth/AuthContext'
import { User, Edit3, Check, X, Camera, ShieldCheck } from 'lucide-react'

export default function AccountProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)

  // Form states
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [secondaryPhone, setSecondaryPhone] = useState(user?.secondaryPhone || '')
  const [gender, setGender] = useState(user?.gender || 'Prefer not to say')
  const [age, setAge] = useState(user?.age || '')
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '')

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({
        name,
        phone,
        secondaryPhone: secondaryPhone || undefined,
        gender: gender as any,
        age: age ? Number(age) : undefined,
        photoURL,
      })
      setIsEditing(false)
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (user) {
      setName(user.name)
      setPhone(user.phone)
      setSecondaryPhone(user.secondaryPhone || '')
      setGender(user.gender || 'Prefer not to say')
      setAge(user.age || '')
      setPhotoURL(user.photoURL || '')
    }
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-sand">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">Patron Profile</h2>
          <p className="text-xs sm:text-sm text-taupe mt-0.5">
            Manage your personal profile and contact verification
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary text-xs h-10 px-5 inline-flex items-center gap-2"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-3 bg-botanical/15 border border-botanical/30 rounded-xl text-botanical text-xs font-medium flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Profile updated successfully</span>
        </div>
      )}

      {/* Circular Profile Avatar (96px - 120px) */}
      <div className="p-6 bg-ivory rounded-2xl border border-sand flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-burgundy shadow-md flex-shrink-0 bg-cream">
          {photoURL ? (
            <Image src={photoURL} alt={name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-taupe">
              <User className="w-10 h-10" />
            </div>
          )}
        </div>

        <div className="text-center sm:text-left space-y-1 flex-1">
          <h3 className="font-serif text-xl text-cocoa font-medium">{user.name}</h3>
          <p className="text-xs text-taupe">{user.email}</p>
          <div className="inline-flex items-center gap-1.5 text-[11px] text-botanical font-medium pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Google Single Sign-On Account</span>
          </div>

          {isEditing && (
            <div className="pt-2">
              <label className="text-[11px] text-taupe font-semibold block mb-1">
                Custom Avatar Image URL (ImageKit ready)
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://..."
                className="w-full max-w-md p-2 bg-porcelain border border-sand rounded-lg text-xs"
              />
            </div>
          )}
        </div>
      </div>

      {/* Profile Information View or Form */}
      {!isEditing ? (
        <div className="p-6 bg-ivory rounded-2xl border border-sand grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <span className="text-taupe uppercase tracking-wider font-semibold block mb-1">Full Name</span>
            <p className="text-sm font-medium text-cocoa">{user.name}</p>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-wider font-semibold block mb-1">Verified Email</span>
            <p className="text-sm font-medium text-cocoa">{user.email}</p>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-wider font-semibold block mb-1">Primary Phone</span>
            <p className="text-sm font-medium text-cocoa">{user.phone || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-wider font-semibold block mb-1">Secondary Phone</span>
            <p className="text-sm font-medium text-cocoa">{user.secondaryPhone || 'None'}</p>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-wider font-semibold block mb-1">Gender</span>
            <p className="text-sm font-medium text-cocoa">{user.gender || 'Prefer not to say'}</p>
          </div>
          <div>
            <span className="text-taupe uppercase tracking-wider font-semibold block mb-1">Age</span>
            <p className="text-sm font-medium text-cocoa">{user.age ? `${user.age} years` : 'Not specified'}</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="p-6 bg-ivory rounded-2xl border border-sand space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Primary Phone *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Secondary Phone
              </label>
              <input
                type="tel"
                value={secondaryPhone}
                onChange={(e) => setSecondaryPhone(e.target.value)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
                Age
              </label>
              <input
                type="number"
                min="16"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                className="w-full p-2.5 bg-porcelain border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-sand">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary h-10 px-4 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary h-10 px-6 text-xs justify-center"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
