import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { transactionId, threeDSResult } = body

    if (!transactionId) {
      return NextResponse.json(
        { error: 'Missing transaction ID' },
        { status: 400 }
      )
    }

    // Simulate 3DS processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate 3DS outcomes (90% success rate)
    const success = Math.random() > 0.1

    if (success) {
      return NextResponse.json({
        authorised: true,
        authCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
        transactionId,
        threeDSStatus: 'Y' // Authentication successful
      })
    } else {
      return NextResponse.json({
        authorised: false,
        transactionId,
        threeDSStatus: 'N', // Authentication failed
        declineReason: '3D Secure authentication failed'
      })
    }
  } catch (error) {
    console.error('3DS completion error:', error)
    return NextResponse.json(
      { error: 'System error' },
      { status: 500 }
    )
  }
}