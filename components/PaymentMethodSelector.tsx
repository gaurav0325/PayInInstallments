'use client'
import { useState } from 'react'

interface PaymentMethod {
  id: string
  name: string
  description?: string
}

export function PaymentMethodSelector({ 
  methods, 
  onSelect 
}: { 
  methods: PaymentMethod[]
  onSelect: (methodId: string) => void 
}) {
  const [selected, setSelected] = useState<string>(methods[0]?.id)

  return (
    <div className="space-y-3">
      {methods.map(method => (
        <label
          key={method.id}
          className={`card p-4 cursor-pointer border-2 transition-colors ${
            selected === method.id ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              name="payment-method"
              value={method.id}
              checked={selected === method.id}
              onChange={e => setSelected(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{method.name}</span>
              </div>
              {method.description && (
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
              )}
            </div>
          </div>
        </label>
      ))}
      <div className="flex justify-end">
        <button 
          className="btn-primary"
          onClick={() => onSelect(selected)}
        >
          Continue with selected method
        </button>
      </div>
    </div>
  )
}