'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { AnnouncementBar } from '@/components/store/AnnouncementBar'
import { HareKrishnaTicker } from '@/components/store/HareKrishnaTicker'
import { Header } from '@/components/store/Header'
import { Footer } from '@/components/store/Footer'
import { CartDrawer } from '@/components/store/CartDrawer'
import { LoginModal } from '@/components/store/LoginModal'
import { ProfileCompletionModal } from '@/components/store/ProfileCompletionModal'
import { FloatingWhatsApp } from '@/components/store/FloatingWhatsApp'
import { useCart } from '@/lib/data/CartContext'

export const StoreLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin') || pathname === '/owner-login'
  const { toastMessage } = useCart()

  if (isAdminRoute) {
    return <main className="min-h-screen bg-porcelain">{children}</main>
  }

  return (
    <div className="flex flex-col min-h-screen bg-ivory">
      <AnnouncementBar />
      <Header />
      <HareKrishnaTicker />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <LoginModal />
      <ProfileCompletionModal />

      {/* Floating WhatsApp Badge on every page */}
      <FloatingWhatsApp phoneNumber="8595268400" />

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-burgundy text-ivory text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-gold" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
