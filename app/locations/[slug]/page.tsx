import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { initialLocations } from '@/lib/data/mockData'
import { ProductRepository } from '@/lib/data/repositories'
import { ProductCard } from '@/components/store/ProductCard'
import { MapPin, Truck, ChevronRight, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = initialLocations.find((l) => l.slug === params.slug)
  if (!loc) return { title: 'Location Not Found' }

  return {
    title: `${loc.name} Satvik Grocery & Masala Delivery | Vaishnava Mart`,
    description: loc.description,
  }
}

export default async function LocationDetailPage({ params }: Props) {
  const loc = initialLocations.find((l) => l.slug === params.slug)
  if (!loc) notFound()

  const products = await ProductRepository.getAllProducts({ status: 'active' })

  // Structured Data (LocalBusiness schema)
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Vaishnava Mart - ${loc.name}`,
    image: 'https://vaishnavamart.com/images/generated/hero-bg.jpg',
    telephone: '+919876543210',
    email: 'care@vaishnavamart.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Keshopur & Vikaspuri Hub',
      addressLocality: 'West Delhi',
      addressRegion: 'Delhi',
      postalCode: '110018',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
  }

  return (
    <div className="bg-ivory min-h-screen py-10 sm:py-16 border-b border-sand">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-taupe">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/locations" className="hover:text-burgundy">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-burgundy font-medium">{loc.name}</span>
        </nav>

        {/* Hero Banner */}
        <div className="bg-porcelain p-8 sm:p-12 rounded-3xl border border-sand space-y-4">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-burgundy" /> Local Service Hub
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-cocoa font-normal leading-tight">
            {loc.name}: Pure Satvik & Jain Grocery Delivery
          </h1>
          <p className="text-sm sm:text-base text-taupe leading-relaxed font-sans max-w-3xl">
            {loc.description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-cocoa">
            <div className="flex items-center gap-2 bg-ivory p-3 rounded-xl border border-sand">
              <Truck className="w-4 h-4 text-burgundy" />
              <span className="font-medium">{loc.deliveryTiming}</span>
            </div>
            <div className="flex items-center gap-2 bg-ivory p-3 rounded-xl border border-sand">
              <ShieldCheck className="w-4 h-4 text-botanical" />
              <span>Free Delivery above ₹{loc.minOrder}</span>
            </div>
          </div>
        </div>

        {/* Map / Coordinates Placeholder */}
        <div className="p-8 bg-cream/70 rounded-3xl border border-sand flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl text-cocoa font-medium">Local Operating Coordinates</h3>
            <p className="text-xs text-taupe">Central Dispatch facility for {loc.name}</p>
            <p className="font-mono text-xs text-burgundy font-bold pt-1">
              LAT {loc.coordinates.lat}° N, LNG {loc.coordinates.lng}° E
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-secondary text-xs h-10 px-5 inline-flex items-center gap-2 bg-porcelain"
          >
            <span>Inquire for Local Temple Delivery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Local Products Showcase */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-cocoa">Available for Delivery in {loc.name}</h2>
              <p className="text-xs text-taupe mt-0.5">Dispatched freshly sealed in cleanroom barrier packaging</p>
            </div>
            <Link href="/shop" className="text-xs text-burgundy font-semibold hover:underline">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Local FAQs */}
        {loc.faqs && loc.faqs.length > 0 && (
          <div className="bg-porcelain p-8 sm:p-10 rounded-3xl border border-sand space-y-6">
            <h2 className="font-serif text-2xl text-cocoa flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-copper" /> Frequently Asked Questions in {loc.name}
            </h2>

            <div className="divide-y divide-sand">
              {loc.faqs.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-1.5">
                  <h3 className="font-medium text-sm text-cocoa">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed font-sans">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
