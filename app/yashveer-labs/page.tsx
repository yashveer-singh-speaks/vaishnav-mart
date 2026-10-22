import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code2, Cpu, Cloud, Bot, Terminal, ShieldCheck, Sparkles, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Yashveer Labs | Software, AI & Advanced Computing',
  description:
    'Independent software and engineering venture founded by Yashveer Singh Rajpoot, focused on custom software development, AI applications, automation, and intelligent systems.',
}

export default function YashveerLabsPage() {
  const focusAreas = [
    {
      title: 'Custom Software Development',
      desc: 'Robust, clean-architecture web, mobile, and server platforms designed for dependability and real-world scale.',
      icon: Terminal,
    },
    {
      title: 'AI-Powered Applications',
      desc: 'Applied machine learning and practical generative systems that add tangible intelligence and workflows.',
      icon: Bot,
    },
    {
      title: 'Intelligent Automation',
      desc: 'End-to-end data pipelines and automated backend infrastructure eliminating manual bottlenecks.',
      icon: Code2,
    },
    {
      title: 'Cloud Infrastructure & High-Performance Computing',
      desc: 'Scalable serverless environments, resilient database clusters, and low-latency system design.',
      icon: Cloud,
    },
  ]

  return (
    <div className="bg-ivory min-h-screen py-16 sm:py-24 border-b border-sand">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 border-b border-sand pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-porcelain border border-sand rounded-full text-burgundy text-xs font-bold uppercase tracking-widest">
            <Code2 className="w-3.5 h-3.5 text-gold" />
            <span>Software • Artificial Intelligence • Systems</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-bold leading-tight">
            Yashveer Labs
          </h1>

          <p className="text-base sm:text-lg text-copper font-medium tracking-wide">
            Founded by <Link href="/yashveer-singh-rajpoot" className="underline hover:text-burgundy">Yashveer Singh Rajpoot</Link>
          </p>
        </div>

        {/* Primary Banner Visual */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-sand shadow-lg bg-porcelain">
          <Image
            src="/images/yashveer/yashveer-labs/primary.jpg"
            alt="Yashveer Labs Advanced Software Architecture"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Narrative & Mission */}
        <div className="prose prose-stone max-w-none space-y-6 text-cocoa/90 font-sans leading-relaxed text-base sm:text-lg">
          <p>
            <strong>Yashveer Labs</strong> is an independent software and engineering venture founded by <strong>Yashveer Singh Rajpoot</strong>, with a long term vision of building advanced software, artificial intelligence systems and technology solutions. The aim is to create a company where engineering, research and practical problem solving come together. Rather than limiting itself to a single type of software or a narrow industry, Yashveer Labs is intended to grow into a technical organisation capable of working across different fields where software and intelligent systems can make a meaningful difference.
          </p>

          <p>
            Its intended areas of focus include custom software development, AI powered applications, intelligent automation, cloud infrastructure, high performance computing and machine learning systems. The wider vision also includes exploring robotics and other technologies that connect software with the physical world. The guiding principle is to approach technology with a focus on usefulness, reliability, thoughtful design and sound engineering. Artificial intelligence should be used where it adds genuine value, while the underlying software should remain understandable, maintainable and dependable.
          </p>
        </div>

        {/* Areas of Technical Focus */}
        <div className="space-y-6 pt-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-cocoa font-semibold">
            Areas of Technical Focus
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {focusAreas.map((area) => {
              const Icon = area.icon
              return (
                <div
                  key={area.title}
                  className="bg-porcelain border border-sand rounded-3xl p-6 space-y-3 shadow-sm hover:border-gold/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-cocoa">
                    {area.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Secondary Visual Highlight */}
        <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-sand shadow-sm bg-porcelain">
          <Image
            src="/images/yashveer/yashveer-labs/secondary.jpg"
            alt="Intelligent computing and deep software research"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Concluding Vision */}
        <div className="prose prose-stone max-w-none space-y-6 text-cocoa/90 font-sans leading-relaxed text-base sm:text-lg">
          <p>
            The long term ambition is to develop Yashveer Labs into a leading software and AI company recognised for its technical depth, original thinking and ability to build effective solutions. This vision will require continued learning, careful research, strong engineering practices and the patience to develop technology that works beyond a demonstration. Yashveer Labs represents a commitment to building from solid foundations, expanding into more advanced areas over time and creating a company that can contribute meaningfully to the future of software and artificial intelligence.
          </p>
        </div>

        {/* Sister Venture Navigation */}
        <div className="pt-10 border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-6 bg-porcelain p-8 rounded-3xl border">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-copper">Hardware &amp; Physical Engineering</span>
            <h3 className="font-serif text-2xl text-cocoa font-bold">Rajpoot Industries</h3>
            <p className="text-xs text-taupe">Explore our physical engineering and hardware technology vision.</p>
          </div>
          <Link
            href="/rajpoot-industries"
            className="btn-primary text-sm px-6 py-3 whitespace-nowrap"
          >
            <span>Visit Rajpoot Industries</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
