import React from 'react'

interface VaishnavaTilakProps {
  className?: string
  width?: number
  height?: number
  title?: string
}

/**
 * Traditional Vaishnava Tilak (Urdhva Pundra)
 * Matches the authentic golden-yellow U-shaped design with the teardrop/petal base marking.
 * Uses high-fidelity vector rendering based on the exact user-supplied reference artwork.
 */
export const VaishnavaTilak: React.FC<VaishnavaTilakProps> = ({
  className = 'w-5 h-8',
  width = 24,
  height = 36,
  title = 'Vaishnava Tilak',
}) => {
  return (
    <svg
      viewBox="0 0 205 590"
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
        {/* Luminous warm golden-yellow chandan gradient matching user reference image (#EBB152) */}
        <linearGradient id="vaishnavChandanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5C369" />
          <stop offset="50%" stopColor="#EBB152" />
          <stop offset="100%" stopColor="#D99E3D" />
        </linearGradient>
        <filter id="tilakShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#8B5E14" floodOpacity="0.2" />
        </filter>
      </defs>

      <g filter="url(#tilakShadow)">
        {/* Upper U-shaped arms and curve */}
        <path
          d="M 4 8 
             L 38 8 
             L 38 310 
             C 38 348, 62 376, 102.5 376 
             C 143 376, 167 348, 167 310 
             L 167 8 
             L 201 8 
             L 201 310 
             C 201 372, 160 416, 115 422 
             L 115 436 
             C 132 444, 172 475, 172 505 
             C 172 538, 138 580, 102.5 605 
             C 67 580, 33 538, 33 505 
             C 33 475, 73 444, 90 436 
             L 90 422 
             C 45 416, 4 372, 4 310 
             Z"
          fill="url(#vaishnavChandanGrad)"
        />
      </g>
    </svg>
  )
}
