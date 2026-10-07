import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthContext'
import { CartProvider } from '@/lib/data/CartContext'
import { WishlistProvider } from '@/lib/data/WishlistContext'
import { StoreLayoutWrapper } from '@/components/store/StoreLayoutWrapper'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vaishnava Mart | Pure Satvik, Jain & Vaishnav Food Products',
  description:
    'Dedicated culinary purity for Jain, Vaishnav, and devout Satvik homes. 100% free from onion, garlic, and contamination. Cold-ground whole spices, fasting staples, and royal dry fruits.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vaishnavamart.com'),
  openGraph: {
    title: 'Vaishnava Mart | Purity You Never Have to Question',
    description: 'Devotional Satvik and Jain food essentials prepared under dedicated zero-contamination standards.',
    images: ['/images/generated/hero-bg.jpg'],
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-ivory text-cocoa antialiased selection:bg-gold/20 selection:text-burgundy">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <StoreLayoutWrapper>{children}</StoreLayoutWrapper>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
