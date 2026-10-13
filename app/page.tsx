import { Metadata } from 'next'
import { PageRepository, ProductRepository } from '@/lib/data/repositories'
import { HomeHero } from '@/components/store/HomeHero'
import { TrustRibbon } from '@/components/store/TrustRibbon'
import { TopTwoSection } from '@/components/store/TopTwoSection'
import { BrandStorySection } from '@/components/store/BrandStorySection'
import { MostOrderedSection } from '@/components/store/MostOrderedSection'
import { FounderStorySection } from '@/components/store/FounderStorySection'
import { FeaturedSixSection } from '@/components/store/FeaturedSixSection'
import { PurityStorySection } from '@/components/store/PurityStorySection'
import { CollaborationSection } from '@/components/store/CollaborationSection'
import { ComboSection } from '@/components/store/ComboSection'

export const metadata: Metadata = {
  title: 'Vaishnava Mart | Pure Satvik, Jain & Vaishnav Food Products',
  description:
    'Dedicated culinary purity for Jain, Vaishnav, and devout Satvik homes. 100% free from onion and garlic. Stone-ground spices, fasting staples, and royal dry fruits.',
}

export default async function HomePage() {
  const page = await PageRepository.getPage('home')
  const sections = (page.publishedSections && page.publishedSections.length > 0)
    ? page.publishedSections
    : page.draftSections

  // Sort sections by order
  const activeSections = [...sections]
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order)

  // Fetch needed product sets
  const allProducts = await ProductRepository.getAllProducts({ status: 'active' })

  return (
    <div className="flex flex-col w-full">
      {activeSections.map((sec) => {
        switch (sec.type) {
          case 'hero':
            return (
              <HomeHero
                key={sec.id}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
                image={sec.image || (sec.background?.type === 'image' ? sec.background.value : undefined)}
              />
            )
          case 'trust_ribbon':
            return <TrustRibbon key={sec.id} />
          case 'top_products': {
            const topProducts = allProducts.filter((p) =>
              sec.selectedProductIds?.includes(p.id)
            )
            return (
              <TopTwoSection
                key={sec.id}
                products={topProducts.length >= 2 ? topProducts : allProducts.slice(0, 2)}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
              />
            )
          }
          case 'brand_story':
            return (
              <BrandStorySection
                key={sec.id}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
                image={sec.image}
              />
            )
          case 'most_ordered': {
            const mostOrdered = allProducts.filter((p) =>
              sec.selectedProductIds?.includes(p.id)
            )
            return (
              <MostOrderedSection
                key={sec.id}
                products={mostOrdered.length >= 4 ? mostOrdered : allProducts.slice(0, 4)}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
              />
            )
          }
          case 'founder_story':
            return (
              <FounderStorySection
                key={sec.id}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
                image={sec.image}
              />
            )
          case 'featured_products': {
            const featured = allProducts.filter((p) =>
              sec.selectedProductIds?.includes(p.id)
            )
            return (
              <FeaturedSixSection
                key={sec.id}
                products={featured.length >= 6 ? featured : allProducts.slice(0, 6)}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
              />
            )
          }
          case 'purity_story':
            return (
              <PurityStorySection
                key={sec.id}
                heading={sec.heading}
                subheading={sec.subheading}
                image={sec.image}
              />
            )
          case 'combo_showcase': {
            const comboProducts = allProducts.filter((p) => p.isCombo)
            return (
              <ComboSection
                key={sec.id}
                combos={comboProducts.length > 0 ? comboProducts : allProducts.slice(0, 2)}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
              />
            )
          }
          case 'collaboration_cta':
            return (
              <CollaborationSection
                key={sec.id}
                heading={sec.heading}
                subheading={sec.subheading}
                body={sec.body}
                image={sec.image}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
