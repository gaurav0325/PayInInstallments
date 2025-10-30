'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EnhancedNotesSection } from './EnhancedNotesSection'

export function NavigationHeader() {
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Merchant (Full Auth)', href: '/models/merchant-fullauth' },
    { name: 'Merchant (MIT)', href: '/models/merchant-mit' },
    { name: 'Amadeus Acquirer', href: '/models/acquirer' },
    { name: 'BNPL Partners', href: '/models/bnpl' },
    { name: 'Embedded BNPL', href: '/models/embedded-bnpl' },
    { name: 'PSP Driven', href: '/models/psp' },
    { name: 'Deposit System', href: '/models/deposit-instalments' },
    { name: 'Bank Driven', href: '/models/issuer-pre' },
    { name: 'Deferred Payment', href: '/models/deferred' },
    { name: 'Hybrid Router', href: '/models/hybrid' },
    { name: 'Hold My Fare', href: '/models/hold-my-fare' }
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* British Airways - Far Left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-xl font-bold text-gray-900 tracking-tight">
                British Airways
              </div>
              <div className="text-sm text-gray-500">
                Installments
              </div>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-1 flex-1 justify-center max-w-4xl mx-8">
            <div className="flex items-center space-x-1 flex-wrap">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Smart Notes - Top Right */}
          <div className="flex-shrink-0">
            <EnhancedNotesSection isCompact={true} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 py-2 space-y-1 max-h-64 overflow-y-auto">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}