# Vaishnava Mart - Setup & Environment Configuration Guide

This guide explains exactly how to run the project in immediate development mode (mock mode) and how to transition to production services (**Firebase**, **Razorpay**, and **ImageKit**).

---

## 1. Quick Start in Development Mode (Works Out-of-the-Box)

The project is built with dual data modes (`mock` and `firebase`). In `mock` mode, the complete storefront, cart, checkout, mock payment, order placement, customer account, and Super Admin CMS operate seamlessly with **zero external credentials required**.

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

---

## 2. Temporary Development Admin Login

To access the Super Admin Dashboard:
1. Scroll to the very bottom of any page on the website.
2. In the bottom row of the footer, click the subtle email icon: **📧**
3. Log in with the preloaded temporary credentials:
   - **Email:** `owner@vaishnavamart.local`
   - **Password:** `vaishnav123`
4. You will be redirected into `/admin`.

> ⚠️ **IMPORTANT WARNING:** These credentials are for local development testing only. Before deploying to production, replace this mock login with Firebase Authentication and admin custom claims as described in `docs/firebase-setup.md`.

---

## 3. Environment Variables Overview (`.env.local`)

| Variable | Current Default | When Switching to Real Services |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Replace with `https://vaishnavamart.com` |
| `NEXT_PUBLIC_DATA_MODE` | `mock` | Change to `firebase` when Firebase credentials are ready |
| `PAYMENT_PROVIDER` | `mock` | Change to `razorpay` when Razorpay credentials are ready |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `mock_key` | Replace with your Firebase Web API Key |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`| `mock_project` | Replace with your Firebase Project ID |
| `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`| `IMAGEKIT_URL_ENDPOINT_HERE`| Paste your ImageKit URL endpoint |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | `mock_razorpay_key` | Replace with your Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | `RAZORPAY_KEY_SECRET_HERE` | Replace with your Razorpay Secret (server-side only) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `+919876543210` | Replace with the official business WhatsApp number |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `care@vaishnavamart.com` | Replace with customer support email |

---

## 4. Documentation Directory

- [Architecture Overview](docs/architecture.md)
- [Firebase Setup](docs/firebase-setup.md)
- [Payment Gateway Setup](docs/payment-setup.md)
- [ImageKit Setup](docs/imagekit-setup.md)
- [Owner's Guide to Super Admin](docs/admin-guide.md)
- [Nano Banana Image Generation Prompts](docs/nano-banana-prompts.md)
