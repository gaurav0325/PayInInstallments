import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ba: {
          red: '#D7192D',
          orange: '#EF8314',
          yellow: '#FACD08'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.06)'
      }
    }
  },
  plugins: []
} satisfies Config