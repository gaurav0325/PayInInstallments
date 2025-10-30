import { NextResponse } from 'next/server'
import type { Basket, Customer, ModelKey } from '@/lib/types'
import { checkEligibility } from '@/lib/eligibility'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { model, basket, customer }: { 
      model: ModelKey, 
      basket: Basket, 
      customer?: Customer 
    } = body

    const result = checkEligibility(model, basket, customer)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Eligibility check error:', error)
    return NextResponse.json(
      { eligible: false, reasons: ['System error'], requiredFields: [] },
      { status: 500 }
    )
  }
}