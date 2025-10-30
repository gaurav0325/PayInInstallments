import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { pan, amount, currency = 'EUR' } = body

    // Validate inputs
    if (!pan || !amount) {
      return NextResponse.json(
        { error: 'Missing PAN or amount' },
        { status: 400 }
      )
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Simulate different outcomes based on PAN
    // BBVA cards trigger 3DS, CaixaBank cards decline for demo
    const shouldRequire3DS = pan.startsWith('4242') || pan.startsWith('5432')
    const shouldDecline = pan.startsWith('4000') || pan.endsWith('0001')

    if (shouldDecline) {
      return NextResponse.json({
        authorised: false,
        declineReason: 'Insufficient funds',
        transactionId: `tx_declined_${Date.now()}`
      })
    }

    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    if (shouldRequire3DS) {
      return NextResponse.json({
        requires3DS: true,
        transactionId,
        threeDSUrl: '/api/complete-3ds',
        amount,
        currency
      })
    }

    // Direct authorisation
    return NextResponse.json({
      authorised: true,
      authCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      transactionId,
      amount,
      currency
    })
  } catch (error) {
    console.error('Authorisation error:', error)
    return NextResponse.json(
      { error: 'System error' },
      { status: 500 }
    )
  }
}