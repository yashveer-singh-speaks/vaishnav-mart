'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WishlistContextType {
  wishlistIds: string[]
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (productId: string) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vm_wishlist')
      if (saved) setWishlistIds(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      let updated: string[]
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId)
      } else {
        updated = [...prev, productId]
      }
      try {
        localStorage.setItem('vm_wishlist', JSON.stringify(updated))
      } catch {
        // ignore
      }
      return updated
    })
  }

  const isInWishlist = (productId: string) => wishlistIds.includes(productId)

  return (
    <WishlistContext.Provider value={{ wishlistIds, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider')
  return context
}
