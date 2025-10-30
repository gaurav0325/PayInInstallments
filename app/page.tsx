'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { EditableComparisonTable } from '@/components/EditableComparisonTable'
import { NavigationHeader } from '@/components/NavigationHeader'
import { EnhancedNotesSection } from '@/components/EnhancedNotesSection'

export default function Home() {
  // Merchant-Financed Models
  const merchantModels = [
    {
      title: 'Merchant-financed (Full Auth) Installments',
      href: '/models/merchant-fullauth',
      description: 'Single full authorisation with staged captures via acquirer',
      hoverDescription: 'BA authorises full amount upfront, then captures in instalments. Lower risk but requires acquirer support for staged captures. Interest income stays with BA.',
      badge: 'Full Auth',
      category: 'merchant',
      highlighted: false
    },
    {
      title: 'Merchant-financed (MIT) Installments',
      href: '/models/merchant-mit',
      description: 'Initial CIT with SCA + monthly MIT debits using stored credentials',
      hoverDescription: 'Initial payment with SCA, then MIT debits monthly. BA owns customer relationship and payment schedule. Requires network tokenisation and MIT compliance.',
      badge: 'MIT Flow',
      category: 'merchant',
      highlighted: false
    }
  ]

  // Partner-Financed Models
  const partnerModels = [
    {
      title: 'BNPL (partner financed)',
      href: '/models/bnpl',
      description: 'PayPal Pay in 3/4, Klarna, Clearpay - third-party providers finance payments',
      hoverDescription: 'PayPal Pay in 3/4, Klarna, Clearpay, and other BNPL providers finance the payment upfront. BA gets paid immediately minus commission. Provider bears all credit risk and manages customer relationship.',
      badge: 'PayPal Pay in 3/4',
      category: 'partner',
      highlighted: true
    },
    {
      title: 'Merchant-embedded BNPL Installments',
      href: '/models/embedded-bnpl',
      description: 'Iberia Cards orchestrated BNPL with multiple financing partners',
      hoverDescription: 'Strategic BNPL via Iberia Cards subsidiary. Multi-provider financing (SeQura, Aplazame, FLOA) with revenue share and loyalty integration. Spain market only.',
      badge: 'Embedded',
      category: 'partner',
      highlighted: true
    },
    {
      title: 'PSP-driven instalments',
      href: '/models/psp',
      description: 'Payment Service Provider manages instalment scheduling',
      hoverDescription: 'CyberSource/Adyen splits payments across multiple charges. BA gets paid according to schedule. PSP handles tokenisation and recurring charges.',
      badge: 'Embedded modal',
      category: 'partner',
      highlighted: false
    }
  ]

  // Acquirer-Driven Models
  const acquirerModels = [
    {
      title: 'Acquirer-driven instalments',
      href: '/models/acquirer',
      description: 'Amadeus Instalment Engine with business rules configuration',
      hoverDescription: 'Amadeus acquirer provides instalment service with configurable business rules. Single auth + multiple captures. Up to 20 monthly instalments for LATAM markets.',
      badge: 'Acquirer',
      category: 'acquirer',
      highlighted: true
    }
  ]

  // Deposit & Flexible Models
  const depositModels = [
    {
      title: 'Deposit + Installments',
      href: '/models/deposit-instalments',
      description: 'BA Holidays low deposit system with flexible payment timing',
      hoverDescription: 'Low deposit secures booking (£99-£220), customer controls payment schedule. Balance due 4-7 weeks before travel. OpenJaw solution with ATOL protection.',
      badge: 'BA Holidays',
      category: 'deposit',
      highlighted: true
    },
    {
      title: 'Deferred payment',
      href: '/models/deferred',
      description: 'Pay later with zero charge today and future settlement',
      hoverDescription: 'Authorization now, charge later (14/30/60 days). BA bears risk of future payment failure. Requires robust reminder systems.',
      badge: 'Pay later',
      category: 'deposit',
      highlighted: false
    },
    {
      title: 'Hold My Fare, Pay Later',
      href: '/models/hold-my-fare',
      description: 'Reserve flight fare for limited period with small upfront fee',
      hoverDescription: 'Customers pay a small non-refundable fee to hold flight fare for 24h-7days. Balance paid later in full or instalments. Used by Lufthansa, Emirates, Singapore Airlines.',
      badge: 'Hold & Pay',
      category: 'deposit',
      highlighted: false
    }
  ]

  // Bank-Driven Models
  const bankModels = [
    {
      title: 'Issuer instalments (pre-purchase)',
      href: '/models/issuer-pre',
      description: 'Bank modal triggered by eligible BIN detection',
      hoverDescription: 'Customer\'s bank offers instalments during checkout. BA gets paid immediately by bank. Simple integration but limited control.',
      badge: 'Bank modal',
      category: 'bank',
      highlighted: false
    },
    {
      title: 'Issuer instalments (post-purchase)',
      href: '/models/issuer-post',
      description: 'Informational banner promoting bank instalment conversion',
      hoverDescription: 'Banner directing customers to bank portal for instalment conversion. BA receives full payment immediately. No integration required.',
      badge: 'Informational',
      category: 'bank',
      highlighted: false
    }
  ]

  // Smart Routing Models
  const smartModels = [
    {
      title: 'Hybrid orchestrator',
      href: '/models/hybrid',
      description: 'Intelligent routing across multiple instalment providers',
      hoverDescription: 'Smart routing system evaluating customer profile, basket value, market, and risk appetite to dynamically select optimal instalment model.',
      badge: 'Smart routing',
      category: 'smart',
      highlighted: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Installments Playground</h1>
                <a 
                  href="https://britishairways.atlassian.net/wiki/spaces/BCPNP/pages/156183549/Pay+in+Installments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colours group"
                  title="View Confluence Documentation"
                >
                  <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                  </svg>
                </a>
              </div>
              <p className="text-gray-600 text-lg">
                Below are some of the main instalment models explored and analysed so far.
              </p>
              <p className="text-gray-600 max-w-3xl mx-auto text-base">
                Each instalment model shows the complete customer journey from selection to confirmation.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
            {/* Models by Category */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Merchant-Financed Models  */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-red-900">Merchant-Financed Models</h2>
                  <div className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                    BA CONTROLLED
                  </div>
                </div>
                <p className="text-red-700 mb-6 font-medium">BA owns and manages the instalment payment schedule - maximum control and revenue retention</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {merchantModels.map(({ title, href, description, hoverDescription, badge, highlighted, category }) => (
                    <ModelCard key={href} title={title} href={href} description={description} hoverDescription={hoverDescription} badge={badge} highlighted={highlighted} category={category} />
                  ))}
                </div>
              </motion.div>

              {/* Partner-Financed Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-purple-900">Partner-Financed Models</h2>
                  <div className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full">
                    RISK TRANSFER
                  </div>
                </div>
                <p className="text-purple-700 mb-6 font-medium">Third-party providers manage instalment financing and risk - immediate payment with reduced control</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {partnerModels.map(({ title, href, description, hoverDescription, badge, highlighted, category }) => (
                    <ModelCard key={href} title={title} href={href} description={description} hoverDescription={hoverDescription} badge={badge} highlighted={highlighted} category={category} />
                  ))}
                </div>
              </motion.div>

              {/* Acquirer-Driven Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-green-900">Acquirer-Driven Models</h2>
                  <div className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                    AMADEUS INTEGRATION
                  </div>
                </div>
                <p className="text-green-700 mb-6 font-medium">Payment acquirer provides instalment processing capabilities - automated with configurable business rules</p>
                <div className="grid gap-4">
                  {acquirerModels.map(({ title, href, description, hoverDescription, badge, highlighted, category }) => (
                    <ModelCard key={href} title={title} href={href} description={description} hoverDescription={hoverDescription} badge={badge} highlighted={highlighted} category={category} />
                  ))}
                </div>
              </motion.div>

              {/* Deposit & Flexible Payment Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-blue-900">Deposit & Flexible Payment Models</h2>
                  <div className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                    CUSTOMER FRIENDLY
                  </div>
                </div>
                <p className="text-blue-700 mb-6 font-medium">Low deposits with flexible payment timing options - enhances customer affordability and booking conversion</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {depositModels.map(({ title, href, description, hoverDescription, badge, highlighted, category }) => (
                    <ModelCard key={href} title={title} href={href} description={description} hoverDescription={hoverDescription} badge={badge} highlighted={highlighted} category={category} />
                  ))}
                </div>
              </motion.div>

              {/* Bank-Driven Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-orange-900">Bank-Driven Models</h2>
                  <div className="px-2 py-1 bg-orange-600 text-white text-xs font-semibold rounded-full">
                    ZERO INTEGRATION
                  </div>
                </div>
                <p className="text-orange-700 mb-6 font-medium">Customer's bank provides instalment conversion options - minimal effort with immediate payment to BA</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {bankModels.map(({ title, href, description, hoverDescription, badge, highlighted, category }) => (
                    <ModelCard key={href} title={title} href={href} description={description} hoverDescription={hoverDescription} badge={badge} highlighted={highlighted} category={category} />
                  ))}
                </div>
              </motion.div>

              {/* Smart Routing Models */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border-2 border-indigo-200 p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-indigo-900">Smart Routing Models</h2>
                  <div className="px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    AI OPTIMIZED
                  </div>
                </div>
                <p className="text-indigo-700 mb-6 font-medium">Intelligent selection across multiple instalment providers - dynamic optimization for conversion and revenue</p>
                <div className="grid gap-4">
                  {smartModels.map(({ title, href, description, hoverDescription, badge, highlighted, category }) => (
                    <ModelCard key={href} title={title} href={href} description={description} hoverDescription={hoverDescription} badge={badge} highlighted={highlighted} category={category} />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Installments Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <EditableComparisonTable />
            </motion.div>

            {/* Sample Journey Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Test Data & Scenarios</h2>
              <div className="grid sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <div className="font-semibold text-gray-900 mb-2">UK Market (Default)</div>
                  <ul className="text-gray-700 space-y-1">
                    <li>Route: London (LHR) → Rome (FCO)</li>
                    <li>Type: Return journey</li>
                    <li>Passenger: 1 Adult, Economy class</li>
                    <li>Amount: £480.00</li>
                    <li>Name: John Smith</li>
                    <li>Email: john.smith@example.com</li>
                    <li>Phone: +44 7700 123456</li>
                    <li>Card: UK Visa/MasterCard</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-2">Spain Market (Iberia BNPL)</div>
                  <ul className="text-gray-700 space-y-1">
                    <li>Route: Madrid (MAD) → Barcelona (BCN)</li>
                    <li>Type: Return journey</li>
                    <li>Passenger: 1 Adult, Economy class</li>
                    <li>Amount: €180.00</li>
                    <li>Name: Luis García</li>
                    <li>Email: luis.garcia@example.com</li>
                    <li>Phone: +34 600 123 456</li>
                    <li>ID: DNI 12345678Z</li>
                  </ul>
                </div>
              </div>
            </div>
        </div>
      </div>
      
      {/* Smart Notes */}
      <EnhancedNotesSection isCompact={true} modelContext="Homepage" />
    </div>
  )
}

// Model Card Component
function ModelCard({ 
  title, 
  href, 
  description, 
  hoverDescription, 
  badge, 
  highlighted,
  category 
}: {
  title: string
  href: string
  description: string
  hoverDescription: string
  badge: string
  highlighted: boolean
  category: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link 
        href={href}
        className={`group relative block p-4 rounded-xl border transition-all hover:shadow-lg ${
          highlighted 
            ? 'border-red-200 bg-red-50 hover:border-red-300 hover:bg-red-100' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          {highlighted && category !== 'smart' && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              {category === 'acquirer' ? 'Amadeus proposal' : 'Internal reference'}
            </div>
          )}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            highlighted
              ? 'bg-red-100 text-red-700 border border-red-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            {badge}
          </span>
        </div>
        
        <h3 className={`font-semibold mb-2 transition-colors group-hover:text-red-600 ${
          highlighted ? 'text-gray-900' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Hover Tooltip */}
        <div className="absolute left-0 top-full mt-2 w-80 max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg p-4 text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="font-medium text-gray-900 mb-2">{title}</div>
          <div className="leading-relaxed">{hoverDescription}</div>
          <div className="absolute -top-1 left-6 w-2 h-2 bg-white border-l border-t border-gray-200 rotate-45"></div>
        </div>
      </Link>
    </motion.div>
  )
}