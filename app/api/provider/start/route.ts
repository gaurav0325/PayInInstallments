import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { model, amount, customer, plan } = body

    // Validate inputs
    if (!model || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Different provider URLs based on model
    const providerUrls = {
      'bnpl': 'https://klarna.example/start',
      'acquirer': 'https://acquirer.example/instalments',
      'psp': 'https://psp.example/split-pay'
    }

    const providerUrl = providerUrls[model as keyof typeof providerUrls] || 'https://provider.example/start'

    // Simulate provider-specific payload
    const payload = {
      sessionId,
      amount,
      currency: 'EUR',
      merchantReference: `BA_${Date.now()}`,
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/provider/complete`,
      customer,
      plan
    }

    return NextResponse.json({
      url: providerUrl,
      sessionId,
      payload,
      method: 'POST'
    })
  } catch (error) {
    console.error('Provider start error:', error)
    return NextResponse.json(
      { error: 'System error' },
      { status: 500 }
    )
  }
}