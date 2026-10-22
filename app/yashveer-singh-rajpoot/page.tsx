import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Code, Cpu, Sparkles, Building2, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Yashveer Singh Rajpoot | Founder & Developer',
  description:
    'Personal background, technical ambitions, and long-term vision of Yashveer Singh Rajpoot, founder of Yashveer Labs and Rajpoot Industries.',
}

export default function YashveerPersonalPage() {
  return (
    <div className="bg-ivory min-h-screen py-16 sm:py-24 border-b border-sand">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Header Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 border-b border-sand pb-12">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-gold/40 shadow-xl flex-shrink-0 bg-porcelain">
            <Image
              src="/images/yashveer/yashveer-singh-rajpoot/primary.jpg"
              alt="Yashveer Singh Rajpoot"
              fill
              priority
              sizes="176px"
              className="object-cover"
            />
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-porcelain border border-sand rounded-full text-burgundy text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Founder & Developer</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-cocoa font-bold">
              Yashveer Singh Rajpoot
            </h1>
            <p className="text-sm sm:text-base text-copper font-medium tracking-wide">
              Founder of <Link href="/yashveer-labs" className="underline hover:text-burgundy">Yashveer Labs</Link> and <Link href="/rajpoot-industries" className="underline hover:text-burgundy">Rajpoot Industries</Link>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-taupe">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-gold" />
                Commerce, Mathematics &amp; Information Practices (IP)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-copper" />
                Software &amp; Systems Engineering
              </span>
            </div>
          </div>
        </div>

        {/* Story & Essay */}
        <div className="prose prose-stone max-w-none space-y-6 text-cocoa/90 font-sans leading-relaxed text-base sm:text-lg">
          <p>
            My name is <strong>Yashveer Singh Rajpoot</strong>. I am a Commerce student studying Mathematics and Information Practices (IP), with a strong interest in technology, software development, artificial intelligence and engineering. My interests extend beyond the classroom, particularly towards understanding how technology works, how businesses operate and how ideas can be turned into practical solutions. I believe that learning should not be limited to textbooks. It should also involve experimenting, solving problems, understanding systems and building the skills needed to create something useful.
          </p>

          <p>
            I currently work as a developer, focusing on software development and continuously improving my technical knowledge. My approach is to understand the reasoning behind what I build, from the underlying logic to the user experience and the systems that make an application reliable. I am interested in the broader relationship between business, technology and engineering, which is also why I chose to study Commerce alongside Mathematics and Information Practices. My goal is to keep developing as a technical professional while gaining a stronger understanding of the commercial and operational side of building a company.
          </p>

          {/* Secondary Visual Highlight */}
          <div className="my-10 relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-sand shadow-md">
            <Image
              src="/images/yashveer/yashveer-singh-rajpoot/secondary.jpg"
              alt="Systems architecture and focused engineering"
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          <p>
            My long term ambition is to build two distinct companies: <strong>Yashveer Labs</strong>, focused on software, artificial intelligence and advanced computing solutions, and <strong>Rajpoot Industries</strong>, focused on hardware, engineering and physical technology. I want to grow these ventures into respected companies known for the quality of their work, practical innovation and ability to solve meaningful problems. I understand that building companies of this scale requires years of learning, experimentation, consistency and execution. This website represents my identity and the direction I intend to pursue as I continue learning, developing and building towards that future.
          </p>
        </div>

        {/* Dual Ventures Navigation */}
        <div className="pt-10 border-t border-sand grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/yashveer-labs"
            className="group bg-porcelain p-6 rounded-3xl border border-sand hover:border-gold/60 transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-burgundy/10 text-burgundy flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-cocoa font-semibold group-hover:text-burgundy transition-colors">
                Yashveer Labs
              </h2>
              <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                Software, artificial intelligence, intelligent automation, and advanced computing solutions.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-burgundy group-hover:translate-x-1 transition-transform">
              <span>Explore Software Venture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link
            href="/rajpoot-industries"
            className="group bg-porcelain p-6 rounded-3xl border border-sand hover:border-gold/60 transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-copper/10 text-copper flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-cocoa font-semibold group-hover:text-burgundy transition-colors">
                Rajpoot Industries
              </h2>
              <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                Hardware engineering, embedded systems, physical computing, and real-world technology.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-2 text-xs font-bold text-copper group-hover:translate-x-1 transition-transform">
              <span>Explore Hardware Venture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
