import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionId, status, providerReference } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    // Simulate provider processing delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // Simulate provider decision (85% approval rate)
    const approved = Math.random() > 0.15

    if (approved) {
      const planId = `plan_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
      
      return NextResponse.json({
        result: 'approved',
        planId,
        sessionId,
        providerReference: providerReference || `prov_${Date.now()}`,
        approvalCode: Math.random().toString(36).substr(2, 8).toUpperCase(),
        message: 'Application approved successfully'
      })
    } else {
      // Random decline reasons for demo
      const declineReasons = [
        'Credit assessment declined',
        'Insufficient information provided',
        'Market restrictions apply',
        'Provider service temporarily unavailable'
      ]
      
      return NextResponse.json({
        result: 'declined',
        sessionId,
        reason: declineReasons[Math.floor(Math.random() * declineReasons.length)],
        canRetry: Math.random() > 0.5
      })
    }
  } catch (error) {
    console.error('Provider completion error:', error)
    return NextResponse.json(
      { error: 'System error' },
      { status: 500 }
    )
  }
}