'use client'
import { useState, useEffect } from 'react'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info'
  message: string
}

let toastQueue: Toast[] = []
let toastCallback: ((toasts: Toast[]) => void) | null = null

export function showToast(type: Toast['type'], message: string) {
  const toast: Toast = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    message
  }
  toastQueue = [...toastQueue, toast]
  if (toastCallback) toastCallback(toastQueue)
  
  setTimeout(() => {
    toastQueue = toastQueue.filter(t => t.id !== toast.id)
    if (toastCallback) toastCallback(toastQueue)
  }, 4000)
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    toastCallback = setToasts
    return () => {
      toastCallback = null
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`card p-4 max-w-md shadow-lg ${
            toast.type === 'success' ? 'border-green-200 bg-green-50' :
            toast.type === 'error' ? 'border-red-200 bg-red-50' :
            'border-blue-200 bg-blue-50'
          }`}
        >
          <div className={`text-sm font-medium ${
            toast.type === 'success' ? 'text-green-800' :
            toast.type === 'error' ? 'text-red-800' :
            'text-blue-800'
          }`}>
            {toast.message}
          </div>
        </div>
      ))}
    </div>
  )
}