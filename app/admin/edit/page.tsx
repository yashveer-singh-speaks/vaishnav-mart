import Link from 'next/link'
import { FileText, ArrowRight, Layout, CheckCircle2 } from 'lucide-react'

const editablePages = [
  {
    slug: 'home',
    title: 'Home Page',
    desc: 'Main storefront chapters: Hero, Top Two, Purity Story, Pantry collections, and Collaboration.',
    sectionsCount: 9,
    status: 'Live & Published',
  },
  {
    slug: 'about',
    title: 'About Page',
    desc: 'Brand origin story, cleanroom philosophy, and devotional intention.',
    sectionsCount: 4,
    status: 'Live',
  },
  {
    slug: 'our-standard',
    title: 'Our Standard Page',
    desc: 'The 8 purity pillars: zero allium, Ahimsa Jain ethics, and Ekadashi compliance.',
    sectionsCount: 3,
    status: 'Live',
  },
  {
    slug: 'services',
    title: 'Services Page',
    desc: 'Ashram supply, bulk temple orders, and custom gifting.',
    sectionsCount: 3,
    status: 'Draft / Live',
  },
  {
    slug: 'contact',
    title: 'Contact Page',
    desc: 'Registered coordinates, customer care phone numbers, and WhatsApp concierge.',
    sectionsCount: 2,
    status: 'Live',
  },
]

export default function AdminEditIndexPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-cocoa">Edit Website Pages</h1>
        <p className="text-xs sm:text-sm text-taupe mt-1">
          Select a page to visually edit sections, update text, replace pictures, and publish changes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {editablePages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/edit/${page.slug}`}
            className="group p-6 bg-ivory rounded-3xl border border-sand hover:border-burgundy shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-porcelain rounded-2xl border border-sand text-burgundy group-hover:scale-105 transition-transform">
                  <Layout className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cream text-botanical flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {page.status}
                </span>
              </div>

              <h2 className="font-serif text-2xl text-cocoa font-medium group-hover:text-burgundy transition-colors">
                {page.title}
              </h2>
              <p className="text-xs text-taupe leading-relaxed font-sans">{page.desc}</p>
            </div>

            <div className="pt-4 border-t border-sand/70 flex items-center justify-between text-xs font-semibold text-burgundy">
              <span>{page.sectionsCount} Sections Configured</span>
              <div className="flex items-center gap-1">
                <span>Edit Page</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
