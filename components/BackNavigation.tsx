'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useSounds } from '@/utils/soundManager'

interface BackNavigationProps {
  href?: string
  label?: string
}

export function BackNavigation({ href = '/', label = 'Back to Models' }: BackNavigationProps) {
  const { playClick } = useSounds()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Link
        href={href}
        onClick={playClick}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <motion.div
          whileHover={{ x: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="flex items-center"
        >
          <svg 
            className="w-4 h-4 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </motion.div>
        <span className="text-sm font-medium group-hover:underline">
          {label}
        </span>
      </Link>
    </motion.div>
  )
}

export default BackNavigation