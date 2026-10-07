# Payment Gateway Architecture & Razorpay Migration

Vaishnava Mart uses a decoupled `PaymentProvider` abstraction pattern (`lib/payments/paymentProvider.ts`). The checkout flow is **never tightly coupled** to Razorpay.

---

## 1. Development Mode (`PAYMENT_PROVIDER=mock`)

In development, the application operates with `MockPaymentProvider`.
- Simulates instant order creation, verification, and payment capture.
- Does not contact external gateways.
- Immediately creates complete purchase snapshots inside the database.

---

## 2. Moving to Razorpay (`PAYMENT_PROVIDER=razorpay`)

When you obtain Razorpay credentials:

1. **Test Mode First:**
   Obtain your Test Key ID and Key Secret from the [Razorpay Dashboard](https://dashboard.razorpay.com/#/app/keys).
2. Configure your server environment values:
   ```env
   PAYMENT_PROVIDER=razorpay
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere
   RAZORPAY_KEY_SECRET=YourSecretHere
   RAZORPAY_WEBHOOK_SECRET=YourWebhookSecretHere
   ```
3. **Important Security Rules:**
   - `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` are strictly server-side environment variables and are **never** prefixed with `NEXT_PUBLIC_`.
   - Never mark an order as paid simply because the customer's browser navigated to a success URL. All payments must be verified via HMAC-SHA256 signature verification on the server.
4. **Live Mode Transition:**
   After running test orders (UPI, cards, net banking), generate Live API Keys from the Razorpay dashboard, replace the test keys in your hosting environment, and verify live transactions.
