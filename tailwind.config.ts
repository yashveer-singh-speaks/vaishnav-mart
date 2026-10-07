import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FBF6EC',
          warm: '#FBF6EC',
        },
        cream: {
          DEFAULT: '#F3E7D3',
          sand: '#F3E7D3',
        },
        porcelain: {
          DEFAULT: '#FFFDF8',
        },
        burgundy: {
          DEFAULT: '#7A3037',
          dark: '#5E2228',
          light: '#943E46',
        },
        copper: {
          DEFAULT: '#B76B43',
          dark: '#9E5733',
        },
        gold: {
          DEFAULT: '#C69A5A',
          antique: '#C69A5A',
          light: '#DCB57E',
        },
        cocoa: {
          DEFAULT: '#372722',
          deep: '#231815',
        },
        taupe: {
          DEFAULT: '#74645C',
        },
        olive: {
          DEFAULT: '#777657',
        },
        sand: {
          border: '#E4D4BC',
          pale: '#E4D4BC',
        },
        botanical: {
          DEFAULT: '#526B4E',
        },
        clay: {
          DEFAULT: '#A6453D',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        brand: '14px',
      },
    },
  },
  plugins: [],
}

export default config
