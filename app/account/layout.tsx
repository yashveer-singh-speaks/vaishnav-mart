'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import {
  LayoutDashboard,
  Package,
  User,
  MapPin,
  Heart,
  ShoppingBag,
  LogOut,
} from 'lucide-react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, isAuthenticated, logout, setIsLoginModalOpen } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-ivory min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-porcelain border border-sand p-8 rounded-3xl text-center max-w-md shadow-sm">
          <p className="font-serif text-3xl text-cocoa">Customer Account</p>
          <p className="text-xs sm:text-sm text-taupe mt-2">
            Please sign in with Google to view your orders, saved addresses, and profile.
          </p>
          <div className="pt-6">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn-primary w-full justify-center text-sm"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    )
  }

  const navLinks = [
    { href: '/account', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/account/orders', label: 'My Orders', icon: Package },
    { href: '/account/profile', label: 'Edit Profile', icon: User },
    { href: '/account/addresses', label: 'Addresses', icon: MapPin },
    { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/cart', label: 'Cart', icon: ShoppingBag },
  ]

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* User Greeting Bar */}
        <div className="bg-porcelain p-6 sm:p-8 rounded-3xl border border-sand mb-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-burgundy shadow flex-shrink-0">
              {user.photoURL ? (
                <Image src={user.photoURL} alt={user.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-cream flex items-center justify-center text-taupe text-xl font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-copper">
                Verified Satvik Patron
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl text-cocoa font-medium">
                Hello, {user.name.split(' ')[0]}
              </h1>
              <p className="text-xs text-taupe">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="btn-secondary h-10 px-4 text-xs inline-flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* 2-Column Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-3 bg-porcelain p-4 rounded-3xl border border-sand space-y-1">
            {navLinks.map((link) => {
              const IconComp = link.icon
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cream text-burgundy font-bold shadow-sm'
                      : 'text-cocoa hover:bg-cream/40'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-burgundy' : 'text-taupe'}`} />
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-porcelain p-6 sm:p-10 rounded-3xl border border-sand shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
