import { Metadata } from 'next'
import Link from 'next/link'
import { initialLocations } from '@/lib/data/mockData'
import { MapPin, Truck, ChevronRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Delivery Localities & Hubs | Vaishnava Mart',
  description:
    'Explore our dedicated pure Satvik grocery delivery coverage across West Delhi (Vikaspuri, Keshopur) and the wider Delhi NCR territory.',
}

export default function LocationsIndexPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold">
            Local Delivery Footprint
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Pure Satvik Food Delivery Areas
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            Operating from our central preparation hub in West Delhi, we deliver freshly milled masalas, cold-pressed ghee, and pure fasting foods straight to your doorstep.
          </p>
        </div>

        {/* Locality Hub Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialLocations.map((loc) => (
            <div
              key={loc.id}
              className="p-8 bg-porcelain rounded-3xl border border-sand hover:border-gold/60 transition-all space-y-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cream text-burgundy">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-cocoa font-medium">{loc.name}</h2>
                    <p className="text-xs text-copper font-semibold">{loc.tagline}</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-taupe leading-relaxed font-sans">
                  {loc.description}
                </p>

                <div className="p-4 bg-ivory rounded-2xl border border-sand text-xs space-y-2">
                  <div className="flex items-center gap-2 text-cocoa font-medium">
                    <Truck className="w-4 h-4 text-copper" />
                    <span>{loc.deliveryTiming}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {loc.serviceAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="bg-porcelain border border-sand/70 text-taupe text-[11px] px-2.5 py-0.5 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="btn-primary w-full text-xs h-11 justify-center rounded-xl"
                >
                  <span>View Local Delivery Details</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Local Purity Commitment */}
        <div className="p-8 bg-cream rounded-3xl border border-sand flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="p-4 bg-ivory rounded-full text-burgundy flex-shrink-0">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-cocoa font-medium">
              Delhi NCR Clean-Seal Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-taupe leading-relaxed mt-1">
              All regional couriers are instructed to handle Vaishnava Mart parcels with sacred care. Packages are dispatched in tamper-evident sealed outer cartons with zero allium odor ingress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
