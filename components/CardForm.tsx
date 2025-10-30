'use client'
import { isPan16 } from '@/lib/validators'
import { useState } from 'react'

export function CardForm({ onPay }: { onPay: (pan: string) => void }) {
  const [pan,setPan]=useState('')
  const [expiry,setExpiry]=useState('')
  const [cvv,setCvv]=useState('')
  const ok = isPan16(pan) && expiry.length === 5 && cvv.length === 3
  
  const formatExpiry = (value: string) => {
    const nums = value.replace(/\D/g, '')
    if (nums.length >= 2) {
      return nums.slice(0,2) + '/' + nums.slice(2,4)
    }
    return nums
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm text-gray-600">Card number (Visa or Mastercard)</label>
        <input 
          value={pan} 
          onChange={e=>setPan(e.target.value.replace(/[^0-9]/g,'').slice(0,16))} 
          placeholder="0000 0000 0000 0000" 
          className="w-full border rounded-xl px-3 py-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-gray-600">Expiry (MM/YY)</label>
          <input 
            value={expiry}
            onChange={e=>setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">CVV</label>
          <input 
            value={cvv}
            onChange={e=>setCvv(e.target.value.replace(/\D/g,'').slice(0,3))}
            placeholder="123"
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button disabled={!ok} className={`btn ${ok?'btn-primary':'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={()=>ok&&onPay(pan)}>Pay now</button>
      </div>
    </div>
  )
}