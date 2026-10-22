'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import { useCart } from '@/lib/data/CartContext'
import { useWishlist } from '@/lib/data/WishlistContext'
import { useAuth } from '@/lib/auth/AuthContext'
import { SearchModal } from './SearchModal'
import { Category } from '@/types'
import { CategoryRepository } from '@/lib/data/repositories'
import { VaishnavaTilak } from './VaishnavaTilak'
import { TulsiPlant } from './TulsiPlant'

export const Header: React.FC = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesExpanded, setCategoriesExpanded] = useState(false)

  const { itemCount, setIsCartDrawerOpen } = useCart()
  const { wishlistIds } = useWishlist()
  const { isAuthenticated, setIsLoginModalOpen } = useAuth()

  useEffect(() => {
    CategoryRepository.getAllCategories().then(setCategories)

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const headerBgClass = isHome && !scrolled
    ? 'bg-ivory/70 backdrop-blur-[2px] border-transparent'
    : 'bg-[#FBF6EC]/90 backdrop-blur-md border-sand/70 shadow-sm'

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-350 border-b ${headerBgClass} ${
          scrolled ? 'h-[76px]' : 'h-[96px]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 flex items-center justify-between">
          {/* MOBILE LEFT: HAMBURGER */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-cocoa hover:text-burgundy transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* DESKTOP LEFT / MOBILE CENTRE: BRANDING WITH TULSI & VAISHNAVA TILAK */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3 py-1 transition-all duration-300"
              aria-label="Vaishnava Mart Home"
            >
              {/* Sacred Tulsi Plant on the left */}
              <div
                className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                title="Holy Basil (Tulsi)"
              >
                <TulsiPlant className={scrolled ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-11 sm:h-11'} />
              </div>

              {/* Sacred Vaishnava Tilak Symbol */}
              <div
                className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
                title="Vaishnava Tilak"
              >
                <VaishnavaTilak className={scrolled ? 'w-5 h-7 sm:w-6 sm:h-8' : 'w-6 h-8 sm:w-7 sm:h-9'} />
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col text-left leading-none">
                <span className="font-serif text-xl sm:text-2xl lg:text-[27px] font-bold text-burgundy tracking-tight transition-colors duration-200 group-hover:text-burgundy-dark">
                  Vaishnava Mart
                </span>
                <span className="text-[9px] sm:text-[10.5px] uppercase tracking-[0.22em] font-sans text-copper font-semibold mt-0.5 sm:mt-1">
                  Pure • Satvik • Devotional
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP CENTRE: NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium tracking-wide text-cocoa">
            <Link
              href="/shop"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/shop' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Shop
            </Link>

            <div className="relative group py-2">
              <Link
                href="/shop"
                className="hover:text-burgundy transition-colors flex items-center gap-1"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-56 p-2 bg-porcelain border border-sand rounded-xl shadow-xl transition-all">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className="block px-3 py-2 text-xs text-cocoa hover:text-burgundy hover:bg-cream/40 rounded-lg transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/our-standard"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/our-standard' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Our Standard
            </Link>

            <Link
              href="/about"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/about' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              About
            </Link>

            <Link
              href="/recipes"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/recipes' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Recipe
            </Link>

            <Link
              href="/vaishnav-calendar"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/vaishnav-calendar' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Vaishnav Calendar
            </Link>

            <Link
              href="/blog"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/blog' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Blog
            </Link>

            <Link
              href="/social"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/social' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Social
            </Link>

            <Link
              href="/contact"
              className={`hover:text-burgundy transition-colors ${
                pathname === '/contact' ? 'text-burgundy font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-cocoa hover:text-burgundy transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            {isAuthenticated ? (
              <Link
                href="/account"
                className="p-2 text-cocoa hover:text-burgundy transition-colors"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-2 text-cocoa hover:text-burgundy transition-colors"
                aria-label="Sign In"
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="hidden sm:block p-2 text-cocoa hover:text-burgundy transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-copper" />
              )}
            </Link>

            {/* Cart with badge */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2 text-cocoa hover:text-burgundy transition-colors relative flex items-center"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy text-ivory text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL HEIGHT DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer 92% width */}
          <div className="relative z-10 w-[92%] max-w-sm h-full bg-porcelain shadow-2xl flex flex-col border-r border-sand overflow-y-auto">
            {/* Top Bar */}
            <div className="p-4 border-b border-sand flex items-center justify-between bg-ivory">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <TulsiPlant className="w-7 h-7 flex-shrink-0" />
                <VaishnavaTilak className="w-4 h-6 flex-shrink-0" />
                <div className="flex flex-col text-left leading-none">
                  <span className="font-serif text-lg font-bold text-burgundy">Vaishnava Mart</span>
                  <span className="text-[9px] uppercase tracking-widest text-copper font-sans">Satvik Food</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-taupe hover:text-burgundy rounded-full"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Menu */}
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-2 text-base font-medium text-cocoa">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Shop All
                </Link>

                {/* Categories Toggle */}
                <div>
                  <button
                    onClick={() => setCategoriesExpanded(!categoriesExpanded)}
                    className="w-full flex items-center justify-between py-2 hover:text-burgundy"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        categoriesExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {categoriesExpanded && (
                    <div className="pl-4 py-1 space-y-1.5 text-sm text-taupe border-l border-sand ml-2">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          href={`/category/${c.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1 hover:text-burgundy"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/our-standard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Our Standard
                </Link>

                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  About
                </Link>

                <Link
                  href="/recipes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Recipe
                </Link>

                <Link
                  href="/vaishnav-calendar"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy font-medium text-copper"
                >
                  Vaishnav Calendar
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Blog
                </Link>

                <Link
                  href="/social"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Social
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Contact
                </Link>

                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-burgundy"
                >
                  Services
                </Link>
              </div>

              <div className="border-t border-sand pt-4 space-y-2 text-sm text-cocoa">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 hover:text-burgundy"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 hover:text-burgundy"
                    >
                      My Orders
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setIsLoginModalOpen(true)
                    }}
                    className="block py-1.5 text-burgundy font-semibold text-left"
                  >
                    Sign In with Google
                  </button>
                )}
                <Link
                  href="/account/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-burgundy"
                >
                  Wishlist ({wishlistIds.length})
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 hover:text-burgundy"
                >
                  Cart ({itemCount})
                </Link>
              </div>

              {/* Smaller Utility links */}
              <div className="border-t border-sand pt-4 text-xs text-taupe space-y-1.5">
                <Link href="/shipping-policy" onClick={() => setMobileMenuOpen(false)} className="block hover:underline">
                  Shipping Policy
                </Link>
                <Link href="/return-policy" onClick={() => setMobileMenuOpen(false)} className="block hover:underline">
                  Returns & Refunds
                </Link>
                <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="block hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="block hover:underline">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
