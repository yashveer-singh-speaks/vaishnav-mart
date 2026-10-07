import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Satvik & Jain Recipes | Vaishnava Mart Culinary Heritage',
  description:
    'Authentic No Onion No Garlic recipes, Ekadashi vrat preparations, and temple style delicacies crafted with cold-ground pure spices.',
}

const recipes = [
  {
    id: 'rec-1',
    title: 'Temple-Style Shahi Paneer (Satvik Gravy)',
    time: '25 Mins',
    servings: '4 Servings',
    diet: 'No Onion • No Garlic',
    image: '/images/generated/prod-shahi-masala.jpg',
    excerpt: 'Velvety gravy made from soaked melon seeds, fresh curd, and cold-ground Shahi Paneer Masala tempered in pure A2 cow ghee.',
  },
  {
    id: 'rec-2',
    title: 'Royal Kashmiri Saffron Kheer (Bhoga Special)',
    time: '35 Mins',
    servings: '6 Servings',
    diet: 'Vaishnav Compliant',
    image: '/images/generated/prod-saffron-dryfruit.jpg',
    excerpt: 'Slow-simmered whole milk infused with Grade-A Mongra saffron threads, crushed green cardamoms, and slivered Mamra almonds.',
  },
  {
    id: 'rec-3',
    title: 'Temple Lemon Rice (Chitranna Premix Style)',
    time: '10 Mins',
    servings: '3 Servings',
    diet: 'Jain Friendly',
    image: '/images/generated/story-why-exists.jpg',
    excerpt: 'Steamed rice tossed with roasted lentils, mustard tempering, fresh curry leaves, and our signature Jain Lemon Rice Premix.',
  },
]

export default function RecipesPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 sm:py-20 border-b border-sand">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-copper font-semibold flex items-center justify-center gap-2">
            <BookOpen className="w-3.5 h-3.5" /> Sacred Kitchen Chronicles
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-normal leading-tight">
            Satvik & Jain Culinary Recipes
          </h1>
          <p className="text-base sm:text-lg text-taupe leading-relaxed font-sans">
            Honouring ancient culinary traditions with zero onion and zero garlic. Every recipe is formulated for clean dining, sacred Bhoga, and everyday nourishment.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-porcelain rounded-3xl border border-sand overflow-hidden hover:border-gold/60 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-cream">
                  <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-md text-burgundy text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    {recipe.diet}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-taupe">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-copper" /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-copper" /> {recipe.servings}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl text-cocoa font-medium line-clamp-2">
                    {recipe.title}
                  </h2>
                  <p className="text-xs text-taupe leading-relaxed font-sans line-clamp-3">
                    {recipe.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/shop"
                  className="btn-secondary w-full text-xs h-10 justify-center rounded-xl bg-ivory"
                >
                  <span>Shop Recipe Ingredients</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
