'use client'

import { useState } from 'react'
import Link from 'next/link'
import { InstalmentsComparisonTable } from '@/components/InstalmentsComparisonTable'

export default function ComparisonPage() {
  const [exportType, setExportType] = useState<'word' | 'pdf' | null>(null)

  const handleExport = (type: 'word' | 'pdf') => {
    setExportType(type)
    // Show loading state briefly
    setTimeout(() => {
      if (type === 'word') {
        // Simulate Word export
        const element = document.createElement('a')
        const file = new Blob(['This would be the Word document with the comparison table'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
        element.href = URL.createObjectURL(file)
        element.download = 'instalment-models-comparison.docx'
        element.click()
      } else {
        // Simulate PDF export
        const element = document.createElement('a')
        const file = new Blob(['This would be the PDF document with the comparison table'], { type: 'application/pdf' })
        element.href = URL.createObjectURL(file)
        element.download = 'instalment-models-comparison.pdf'
        element.click()
      }
      setExportType(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">Instalment Models Comparison</h1>
              <p className="text-gray-600 mt-2">Comprehensive comparison of all payment installment models with full details and export options</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleExport('word')}
                disabled={exportType !== null}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportType === 'word' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export Word
                  </>
                )}
              </button>
              <button
                onClick={() => handleExport('pdf')}
                disabled={exportType !== null}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {exportType === 'pdf' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with full comparison table */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <InstalmentsComparisonTable />
      </div>

      {/* Additional information section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">About This Comparison</h3>
          <div className="prose text-gray-700 max-w-none">
            <p className="mb-4">
              This comprehensive comparison table evaluates all instalment models from British Airways' perspective, 
              focusing on strategic business considerations including revenue impact, risk exposure, and operational complexity.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Evaluation Criteria:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• <strong>Revenue Flow:</strong> How and when BA receives payment</li>
                  <li>• <strong>Credit Risk:</strong> Who bears the risk of customer default</li>
                  <li>• <strong>Implementation Effort:</strong> Technical complexity and development time</li>
                  <li>• <strong>BA Control:</strong> Level of control over payment terms and experience</li>
                  <li>• <strong>Customer Experience:</strong> Complexity from customer perspective</li>
                  <li>• <strong>Market Suitability:</strong> Geographic and regulatory constraints</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Color Coding Legend:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-green-100 rounded border border-green-200"></span>
                    <span><strong>Green:</strong> Low complexity/effort, High control (favorable for BA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-yellow-100 rounded border border-yellow-200"></span>
                    <span><strong>Yellow:</strong> Medium complexity/effort, Moderate control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 bg-red-100 rounded border border-red-200"></span>
                    <span><strong>Red:</strong> High complexity/effort, Low control (challenging for BA)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}