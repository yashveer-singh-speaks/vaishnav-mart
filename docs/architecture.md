# Vaishnava Mart - Technical Architecture Documentation

## 1. System Philosophy & Technology Stack

Vaishnava Mart is designed as a luxury ecommerce platform for devout Satvik, Jain, and Vaishnav food products.

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS Variables design tokens
- **Typography:** Cormorant Garamond (Editorial / Storytelling) & Manrope (UI / Commerce)
- **3D Integrations:** Three.js lightweight embossed gold medallion in footer with fallback
- **Data Abstraction:** Repository Pattern (`ProductRepository`, `OrderRepository`, `UserRepository`, `CartRepository`, `PageRepository`, `CategoryRepository`, `SettingsRepository`)
- **Payment Abstraction:** `PaymentProvider` (`MockPaymentProvider`, `RazorpayPaymentProvider`)
- **Image Architecture:** 16:9 narrative backgrounds and 1:1 square product slots, ImageKit CDN ready.

---

## 2. Directory Structure

```
vaishnavamart/
├── app/                      # Next.js App Router
│   ├── [slug]/               # Dynamic root product pages with reserved route shielding
│   ├── account/              # Customer account, dashboard, orders, profile, addresses, wishlist
│   ├── admin/                # Super Admin dashboard, Lego CMS page editor, orders, users, cart-users, add wizard
│   ├── api/auth/             # Server authentication endpoints (owner-login session cookie)
│   ├── cart/                 # Responsive 2-column cart with promo code
│   ├── category/[slug]/      # Category catalogue with bottom SEO placement
│   ├── checkout/             # 3-stage checkout: Delivery, Payment, Review
│   ├── locations/            # Delivery area hubs and localized structured schemas
│   ├── order-success/        # Order tracking timeline and purchase confirmation
│   ├── owner-login/          # Secret owner access portal
│   ├── shop/                 # Complete storefront catalogue with dietary filters
│   ├── sitemap.ts            # Dynamic XML sitemap generator
│   ├── robots.ts             # Search engine crawler governance
│   └── globals.css           # Design tokens, color system, and marquee animations
├── components/
│   ├── store/                # Customer storefront components (Hero, Purity story, Product card, Drawers)
│   ├── three/                # Lightweight Three.js medallion scene
│   └── ui/                   # Shared micro-interaction primitives
├── lib/
│   ├── auth/                 # AuthContext & Google login simulation
│   ├── data/                 # CartContext, WishlistContext, repositories, mock fixtures
│   └── payments/             # PaymentProvider abstraction
├── public/
│   ├── images/generated/     # 16:9 Nano Banana visuals & 1:1 product imagery
│   └── images/logo/          # Vaishnava Mart brand artwork
├── types/                    # Domain TypeScript schemas
└── docs/                     # Comprehensive setup, payment, and admin guides
```

---

## 3. Dual Data Mode Engine (`mock` vs `firebase`)

When `NEXT_PUBLIC_DATA_MODE=mock`:
- Repositories serve initial fixtures from `lib/data/mockData.ts`.
- Changes (new products, reordered CMS blocks, updated orders, customer addresses) are persisted in memory and synchronized to browser `localStorage`.
- Zero Firebase or Razorpay credentials required to run.

When `NEXT_PUBLIC_DATA_MODE=firebase`:
- Identical UI surfaces connect to Cloud Firestore via Firestore SDK.
- Authentication binds to Firebase Google Auth provider and custom claims.
