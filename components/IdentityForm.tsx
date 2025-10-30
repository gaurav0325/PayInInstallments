'use client'
import { isDNI, isNIE, isEsMobile } from '@/lib/validators'
import { useState } from 'react'

export function IdentityForm({ onContinue }: { onContinue: (o:{idType:'DNI'|'NIE'; idValue:string; mobile:string})=>void }) {
  const [idType,setIdType]=useState<'DNI'|'NIE'>('DNI')
  const [idValue,setIdValue]=useState('')
  const [mobile,setMobile]=useState('')
  const valid = (idType==='DNI'?isDNI(idValue):isNIE(idValue)) && isEsMobile(mobile)
  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-3 gap-3">
        <div>
          <label className="text-sm text-gray-600">ID type</label>
          <select className="w-full border rounded-xl px-3 py-2" value={idType} onChange={e=>setIdType(e.target.value as any)}>
            <option value="DNI">DNI</option>
            <option value="NIE">NIE</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-600">ID number</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder={idType==='DNI'?'12345678Z':'X1234567L'} value={idValue} onChange={e=>setIdValue(e.target.value.toUpperCase())}/>
        </div>
        <div>
          <label className="text-sm text-gray-600">Spanish mobile</label>
          <input className="w-full border rounded-xl px-3 py-2" placeholder="+34 612345678" value={mobile} onChange={e=>setMobile(e.target.value)}/>
        </div>
      </div>
      <div className="flex justify-end"><button disabled={!valid} className={`btn ${valid?'btn-primary':'bg-gray-300 text-gray-500 cursor-not-allowed'}`} onClick={()=>valid&&onContinue({idType,idValue,mobile})}>Continue</button></div>
    </div>
  )
}