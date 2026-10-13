import React from 'react'

interface VaishnavaTilakProps {
  className?: string
  width?: number
  height?: number
  title?: string
}

/**
 * Traditional Urdhva Pundra (Vaishnava Tilak)
 * Features two vertical golden-yellow lines forming a distinct U shape,
 * with a sacred leaf / pointed marking extending downward at the base.
 */
export const VaishnavaTilak: React.FC<VaishnavaTilakProps> = ({
  className = 'w-6 h-8',
  width = 24,
  height = 32,
  title = 'Vaishnava Tilak',
}) => {
  return (
    <svg
      viewBox="0 0 32 44"
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
        <linearGradient id="tilakGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F6D365" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B38728" />
        </linearGradient>
        <linearGradient id="tilakTulsiRed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C44133" />
          <stop offset="100%" stopColor="#7A1D24" />
        </linearGradient>
        <filter id="tilakGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#966D1A" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter="url(#tilakGlow)">
        {/* Outer U-Shaped Sacred Chandan Lines (Two vertical golden yellow lines connecting at base) */}
        {/* Left vertical arm */}
        <path
          d="M 6 2 
             C 6 2, 7.5 16, 8 24 
             C 8.5 28.5, 11 31.5, 16 32
             C 21 31.5, 23.5 28.5, 24 24
             C 24.5 16, 26 2, 26 2
             C 24 2, 22.5 14, 21.5 22
             C 20.8 25.5, 18.5 27.5, 16 27.5
             C 13.5 27.5, 11.2 25.5, 10.5 22
             C 9.5 14, 8 2, 6 2 Z"
          fill="url(#tilakGoldGrad)"
        />

        {/* Inner Auspicious Red / Kumkum / Central Vertical Marking extending downward into a pointed sacred leaf */}
        <path
          d="M 15 6 
             L 17 6 
             C 17 6, 17 26, 16.8 29
             C 16.5 33, 16.5 35, 16 42
             C 15.5 35, 15.5 33, 15.2 29
             C 15 26, 15 6, 15 6 Z"
          fill="url(#tilakTulsiRed)"
        />

        {/* Small sacred Tulsi leaf petal shape at the bottom base of the Tilak */}
        <path
          d="M 16 29
             C 18.5 31.5, 19.5 35.5, 16 41.5
             C 12.5 35.5, 13.5 31.5, 16 29 Z"
          fill="url(#tilakGoldGrad)"
          opacity="0.9"
        />
      </g>
    </svg>
  )
}
