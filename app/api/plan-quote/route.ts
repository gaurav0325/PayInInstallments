import { NextResponse } from 'next/server'
import { calcTotals } from '@/lib/calc'
import type { Basket } from '@/lib/types'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { basket, months, mode }: { 
      basket: Basket, 
      months: number, 
      mode: 'promo0'|'fee2'|'apr149' 
    } = body

    // Validate inputs
    if (!basket || !months || !mode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (![3, 6, 9, 12].includes(months)) {
      return NextResponse.json(
        { error: 'Invalid months value' },
        { status: 400 }
      )
    }

    const totals = calcTotals(basket.total, months, mode)
    
    const quote = {
      months,
      apr: mode === 'apr149' ? 14.9 : undefined,
      feePct: mode === 'fee2' ? 2 : undefined,
      ...totals
    }

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Plan quote error:', error)
    return NextResponse.json(
      { error: 'System error' },
      { status: 500 }
    )
  }
}