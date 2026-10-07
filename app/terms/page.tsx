import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Vaishnava Mart',
}

export default function TermsPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8 font-sans text-taupe leading-relaxed">
        <h1 className="font-serif text-3xl sm:text-5xl text-cocoa">Terms of Service</h1>
        <p className="text-xs text-copper font-medium">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">1. Acceptance of Terms</h2>
          <p className="text-sm">
            By accessing or ordering from Vaishnava Mart (https://vaishnavamart.com), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">2. Product Specifications & Purity Vows</h2>
          <p className="text-sm">
            Vaishnava Mart commits to strict No Onion and No Garlic standards across its catalogue. We make every reasonable effort to display accurate descriptions, batch weights, and dietary certifications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-2xl text-cocoa">3. Orders & Pricing</h2>
          <p className="text-sm">
            All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. We reserve the right to cancel or modify orders in the event of stock shortages or typographical pricing errors.
          </p>
        </section>
      </div>
    </div>
  )
}
