'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { auth } from '@/lib/firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function OwnerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('raskanfood@gmail.com')
  const [password, setPassword] = useState('vaishnav123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. First attempt login through Firebase Auth
      let fbSuccess = false
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password)
        if (userCred.user) {
          fbSuccess = true
        }
      } catch (fbErr: any) {
        console.info('Firebase direct auth attempt:', fbErr?.code || fbErr?.message)
      }

      // 2. Establish Server Admin Session
      const res = await fetch('/api/auth/owner-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          isFirebaseAuthenticated: fbSuccess,
        }),
      })

      const data = await res.json()
      if (res.ok && data.success) {
        router.push('/admin')
      } else {
        setError(data.message || 'Invalid credentials. Please verify your email and password.')
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
          <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gold/40 shadow-sm">
            <Image
              src="/images/logo/logo.jpg"
              alt="Ras Kan Logo"
              fill
              priority
              sizes="80px"
              className="object-cover"
            />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl text-cocoa font-bold pt-2">Owner Portal</h1>
          <p className="text-xs text-taupe font-sans">
            Administrative Control Center for Ras Kan & Vaishnava Mart
          </p>
        </div>

        {/* Firebase Connected Badge */}
        <div className="p-3.5 bg-cream/70 border border-sand rounded-xl text-xs space-y-1.5 text-taupe font-sans">
          <div className="flex items-center gap-1.5 font-bold text-burgundy uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-botanical" />
            <span>Firebase Authentication & Firestore Live</span>
          </div>
          <p className="text-[11px] text-cocoa leading-relaxed">
            Superadmin Email/Password is connected to Firebase project <span className="font-mono text-copper font-semibold">raskan-id</span>.
          </p>
          <div className="flex items-center gap-1 text-[10px] text-copper">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Spark Plan Free Tier • Real-Time Database Active</span>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-clay/15 border border-clay/30 rounded-xl text-clay text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-taupe block mb-1">
              Superadmin Email
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
              Password
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
                className="absolute right-3 top-3 text-taupe hover:text-burgundy transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary h-12 text-xs uppercase tracking-widest font-bold justify-center rounded-xl mt-2 flex items-center gap-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Owner Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
