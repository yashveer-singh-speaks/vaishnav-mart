import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Vaishnava Mart',
}

export default function ShippingPolicyPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8 font-sans text-taupe leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-5xl text-cocoa">Shipping & Delivery Policy</h1>
        <p className="text-xs text-copper font-medium">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">1. Processing Times</h2>
          <p className="text-sm">
            All orders are processed and freshly packed within 24 business hours from our central preparation hub in West Delhi. Orders placed before 2:00 PM IST on weekdays are typically packed the same afternoon.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">2. Delivery Timelines</h2>
          <div className="p-4 bg-porcelain rounded-2xl border border-sand space-y-2 text-xs">
            <p><strong className="text-cocoa">Delhi NCR:</strong> Same-day or next-day delivery via dedicated couriers.</p>
            <p><strong className="text-cocoa">Rest of India:</strong> 2 to 4 business days via express air cargo couriers.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">3. Shipping Charges</h2>
          <p className="text-sm">
            We provide complimentary free shipping on all orders with a cart value of ₹499 and above. For orders below ₹499, a nominal flat delivery fee of ₹50 is applied at checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">4. Aroma Barrier Packaging</h2>
          <p className="text-sm">
            Every product is enclosed in multi-layer aroma seal containers to ensure zero cross-contact with external odors or moisture during transit.
          </p>
        </section>
      </div>
    </div>
  )
}
