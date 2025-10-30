'use client'
import { useState, useEffect } from 'react'

export function ProviderRedirect({ 
  onComplete, 
  providerName = 'Payment Provider' 
}: { 
  onComplete: (result: 'approved' | 'declined') => void
  providerName?: string
}) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setLoading(false)
          setTimeout(() => onComplete('approved'), 500)
          return 100
        }
        return prev + 10
      })
    }, 150)

    return () => clearInterval(timer)
  }, [onComplete])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/30 grid place-items-center">
        <div className="card p-6 bg-white max-w-md w-full mx-4">
          <div className="text-lg font-semibold">Redirecting to {providerName}...</div>
          <div className="text-sm text-gray-600 mt-1 mb-4">Please wait while we process your application.</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Do not close this window</div>
        </div>
      </div>
    )
  }

  return null
}