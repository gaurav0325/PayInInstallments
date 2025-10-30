'use client'
import { useState } from 'react'
import { calcTotals } from '@/lib/calc'

export function PlanPicker({ amount, onSelect }: { amount: number; onSelect: (o: {months:number; mode:'promo0'|'fee2'|'apr149'})=>void }) {
  const [months,setMonths]=useState(3)
  const [mode,setMode]=useState<'promo0'|'fee2'|'apr149'>('promo0')
  const totals = calcTotals(amount, months, mode)
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {[3,6,9,12].map(m=> (
          <button key={m} onClick={()=>setMonths(m)} className={`px-4 py-2 rounded-xl border ${months===m?'bg-red-600 text-white border-red-600':'bg-white text-gray-800 border-gray-300 hover:border-red-400'}`}>{m} months</button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="inline-flex items-center gap-2"><input type="radio" name="cost" checked={mode==='promo0'} onChange={()=>setMode('promo0')} /> Promo 0% APR</label>
        <label className="inline-flex items-center gap-2"><input type="radio" name="cost" checked={mode==='fee2'} onChange={()=>setMode('fee2')} /> Fixed fee 2%</label>
        <label className="inline-flex items-center gap-2"><input type="radio" name="cost" checked={mode==='apr149'} onChange={()=>setMode('apr149')} /> APR 14.9% (demo)</label>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="card p-4"><div className="text-xs text-gray-500">Monthly payment</div><div className="text-2xl font-semibold">€{totals.monthly.toFixed(2)}</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500">First payment today</div><div className="text-xl font-semibold">€{totals.firstPayment.toFixed(2)}</div></div>
        <div className="card p-4"><div className="text-xs text-gray-500">Total to pay</div><div className="text-xl font-semibold">€{totals.totalToPay.toFixed(2)}</div></div>
      </div>
      <div className="flex justify-end">
        <button className="btn-primary" onClick={()=>onSelect({months,mode})}>Continue</button>
      </div>
    </div>
  )
}