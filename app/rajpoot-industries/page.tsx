import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Cpu, Wrench, Layers, Cog, ShieldCheck, Sparkles, Binary } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rajpoot Industries | Hardware, Physical Engineering & Systems',
  description:
    'Hardware and physical engineering venture being developed by Yashveer Singh Rajpoot, focused on electronics, embedded systems, robotics, industrial automation, and engineered products.',
}

export default function RajpootIndustriesPage() {
  const hardwarePillars = [
    {
      title: 'Electronics & Embedded Systems',
      desc: 'Microcontroller architecture, custom PCB layouts, sensor integration, and reliable firmware development.',
      icon: Binary,
    },
    {
      title: 'Robotics & Intelligent Machines',
      desc: 'Connecting intelligent software models directly with actuators, sensors, and mechanical assemblies.',
      icon: Cpu,
    },
    {
      title: 'Industrial Automation',
      desc: 'Sensors, telemetry, and automated industrial physical monitoring systems designed for rigorous uptime.',
      icon: Cog,
    },
    {
      title: 'Mechanical Design & Prototyping',
      desc: 'Iterative CAD modeling, structural analysis, thermal management, and rapid functional testing.',
      icon: Wrench,
    },
  ]

  return (
    <div className="bg-ivory min-h-screen py-16 sm:py-24 border-b border-sand">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 border-b border-sand pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-porcelain border border-sand rounded-full text-copper text-xs font-bold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5 text-gold" />
            <span>Hardware • Physical Engineering • Technology</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-cocoa font-bold leading-tight">
            Rajpoot Industries
          </h1>

          <p className="text-base sm:text-lg text-copper font-medium tracking-wide">
            Founded by <Link href="/yashveer-singh-rajpoot" className="underline hover:text-burgundy">Yashveer Singh Rajpoot</Link>
          </p>
        </div>

        {/* Primary Prototyping Image */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden border border-sand shadow-lg bg-porcelain">
          <Image
            src="/images/yashveer/rajpoot-industries/primary.jpg"
            alt="Hardware prototyping, electronics workbench and engineering tools"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Narrative & Vision */}
        <div className="prose prose-stone max-w-none space-y-6 text-cocoa/90 font-sans leading-relaxed text-base sm:text-lg">
          <p>
            <strong>Rajpoot Industries</strong> is a hardware and engineering venture being developed with the ambition of building practical technologies that connect engineering ideas with the physical world. Founded by <strong>Yashveer Singh Rajpoot</strong>, the vision is to create a company focused on designing, developing and eventually manufacturing useful hardware products and engineered systems. The aim is to approach hardware as more than a physical object, considering the design, underlying technology, durability, usability and real world purpose behind every product.
          </p>

          <p>
            The long term direction includes exploring electronics, embedded systems, robotics, intelligent machines, industrial automation and other areas of hardware engineering. These fields bring together mechanical design, electronics, computing and software to create systems that interact with and improve the world around us. Rajpoot Industries intends to build its capabilities progressively, starting with learning, research, prototyping and testing before expanding into more complex products and manufacturing activities. Reliability, functional design, technical understanding and attention to detail will be central to that approach.
          </p>
        </div>

        {/* Hardware Pillars */}
        <div className="space-y-6 pt-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-cocoa font-semibold">
            Engineering &amp; Manufacturing Direction
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hardwarePillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-porcelain border border-sand rounded-3xl p-6 space-y-3 shadow-sm hover:border-gold/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-copper/10 text-copper flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-cocoa">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Secondary CAD & Engineering Concept Image */}
        <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-sand shadow-sm bg-porcelain">
          <Image
            src="/images/yashveer/rajpoot-industries/secondary.jpg"
            alt="Mechanical design, CAD concepts and precision manufacturing"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Concluding Ambition */}
        <div className="prose prose-stone max-w-none space-y-6 text-cocoa/90 font-sans leading-relaxed text-base sm:text-lg">
          <p>
            The ultimate ambition is to grow Rajpoot Industries into a leading hardware and engineering company capable of developing original products and dependable technological systems. Building such a company requires more than an idea or a brand name. It requires engineering discipline, experimentation, quality control, an understanding of manufacturing and a commitment to continual improvement. Rajpoot Industries represents a long term investment in that direction, with the goal of building substantial engineering capabilities and creating hardware that serves a clear purpose.
          </p>
        </div>

        {/* Sister Venture Navigation */}
        <div className="pt-10 border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-6 bg-porcelain p-8 rounded-3xl border">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-burgundy">Software &amp; AI Systems</span>
            <h3 className="font-serif text-2xl text-cocoa font-bold">Yashveer Labs</h3>
            <p className="text-xs text-taupe">Explore our software development and intelligent automation venture.</p>
          </div>
          <Link
            href="/yashveer-labs"
            className="btn-primary text-sm px-6 py-3 whitespace-nowrap"
          >
            <span>Visit Yashveer Labs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
