# Vaishnava Mart

A specialised ecommerce platform and content management system for **Jain, Vaishnav, and Satvik** food products. Built with Next.js App Router, React, TypeScript, and Tailwind CSS.

---

## Key Features

- **Pure Satvik Positioning:** Built around strict dietary standards: zero onion, zero garlic, Jain compliant, Vaishnav compliant, Bhoga suitable, and zero cross-contamination.
- **Dual Data Mode:** Runs immediately out of the box in `mock` mode with zero credentials. Seamlessly switches to `firebase` mode when production credentials are provided.
- **Payment Abstraction:** PaymentProvider architecture ready for Razorpay without tight coupling.
- **Customer Storefront:**
  - Dynamic CMS-controlled homepage chapters (Hero with 16:9 visual, Trust ribbon marquee, Top 2 curated essentials, Origin story, Most ordered 4, Featured 6 pantry grid, Sticky purity split screen, WhatsApp collaboration CTA, Deep burgundy footer with subtle 3D embossed gold seal).
  - Catalogue shop page (`/shop`) with real-time dietary filters (Jain, Vaishnav, Ekadashi, Bhoga, Price).
  - Dynamic root product routes (`/[slug]`) with reserved route protection.
  - Interactive product page with 4-slot image gallery, 3.8s autoplay with instant interaction halt, description word counter, moving feature cards, and "You may also like" suggestions.
  - Responsive Cart Drawer & 2-column Cart page (`/cart`).
  - Google Authentication modal & 2-step Profile Completion modal.
  - Complete 3-stage Checkout flow (`/checkout`) and Order Tracking timeline (`/order-success/[orderId]`).
  - Customer Account (`/account`) with dashboard, orders, profile editor, address book, and wishlist.
- **Owner Super Admin Dashboard (`/admin`):**
  - Discreet access via subtle 📧 icon at the very bottom of the website footer.
  - Five primary action cards: **EDIT**, **ORDERS**, **USERS**, **CART USERS**, **ADD**.
  - Visual Lego block page editor with drag/button reordering, draft/publish workflow, and version history.
  - 9-step guided product wizard (`/admin/add/product`).
  - Unfinished cart recovery (`/admin/cart-users`) with direct WhatsApp helper links.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### Owner Login Access
- **Footer Icon:** Scroll to the bottom row of the footer and click **📧**
- **Direct Route:** [http://localhost:3000/owner-login](http://localhost:3000/owner-login)
- **Email:** `owner@vaishnavamart.local`
- **Password:** `vaishnav123`

---

## Documentation

- [Setup & Environment Guide](README_SETUP.md)
- [Owner's Guide to Super Admin](docs/admin-guide.md)
- [Technical Architecture](docs/architecture.md)
- [Firebase Integration](docs/firebase-setup.md)
- [Payment Integration](docs/payment-setup.md)
- [ImageKit Integration](docs/imagekit-setup.md)
- [Nano Banana Image Prompts](docs/nano-banana-prompts.md)
