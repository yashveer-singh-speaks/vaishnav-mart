import React from 'react'

interface TulsiPlantProps {
  className?: string
  width?: number
  height?: number
  title?: string
}

/**
 * Traditional Holy Basil (Tulsi Devi) Plant Icon & Visual
 * Features a sacred Vrinda / Tulsi plant with detailed leaves and Manjari (flower spikes)
 * seated in an auspicious traditional terracotta/brass Vrindavan pot.
 */
export const TulsiPlant: React.FC<TulsiPlantProps> = ({
  className = 'w-9 h-9 sm:w-10 sm:h-10',
  width = 40,
  height = 40,
  title = 'Sacred Tulsi Plant',
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={title}
      role="img"
    >
      <title>{title}</title>
      <defs>
        {/* Pot Gradient: Traditional terracotta and burnished brass */}
        <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C97A4A" />
          <stop offset="50%" stopColor="#9E4D27" />
          <stop offset="100%" stopColor="#6E2C10" />
        </linearGradient>

        {/* Leaf Dark Botanical Green */}
        <linearGradient id="leafDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3E6B3C" />
          <stop offset="100%" stopColor="#1E3E1C" />
        </linearGradient>

        {/* Leaf Bright Satvik Green */}
        <linearGradient id="leafBright" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6AA45A" />
          <stop offset="100%" stopColor="#38742E" />
        </linearGradient>

        {/* Manjari (Purple/Golden Tulsi flower spikes) */}
        <linearGradient id="manjariGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#8A4A6E" />
          <stop offset="100%" stopColor="#4D223B" />
        </linearGradient>
      </defs>

      {/* --- TRADITIONAL VRINDAVAN POT / PLANTER --- */}
      {/* Base stand */}
      <rect x="22" y="58" width="20" height="3" rx="1.5" fill="#5A230B" />
      {/* Planter body */}
      <path
        d="M 18 46 L 46 46 L 42 58 L 22 58 Z"
        fill="url(#potGrad)"
      />
      {/* Planter decorative stepped rim */}
      <path
        d="M 16 43 L 48 43 L 46 46 L 18 46 Z"
        fill="#B25E32"
      />
      <rect x="15" y="40" width="34" height="3.5" rx="1" fill="#883B17" />
      {/* Auspicious Sun/Tilak motif on pot */}
      <circle cx="32" cy="51" r="3" fill="#D4AF37" opacity="0.85" />
      <path d="M 32 46 L 32 50 M 32 52 L 32 56" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" />

      {/* --- SACRED STEMS --- */}
      <path
        d="M 32 40 Q 32 28 32 12"
        stroke="#422415"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 32 30 Q 23 25 15 22"
        stroke="#422415"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 32 30 Q 41 25 49 22"
        stroke="#422415"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 32 22 Q 22 17 17 12"
        stroke="#422415"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 32 22 Q 42 17 47 12"
        stroke="#422415"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* --- TULSI LEAVES (Serrated / Oval Holy Basil pairs) --- */}
      {/* Lower Left Leaf */}
      <path
        d="M 28 32 C 18 34 11 27 12 21 C 18 20 25 24 28 32 Z"
        fill="url(#leafDark)"
      />
      <path d="M 28 32 Q 20 27 12 21" stroke="#8DC378" strokeWidth="0.7" opacity="0.6" />

      {/* Lower Right Leaf */}
      <path
        d="M 36 32 C 46 34 53 27 52 21 C 46 20 39 24 36 32 Z"
        fill="url(#leafBright)"
      />
      <path d="M 36 32 Q 44 27 52 21" stroke="#A7DFA2" strokeWidth="0.7" opacity="0.6" />

      {/* Mid Left Leaf */}
      <path
        d="M 31 24 C 22 25 14 18 16 12 C 22 12 28 17 31 24 Z"
        fill="url(#leafBright)"
      />
      {/* Mid Right Leaf */}
      <path
        d="M 33 24 C 42 25 50 18 48 12 C 42 12 36 17 33 24 Z"
        fill="url(#leafDark)"
      />

      {/* Upper Small Leaves */}
      <path
        d="M 31 16 C 24 16 19 10 22 6 C 26 7 30 11 31 16 Z"
        fill="url(#leafBright)"
      />
      <path
        d="M 33 16 C 40 16 45 10 42 6 C 38 7 34 11 33 16 Z"
        fill="url(#leafDark)"
      />

      {/* --- SACRED TULSI MANJARI (Flower / Seed Spikes) --- */}
      {/* Central Top Manjari */}
      <g fill="url(#manjariGrad)">
        <ellipse cx="32" cy="11" rx="2" ry="2.5" />
        <ellipse cx="32" cy="7.5" rx="1.6" ry="2" />
        <ellipse cx="32" cy="4.5" rx="1.2" ry="1.6" />
        <ellipse cx="32" cy="2" rx="0.8" ry="1.2" />
      </g>

      {/* Side Spikes */}
      <g fill="url(#manjariGrad)" opacity="0.85">
        <circle cx="16.5" cy="11.5" r="1.5" />
        <circle cx="15.5" cy="9.5" r="1.1" />
        <circle cx="47.5" cy="11.5" r="1.5" />
        <circle cx="48.5" cy="9.5" r="1.1" />
      </g>
    </svg>
  )
}
