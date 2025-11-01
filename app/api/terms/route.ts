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
      <h4>PSP Instalments Terms</h4>
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
      <h4>Test Airlines Instalments Terms</h4>
      <ul>
        <li>Deposit paid today, balance split across agreed installments</li>
        <li>Payment schedule aligned with travel dates where possible</li>
        <li>MIT consent required for automatic recurring charges</li>
        <li>Final payment due minimum 7 days before travel</li>
        <li>Changes to travel dates may affect payment schedule</li>
        <li>Standard Test Airlines refund and change policies apply</li>
        <li>Manage your plan via "My Bookings" section</li>
      </ul>
    `
  },
  'merchant-fullauth': {
    'default': `
      <h4>Test Airlines Full Authorisation Instalments Terms</h4>
      <ul>
        <li>Full amount authorised upfront on your card</li>
        <li>Payment captured in installments according to schedule</li>
        <li>No additional authorisations required</li>
        <li>Your available credit limit reduced by full amount</li>
        <li>Scheduled captures processed automatically</li>
        <li>Final payment due minimum 7 days before travel</li>
        <li>Standard Test Airlines refund and change policies apply</li>
        <li>Manage your plan via "My Bookings" section</li>
      </ul>
    `
  },
  'merchant-mit': {
    'default': `
      <h4>Test Airlines MIT Instalments Terms</h4>
      <ul>
        <li>Initial payment requires 3D Secure authentication</li>
        <li>Subsequent payments processed as Merchant Initiated Transactions</li>
        <li>Network tokenization ensures secure recurring payments</li>
        <li>Email notifications sent before each payment</li>
        <li>Payment schedule aligned with travel dates where possible</li>
        <li>Final payment due minimum 7 days before travel</li>
        <li>Can modify payment details via "My Bookings"</li>
        <li>Standard Test Airlines refund and change policies apply</li>
      </ul>
    `
  },
  'deposit-instalments': {
    'default': `
      <h4>Deposit Instalments Terms</h4>
      <ul>
        <li>Initial deposit secures your booking today</li>
        <li>Remaining balance split into installments</li>
        <li>Instalment schedule customisable based on travel date</li>
        <li>Payment reminders sent via email before each installment</li>
        <li>Early payment of remaining balance allowed without penalty</li>
        <li>Final payment due minimum 14 days before travel</li>
        <li>Failure to complete payments may result in booking cancellation</li>
        <li>Standard Test Airlines refund policies apply pro-rata to payments made</li>
      </ul>
    `
  },
  'acquirer': {
    'default': `
      <h4>Acquirer Instalments Terms</h4>
      <ul>
        <li>Installment plan managed by payment acquirer</li>
        <li>Test Airlines receives full payment upfront from acquirer</li>
        <li>Customer payment schedule managed by acquirer</li>
        <li>Dispute resolution through acquirer customer service</li>
        <li>Terms and rates set by acquirer product</li>
        <li>Standard merchant refund policies apply</li>
      </ul>
    `
  },
  'issuer-pre': {
    'default': `
      <h4>Bank Instalments Terms (Pre-purchase)</h4>
      <ul>
        <li>Installment conversion offered by your card issuing bank</li>
        <li>Test Airlines receives full payment immediately</li>
        <li>Bank converts payment to installments on your account</li>
        <li>Interest rates and fees per your bank's standard terms</li>
        <li>Manage installments through your bank account/app</li>
        <li>Standard merchant refund process applies</li>
      </ul>
    `
  },
  'issuer-post': {
    'default': `
      <h4>Bank Instalments Terms (Post-purchase)</h4>
      <ul>
        <li>Transaction completed as standard card payment</li>
        <li>Bank installment conversion available after checkout</li>
        <li>Customer initiates installment conversion directly with bank</li>
        <li>Test Airlines transaction already completed - no impact on refunds</li>
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
        <li>Standard Test Airlines booking change and refund policies apply</li>
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
      <h4>Smart Instalments Terms</h4>
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
        <li>Standard Test Airlines refund policies apply after ticket issuance</li>
        <li>Hold duration cannot be extended once selected</li>
        <li>Payment reminders sent 24 hours before expiry</li>
      </ul>
    `
  },
  'flexpay': {
    'default': `
      <h4>FlexPay via Amadeus Terms & Conditions</h4>
      <p><strong>Provider:</strong> FlexPay (via Amadeus XPP Integration)</p>
      <ul>
        <li><strong>Payment Method:</strong> Virtual Credit Card (VCC) via UATP network</li>
        <li><strong>Integration:</strong> Orchestrated through Amadeus XPP (Payment Platform)</li>
        <li><strong>Instalment Options:</strong> 3, 6, or 12 monthly instalments available</li>
        <li><strong>Interest/Fees:</strong> Applied to instalment plan as per FlexPay terms</li>
        <li><strong>First Payment:</strong> Due immediately at booking confirmation</li>
        <li><strong>Subsequent Payments:</strong> Charged automatically on monthly schedule</li>
        <li><strong>Credit Assessment:</strong> Real-time credit check performed at FlexPay portal</li>
        <li><strong>Customer Journey:</strong> Web-redirect to FlexPay login portal for loan application</li>
        <li><strong>Loan Agreement:</strong> Must be accepted at FlexPay portal before approval</li>
        <li><strong>VCC Authorization:</strong> FlexPay generates VCC, DAPI submits to UATP for authorization</li>
        <li><strong>Settlement:</strong> Test Airlines receives immediate full payment via UATP network</li>
        <li><strong>Credit Risk:</strong> FlexPay bears all credit risk and default liability</li>
        <li><strong>Data Sharing:</strong> Personal and financial data shared with FlexPay for assessment</li>
        <li><strong>Payment Validation:</strong> XPP enquires loan status from FlexPay before ticket issuance</li>
        <li><strong>Refunds:</strong> Initiated by Test Airlines via XPP, FlexPay adjusts instalment plan</li>
        <li><strong>Late Payments:</strong> Managed by FlexPay, fees per FlexPay loan terms</li>
        <li><strong>Early Repayment:</strong> Contact FlexPay customer service for early settlement</li>
        <li><strong>Chargebacks:</strong> FlexPay handles all disputes and chargeback liability</li>
        <li><strong>Customer Support:</strong> FlexPay portal and customer service for instalment management</li>
        <li><strong>Ticket Issuance:</strong> Occurs after successful VCC authorization via UATP</li>
        <li><strong>Payment Notifications:</strong> Sent by FlexPay before each instalment due date</li>
        <li><strong>UATP Network:</strong> Payments processed via Universal Air Travel Plan network</li>
        <li><strong>Eligibility:</strong> Subject to FlexPay credit approval and market availability</li>
        <li><strong>Minimum/Maximum:</strong> £200 minimum, £5000 maximum booking value</li>
        <li><strong>Travel Date:</strong> Must be within acceptable window for instalment completion</li>
      </ul>
    `
  },
  'embedded-bnpl': {
    'default': `
      <h4>Merchant-embedded BNPL Terms</h4>
      <ul>
        <li>Multiple financing partners available (SeQura, Aplazame, FLOA)</li>
        <li>Provider selected based on customer profile and eligibility</li>
        <li>Interest-free promotional periods may be available</li>
        <li>Credit check performed by financing partner</li>
        <li>Test Airlines receives payment according to partnership agreement</li>
        <li>Revenue share model with loyalty integration benefits</li>
        <li>Currently available in Spain market only</li>
        <li>Standard refund policies coordinated between airline and finance provider</li>
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