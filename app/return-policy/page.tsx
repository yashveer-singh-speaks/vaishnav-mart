import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Return & Refund Policy | Vaishnava Mart',
}

export default function ReturnPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8 font-sans text-taupe leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-5xl text-cocoa">Return & Refund Policy</h1>
        <p className="text-xs text-copper font-medium">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">1. Sanctity of Food Products</h2>
          <p className="text-sm">
            Due to the strict purity protocols governing our food items (such as whole spices, bilona ghee, and fasting foods), opened food containers cannot be accepted for return or restocked. This guarantees that no returned product ever enters our cleanrooms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">2. Damaged or Tampered Parcels</h2>
          <p className="text-sm">
            If a package arrives with a broken tamper seal, leaked container, or transit damage, please notify us within 48 hours of delivery at care@vaishnavamart.com or via WhatsApp with photographs. We will immediately issue a complimentary replacement or full refund.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">3. Refund Processing</h2>
          <p className="text-sm">
            Approved refunds are credited directly to your original payment method within 5 to 7 business days following verification.
          </p>
        </section>
      </div>
    </div>
  )
}
