import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Vaishnava Mart',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8 font-sans text-taupe leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-5xl text-cocoa">Privacy Policy</h1>
        <p className="text-xs text-copper font-medium">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">1. Information We Collect</h2>
          <p className="text-sm">
            Vaishnava Mart collects personal contact information that you voluntarily provide when creating an account, placing an order, or contacting customer care. This includes your name, delivery address, phone number, and email. We do NOT collect background geolocation data or track private browsing activity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">2. Use of Information</h2>
          <p className="text-sm">
            Your details are used solely to fulfill your orders, provide shipment status notifications, and communicate critical updates concerning your purchases. With your explicit consent, we may send periodic updates regarding seasonal Satvik fasting staples.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">3. Payment Security</h2>
          <p className="text-sm">
            All electronic payments are processed through secure, PCI-DSS compliant payment gateways. We never store credit/debit card numbers or UPI PINs on our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">4. Contact For Privacy Queries</h2>
          <p className="text-sm">
            For questions regarding personal data access or erasure, please contact our Data Protection Officer at nimaitrade55@gmail.com.
          </p>
        </section>
      </div>
    </div>
  )
}
