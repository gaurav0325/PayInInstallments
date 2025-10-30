import { NextResponse } from 'next/server'

const termsContent: Record<string, Record<string, string>> = {
  'bnpl': {
    'ES': `
      <h4>BNPL Terms & Conditions (Spain)</h4>
      <p><strong>Provider:</strong> Klarna Bank AB (via representative in Spain)</p>
      <ul>
        <li>Interest-free period: First 3 months (promotional offer)</li>
        <li>Late payment fee: €5 per missed payment</li>
        <li>Credit check: Soft check performed, no impact on credit score</li>
        <li>Data sharing: Personal and financial data shared with Klarna for assessment</li>
        <li>Refunds: Processed through original payment plan, adjustments made automatically</li>
        <li>Early repayment: Allowed at any time without penalty</li>
        <li>Customer support: Available in Spanish via Klarna customer service</li>
      </ul>
    `,
    'default': `
      <h4>BNPL Terms & Conditions</h4>
      <p>Buy Now, Pay Later terms vary by market and provider. Key points typically include:</p>
      <ul>
        <li>Credit assessment required</li>
        <li>Payment schedule as agreed</li>
        <li>Late fees may apply</li>
        <li>Provider manages customer relationship</li>
      </ul>
    `
  },
  'klarna': {
    'default': `
      <h4>Klarna Terms & Conditions</h4>
      <p><strong>Provider:</strong> Klarna Bank AB</p>
      <ul>
        <li>Pay in 3 interest-free instalments</li>
        <li>First payment due today, subsequent payments every 30 days</li>
        <li>Late payment fee: £6 per missed payment</li>
        <li>Credit check: Soft check performed, no impact on credit score</li>
        <li>Data sharing: Personal and financial data shared with Klarna for assessment</li>
        <li>Refunds: Processed through original payment plan, adjustments made automatically</li>
        <li>Early repayment: Allowed at any time without penalty</li>
        <li>Customer support: Available via Klarna app and customer service</li>
        <li>Must be 18+ and UK resident with valid debit/credit card</li>
      </ul>
    `
  },
  'clearpay': {
    'default': `
      <h4>Clearpay Terms & Conditions</h4>
      <p><strong>Provider:</strong> Clearpay (Afterpay)</p>
      <ul>
        <li>Buy now, pay later in 4 fortnightly instalments</li>
        <li>First payment due today, remaining 3 payments every 2 weeks</li>
        <li>Late payment fee: £6 for payments under £40, £12 for payments over £40</li>
        <li>Maximum late fees capped at 25% of order value or £68, whichever is less</li>
        <li>Credit check: Soft check performed initially</li>
        <li>Refunds: Processed through original payment plan</li>
        <li>Early repayment: Allowed at any time without penalty</li>
        <li>Customer support: Available via Clearpay app and website</li>
        <li>Must be 18+ and UK resident with valid debit/credit card</li>
      </ul>
    `
  },
  'paypal': {
    'default': `
      <h4>PayPal Pay in 4 Terms & Conditions</h4>
      <p><strong>Provider:</strong> PayPal Credit</p>
      <ul>
        <li>Pay in 4 interest-free payments every 2 weeks</li>
        <li>First payment due today, remaining 3 payments automatically debited</li>
        <li>No interest, no late fees if payments are made on time</li>
        <li>Late payment fee: May apply to missed payments</li>
        <li>Credit check: Soft check performed, no impact on credit score</li>
        <li>Must have active PayPal account in good standing</li>
        <li>Refunds: Processed through PayPal, adjustments made automatically</li>
        <li>Early repayment: Available through PayPal account</li>
        <li>Customer support: Available via PayPal customer service</li>
        <li>Must be 18+ with valid PayPal account and payment method</li>
      </ul>
    `
  },
  'psp': {
    'default': `
      <h4>PSP Installments Terms</h4>
      <ul>
        <li>Payment split managed by payment processor</li>
        <li>Network tokenization for secure recurring payments</li>
        <li>Strong Customer Authentication (SCA) required for initial payment</li>
        <li>Merchant Initiated Transaction (MIT) for subsequent payments</li>
        <li>Email notifications before each payment</li>
        <li>Can modify or cancel plan before next payment due date</li>
        <li>Standard card scheme chargeback rights apply</li>
      </ul>
    `
  },
  'merchant': {
    'default': `
      <h4>BA Installments Terms</h4>
      <ul>
        <li>Deposit paid today, balance split across agreed installments</li>
        <li>Payment schedule aligned with travel dates where possible</li>
        <li>MIT consent required for automatic recurring charges</li>
        <li>Final payment due minimum 7 days before travel</li>
        <li>Changes to travel dates may affect payment schedule</li>
        <li>Standard BA refund and change policies apply</li>
        <li>Manage your plan via "My Bookings" section</li>
      </ul>
    `
  },
  'merchant-fullauth': {
    'default': `
      <h4>BA Full Authorisation Installments Terms</h4>
      <ul>
        <li>Full amount authorised upfront on your card</li>
        <li>Payment captured in installments according to schedule</li>
        <li>No additional authorisations required</li>
        <li>Your available credit limit reduced by full amount</li>
        <li>Scheduled captures processed automatically</li>
        <li>Final payment due minimum 7 days before travel</li>
        <li>Standard BA refund and change policies apply</li>
        <li>Manage your plan via "My Bookings" section</li>
      </ul>
    `
  },
  'merchant-mit': {
    'default': `
      <h4>BA MIT Installments Terms</h4>
      <ul>
        <li>Initial payment requires 3D Secure authentication</li>
        <li>Subsequent payments processed as Merchant Initiated Transactions</li>
        <li>Network tokenization ensures secure recurring payments</li>
        <li>Email notifications sent before each payment</li>
        <li>Payment schedule aligned with travel dates where possible</li>
        <li>Final payment due minimum 7 days before travel</li>
        <li>Can modify payment details via "My Bookings"</li>
        <li>Standard BA refund and change policies apply</li>
      </ul>
    `
  },
  'deposit-instalments': {
    'default': `
      <h4>Deposit Installments Terms</h4>
      <ul>
        <li>Initial deposit secures your booking today</li>
        <li>Remaining balance split into installments</li>
        <li>Instalment schedule customisable based on travel date</li>
        <li>Payment reminders sent via email before each installment</li>
        <li>Early payment of remaining balance allowed without penalty</li>
        <li>Final payment due minimum 14 days before travel</li>
        <li>Failure to complete payments may result in booking cancellation</li>
        <li>Standard BA refund policies apply pro-rata to payments made</li>
      </ul>
    `
  },
  'acquirer': {
    'default': `
      <h4>Acquirer Installments Terms</h4>
      <ul>
        <li>Installment plan managed by payment acquirer</li>
        <li>BA receives full payment upfront from acquirer</li>
        <li>Customer payment schedule managed by acquirer</li>
        <li>Dispute resolution through acquirer customer service</li>
        <li>Terms and rates set by acquirer product</li>
        <li>Standard merchant refund policies apply</li>
      </ul>
    `
  },
  'issuer-pre': {
    'default': `
      <h4>Bank Installments Terms (Pre-purchase)</h4>
      <ul>
        <li>Installment conversion offered by your card issuing bank</li>
        <li>BA receives full payment immediately</li>
        <li>Bank converts payment to installments on your account</li>
        <li>Interest rates and fees per your bank's standard terms</li>
        <li>Manage installments through your bank account/app</li>
        <li>Standard merchant refund process applies</li>
      </ul>
    `
  },
  'issuer-post': {
    'default': `
      <h4>Bank Installments Terms (Post-purchase)</h4>
      <ul>
        <li>Transaction completed as standard card payment</li>
        <li>Bank installment conversion available after checkout</li>
        <li>Customer initiates installment conversion directly with bank</li>
        <li>BA transaction already completed - no impact on refunds</li>
        <li>Installment terms per bank's customer agreement</li>
      </ul>
    `
  },
  'deferred': {
    'default': `
      <h4>Deferred Payment Terms</h4>
      <ul>
        <li>No payment taken today - booking confirmed</li>
        <li>Full payment charged automatically on due date</li>
        <li>Email reminders sent before payment due</li>
        <li>Payment failure may result in booking cancellation</li>
        <li>Cancellation fees may apply if payment fails</li>
        <li>Standard BA booking change and refund policies apply</li>
        <li>Update payment method anytime before due date</li>
      </ul>
    `
  },
  'deposit-balance': {
    'default': `
      <h4>Deposit + Balance Terms</h4>
      <ul>
        <li>Deposit paid today to secure booking</li>
        <li>Balance due before travel date (typically 7 days prior)</li>
        <li>Payment schedule may adjust if travel dates change</li>
        <li>Early payment of balance allowed without penalty</li>
        <li>Refund policy applies pro-rata to payments made</li>
        <li>Final payment failure may result in booking cancellation</li>
        <li>Manage payment schedule via "My Bookings"</li>
      </ul>
    `
  },
  'hybrid': {
    'default': `
      <h4>Smart Installments Terms</h4>
      <ul>
        <li>Terms depend on the installment model selected by our system</li>
        <li>Routing based on eligibility, market, and optimal customer terms</li>
        <li>Specific terms presented before final payment confirmation</li>
        <li>Customer can decline routing and choose different payment method</li>
        <li>All standard consumer protection rights apply</li>
        <li>Model-specific terms will be clearly disclosed</li>
      </ul>
    `
  },
  'hold-my-fare': {
    'default': `
      <h4>Hold My Fare Terms & Conditions</h4>
      <ul>
        <li>Hold fee is non-refundable under any circumstances</li>
        <li>Hold option valid only for selected fare, not transferable</li>
        <li>If full payment not made within hold period, booking is cancelled</li>
        <li>Instalment option (if available) must complete before departure</li>
        <li>Hold fee does not count towards final ticket price</li>
        <li>Seats blocked without guaranteed revenue (airline risk)</li>
        <li>Auto-cancellation occurs at expiry with fee forfeited</li>
        <li>Standard BA refund policies apply after ticket issuance</li>
        <li>Hold duration cannot be extended once selected</li>
        <li>Payment reminders sent 24 hours before expiry</li>
      </ul>
    `
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const model = searchParams.get('model') || 'default'
    const market = searchParams.get('market') || 'default'

    const modelTerms = termsContent[model]
    if (!modelTerms) {
      return new NextResponse('Terms not found', { status: 404 })
    }

    const terms = modelTerms[market] || modelTerms['default'] || modelTerms[Object.keys(modelTerms)[0]]

    return new NextResponse(terms, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    console.error('Terms fetch error:', error)
    return new NextResponse('System error', { status: 500 })
  }
}