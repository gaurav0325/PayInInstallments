'use client'

import { useRef, useEffect } from 'react'
import { ExportWidget } from './ExportWidget'

interface ComparisonData {
  model: string
  revenueFlow: string
  creditRisk: string
  implementationEffort: 'Low' | 'Medium' | 'High'
  baControl: 'Low' | 'Medium' | 'High'
  customerExperience: 'Simple' | 'Standard' | 'Complex'
  revenueRecognition: string
  integrationComplexity: 'Low' | 'Medium' | 'High'
  operationalImpact: 'Low' | 'Medium' | 'High'
  marketSuitability: string
}

const comparisonData: ComparisonData[] = [
  {
    model: 'Merchant-Financed (Full Auth)',
    revenueFlow: 'Test Airlines receives full flight value via staged captures over instalment period',
    creditRisk: 'Test Airlines bears full credit risk - passenger default directly impacts airline revenue',
    implementationEffort: 'Medium',
    baControl: 'High',
    customerExperience: 'Simple',
    revenueRecognition: 'Gradual - revenue recognized as each capture occurs',
    integrationComplexity: 'Medium',
    operationalImpact: 'Medium',
    marketSuitability: 'UK/Global - requires acquirer staged capture support'
  },
  {
    model: 'Merchant-Financed (MIT)',
    revenueFlow: 'Test Airlines receives first instalment immediately, then monthly recurring payments',
    creditRisk: 'High risk - Test Airlines responsible for all payment failures and chargebacks',
    implementationEffort: 'High',
    baControl: 'High',
    customerExperience: 'Standard',
    revenueRecognition: 'Immediate for service, deferred for remaining instalments',
    integrationComplexity: 'High',
    operationalImpact: 'High',
    marketSuitability: 'Global - requires robust payment orchestration and compliance'
  },
  {
    model: 'Amadeus Acquirer-Driven',
    revenueFlow: 'Test Airlines receives upfront settlement from Amadeus, reducing cash flow risk',
    creditRisk: 'Minimal - Amadeus bears processing risk, Test Airlines only bears service delivery risk',
    implementationEffort: 'Medium',
    baControl: 'Medium',
    customerExperience: 'Simple',
    revenueRecognition: 'Immediate - full value recognized upon Amadeus settlement',
    integrationComplexity: 'Medium',
    operationalImpact: 'Low',
    marketSuitability: 'LATAM focused - Brazil, Argentina, Chile with up to 20 instalments'
  },
  {
    model: 'Merchant-Embedded BNPL (Iberia)',
    revenueFlow: 'Test Airlines receives immediate payment minus financing partner fees and revenue share',
    creditRisk: 'Zero - financing partners (SeQura, Aplazame, FLOA) assume all credit risk',
    implementationEffort: 'Medium',
    baControl: 'Medium',
    customerExperience: 'Standard',
    revenueRecognition: 'Immediate - net amount recognized upon partner settlement',
    integrationComplexity: 'Medium',
    operationalImpact: 'Low',
    marketSuitability: 'Spain only - strategic partnership via Iberia Cards subsidiary'
  },
  {
    model: 'Deposit + Instalments (Test Airlines Holidays)',
    revenueFlow: 'Test Airlines receives low deposit immediately, balance payment before service delivery',
    creditRisk: 'Moderate - risk of final payment default, mitigated by ATOL protection',
    implementationEffort: 'Low',
    baControl: 'High',
    customerExperience: 'Simple',
    revenueRecognition: 'Split - deposit immediately, balance upon final payment',
    integrationComplexity: 'Low',
    operationalImpact: 'Low',
    marketSuitability: 'UK package holidays - leverages existing OpenJaw infrastructure'
  },
  {
    model: 'BNPL Partner (Redirect)',
    revenueFlow: 'Test Airlines receives immediate payment minus high partner fees (3-8% of transaction)',
    creditRisk: 'Zero - BNPL partners assume all credit and fraud risk',
    implementationEffort: 'Low',
    baControl: 'Low',
    customerExperience: 'Standard',
    revenueRecognition: 'Immediate - net amount recognized upon partner payment',
    integrationComplexity: 'Low',
    operationalImpact: 'Low',
    marketSuitability: 'Multiple markets - depends on partner coverage and acceptance'
  },
  {
    model: 'PSP-Driven Instalments',
    revenueFlow: 'Test Airlines receives payments according to PSP settlement schedule with processing fees',
    creditRisk: 'Shared - PSP handles payment processing risk, Test Airlines retains service delivery risk',
    implementationEffort: 'Low',
    baControl: 'Low',
    customerExperience: 'Simple',
    revenueRecognition: 'Gradual - as PSP settles each instalment payment',
    integrationComplexity: 'Low',
    operationalImpact: 'Low',
    marketSuitability: 'Global - leverages existing PSP infrastructure (CyberSource/Adyen)'
  },
  {
    model: 'Issuer Instalments (Bank)',
    revenueFlow: 'Test Airlines receives full flight value immediately from customer\'s bank',
    creditRisk: 'Zero - customer\'s issuing bank assumes all credit risk',
    implementationEffort: 'Low',
    baControl: 'Low',
    customerExperience: 'Simple',
    revenueRecognition: 'Immediate - full amount recognized upon bank settlement',
    integrationComplexity: 'Low',
    operationalImpact: 'Low',
    marketSuitability: 'Multiple markets - depends on bank partnerships and card eligibility'
  }
]

const getEffortColor = (effort: string) => {
  switch (effort) {
    case 'Low': return 'text-green-600 bg-green-50'
    case 'Medium': return 'text-yellow-600 bg-yellow-50'
    case 'High': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getControlColor = (control: string) => {
  switch (control) {
    case 'Low': return 'text-red-600 bg-red-50'
    case 'Medium': return 'text-yellow-600 bg-yellow-50'
    case 'High': return 'text-green-600 bg-green-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'Low': return 'text-green-600 bg-green-50'
    case 'Medium': return 'text-yellow-600 bg-yellow-50'
    case 'High': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'Low': return 'text-green-600 bg-green-50'
    case 'Medium': return 'text-yellow-600 bg-yellow-50'
    case 'High': return 'text-red-600 bg-red-50'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export function InstalmentsComparisonTable() {
  const topScrollRef = useRef<HTMLDivElement>(null)
  const bottomScrollRef = useRef<HTMLDivElement>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    const topScroll = topScrollRef.current
    const bottomScroll = bottomScrollRef.current
    const tableScroll = tableScrollRef.current
    const table = tableRef.current

    if (!topScroll || !bottomScroll || !tableScroll || !table) return

    // Set the scroll widths to match the table width
    const topScrollContent = topScroll.querySelector('div')
    const bottomScrollContent = bottomScroll.querySelector('div')
    
    const updateScrollWidths = () => {
      // Ensure scroll width is at least as wide as the table, but with some buffer for visibility
      const tableWidth = table.scrollWidth
      const scrollWidth = `${Math.max(tableWidth, 3000)}px`
      if (topScrollContent) {
        topScrollContent.style.width = scrollWidth
      }
      if (bottomScrollContent) {
        bottomScrollContent.style.width = scrollWidth
      }
    }
    
    updateScrollWidths()

    const syncFromTop = () => {
      tableScroll.scrollLeft = topScroll.scrollLeft
      bottomScroll.scrollLeft = topScroll.scrollLeft
    }

    const syncFromBottom = () => {
      tableScroll.scrollLeft = bottomScroll.scrollLeft
      topScroll.scrollLeft = bottomScroll.scrollLeft
    }

    const syncFromTable = () => {
      topScroll.scrollLeft = tableScroll.scrollLeft
      bottomScroll.scrollLeft = tableScroll.scrollLeft
    }

    topScroll.addEventListener('scroll', syncFromTop)
    bottomScroll.addEventListener('scroll', syncFromBottom)
    tableScroll.addEventListener('scroll', syncFromTable)

    // Update scroll width on window resize
    const handleResize = () => {
      updateScrollWidths()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      topScroll.removeEventListener('scroll', syncFromTop)
      bottomScroll.removeEventListener('scroll', syncFromBottom)
      tableScroll.removeEventListener('scroll', syncFromTable)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 p-8 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <h2 className="text-3xl font-bold text-red-900">Instalment Models Comparison</h2>
          <div className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
            AIRLINE FOCUSED
          </div>
        </div>
        <ExportWidget 
          data={{
            title: "Instalment Models Comparison",
            sections: [{
              name: "Comparison Table",
              content: comparisonData,
              type: "table"
            }]
          }}
        />
      </div>
      <p className="text-red-700 mb-6 text-lg font-medium">
        Strategic comparison of instalment models from Test Airlines' perspective - focussing on revenue impact, risk exposure, and operational considerations.
      </p>
      
      {/* Enhanced table with horizontal scroll and frozen columns */}
      <div className="mb-4">
        <div className="text-xs text-amber-700 font-medium text-center bg-amber-50 rounded-lg p-2 border border-amber-200">
          💡 Table supports horizontal scrolling - first column frozen for easy navigation
        </div>
      </div>
      
      {/* Horizontal scroll bars */}
      <div className="mb-2" ref={topScrollRef}>
        <div className="h-3 bg-gray-100 rounded-full overflow-x-scroll">
          <div style={{width: '1200px', height: '1px'}}></div>
        </div>
      </div>
      
      <div className="w-full overflow-x-auto border border-red-200 rounded-xl bg-white" ref={tableScrollRef}>
        <table className="min-w-full text-xs border-collapse" ref={tableRef} style={{minWidth: '1200px'}}>
          <thead>
            <tr className="border-b-2 border-red-200 bg-red-50">
              <th className="text-left p-2 font-semibold text-red-900 sticky left-0 bg-red-50 border-r border-red-200 z-10" style={{width: '140px'}}>Model</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '180px'}}>Revenue Flow</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '140px'}}>Risk</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '80px'}}>Effort</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '80px'}}>Control</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '70px'}}>CX</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '140px'}}>Recognition</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '100px'}}>Integration</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '80px'}}>Impact</th>
              <th className="text-left p-2 font-semibold text-red-900" style={{width: '180px'}}>Market</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-red-25">
                <td className="p-2 font-medium text-gray-900 text-xs leading-tight sticky left-0 bg-white border-r border-gray-100 z-10" style={{width: '140px'}}>{row.model}</td>
                <td className="p-2 text-gray-700 text-xs leading-tight">{row.revenueFlow}</td>
                <td className="p-2 text-gray-700 text-xs leading-tight">{row.creditRisk}</td>
                <td className="p-2">
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${getEffortColor(row.implementationEffort)}`}>
                    {row.implementationEffort}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${getControlColor(row.baControl)}`}>
                    {row.baControl}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${
                    row.customerExperience === 'Simple' ? 'text-green-600 bg-green-50' :
                    row.customerExperience === 'Standard' ? 'text-blue-600 bg-blue-50' :
                    'text-red-600 bg-red-50'
                  }`}>
                    {row.customerExperience}
                  </span>
                </td>
                <td className="p-2 text-gray-700 text-xs leading-tight">{row.revenueRecognition}</td>
                <td className="p-2">
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${getComplexityColor(row.integrationComplexity)}`}>
                    {row.integrationComplexity}
                  </span>
                </td>
                <td className="p-2">
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${getImpactColor(row.operationalImpact)}`}>
                    {row.operationalImpact}
                  </span>
                </td>
                <td className="p-2 text-gray-700 text-xs leading-tight">{row.marketSuitability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom horizontal scroll bar */}
      <div className="mt-2" ref={bottomScrollRef}>
        <div className="h-3 bg-gray-100 rounded-full overflow-x-scroll">
          <div style={{width: '1200px', height: '1px'}}></div>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4 text-xs text-gray-600">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Key Definitions:</h4>
          <ul className="space-y-1">
            <li><strong>3RI:</strong> 3DS Requestor Initiated - authentication without customer involvement</li>
            <li><strong>MIT:</strong> Merchant Initiated Transaction - recurring payments</li>
            <li><strong>CX:</strong> Customer Experience complexity</li>
            <li><strong>SCA:</strong> Strong Customer Authentication</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Risk & Control:</h4>
          <ul className="space-y-1">
            <li><span className="inline-block w-3 h-3 bg-green-100 rounded mr-1"></span><strong>Low Risk:</strong> Partner bears credit risk</li>
            <li><span className="inline-block w-3 h-3 bg-yellow-100 rounded mr-1"></span><strong>Shared:</strong> Risk distributed across parties</li>
            <li><span className="inline-block w-3 h-3 bg-red-100 rounded mr-1"></span><strong>Test Airlines Risk:</strong> Full merchant liability</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Implementation Notes:</h4>
          <ul className="space-y-1">
            <li><strong>Full Auth:</strong> Single authorisation + staged captures</li>
            <li><strong>MIT:</strong> Recurring debits with network tokens</li>
            <li><strong>Embedded:</strong> White-label partner integration</li>
            <li><strong>Redirect:</strong> External provider experience</li>
          </ul>
        </div>
      </div>
    </div>
  )
}