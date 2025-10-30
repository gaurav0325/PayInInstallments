'use client'
import { useState, useEffect } from 'react'

export function TermsPanel({ model, market = 'ES' }: { model: string; market?: string }) {
  const [expanded, setExpanded] = useState(false)
  const [terms, setTerms] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (expanded && !terms) {
      setLoading(true)
      fetch(`/api/terms?model=${model}&market=${market}`)
        .then(res => res.text())
        .then(html => setTerms(html))
        .finally(() => setLoading(false))
    }
  }, [expanded, model, market, terms])

  return (
    <section className="card p-5">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-md font-semibold">Terms and conditions</h3>
        <span className="text-gray-400">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && (
        <div className="mt-3 pt-3 border-t">
          {loading ? (
            <div className="text-sm text-gray-500">Loading terms...</div>
          ) : (
            <div 
              className="text-sm text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          )}
        </div>
      )}
    </section>
  )
}