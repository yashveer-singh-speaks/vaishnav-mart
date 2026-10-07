'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, ShieldAlert, ArrowRight } from 'lucide-react'

export default function OwnerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('owner@vaishnavamart.local')
  const [password, setPassword] = useState('vaishnav123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/owner-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        router.push('/admin')
      } else {
        setError(data.message || 'Invalid development credentials.')
      }
    } catch {
      setError('Unable to authenticate. Please check server connectivity.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-porcelain border border-sand rounded-3xl shadow-xl p-8 sm:p-10 space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="relative w-44 h-14 mx-auto">
            <Image
              src="/images/logo/logo.jpg"
              alt="Vaishnava Mart"
              fill
              priority
              sizes="176px"
              className="object-contain"
            />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cocoa font-normal pt-2">Owner Login</h1>
          <p className="text-xs text-taupe font-sans">
            Secure administrative control portal for Vaishnava Mart.
          </p>
        </div>

        {/* Development Mode Notice */}
        <div className="p-3.5 bg-cream/70 border border-sand rounded-xl text-xs space-y-1 text-taupe font-sans">
          <div className="flex items-center gap-1.5 font-bold text-copper uppercase tracking-wider text-[11px]">
            <ShieldAlert className="w-4 h-4" />
            <span>Development Mock Auth Active</span>
          </div>
          <p className="text-[11px] text-cocoa">
            Preloaded temporary credentials: <br />
            <span className="font-mono text-burgundy font-semibold">owner@vaishnavamart.local</span> /{' '}
            <span className="font-mono text-burgundy font-semibold">vaishnav123</span>
          </p>
          <p className="text-[10px] text-clay font-medium pt-1">
            * REPLACE WITH FIREBASE CUSTOM CLAIMS BEFORE PRODUCTION
          </p>
        </div>

        {error && (
          <div className="p-3 bg-clay/15 border border-clay/30 rounded-xl text-clay text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
              Owner Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-ivory border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none font-sans"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
              Access Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 bg-ivory border border-sand rounded-xl text-xs text-cocoa focus:border-burgundy outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-taupe hover:text-burgundy"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full h-12 text-sm justify-center rounded-xl shadow-lg mt-2"
          >
            <Lock className="w-4 h-4 text-gold" />
            <span>{loading ? 'Authenticating...' : 'Enter Admin Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => router.push('/')}
            className="text-xs text-taupe hover:text-burgundy hover:underline"
          >
            ← Return to Public Storefront
          </button>
        </div>
      </div>
    </div>
  )
}
