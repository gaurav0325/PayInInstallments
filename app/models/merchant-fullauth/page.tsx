'use client'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { PlanPicker } from '@/components/PlanPicker'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'

export default function MerchantFullAuthPage() {
  const amount = 480 // UK GBP
  const [step, setStep] = useState<1|2|3|4>(1)
  const [plan, setPlan] = useState<{months:number;mode:'promo0'|'fee2'|'apr149'}|null>(null)
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<'approved'|'declined'|null>(null)

  // Pre-filled customer data
  const customerData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+44 7700 123456',
    address: '123 High Street, London, SW1A 1AA',
    cardNumber: '4242424242424242',
    expiryDate: '12/26',
    cvv: '123'
  }

  const rules = [
    { label: 'Booking via eCommerce (New BA.com)', passed: true, required: true },
    { label: 'Return flight journey', passed: true, required: true },
    { label: 'UK residence with valid ID', passed: true, required: true },
    { label: 'Minimum purchase £100', passed: amount >= 100, required: true },
    { label: 'Maximum purchase £5,000', passed: amount <= 5000, required: true },
    { label: 'Visa or MasterCard issued in UK', passed: true, required: true },
    { label: 'Applicant is passenger on booking', passed: true, required: true },
    { label: 'Acquirer supports staged captures', passed: true, required: true },
    { label: 'Full authorisation successful', passed: result === 'approved', required: true }
  ]

  const attributes = [
    { label: 'BA Gets Money', value: 'According to staged capture schedule' },
    { label: 'Risk Owner', value: 'BA bears credit and operational risk' },
    { label: 'Complexity', value: 'Medium - requires acquirer staged capture support' },
    { label: 'Flexibility', value: 'Low - fixed schedule per acquirer capabilities' },
    { label: 'Refund Trigger', value: 'BA manages refunds with capture adjustments' },
    { label: 'Ledger Adjustments', value: 'Complex - revenue recognition per captures' },
    { label: 'Instalment Engine', value: 'BA system with acquirer integration' },
    { label: 'Funding Source', value: 'BA provides upfront service, collects over time' },
    { label: 'Customer Experience', value: 'Simple - appears as normal payment to customer' },
    { label: 'Tokenisation/MIT', value: 'Optional - uses single authorisation token' },
    { label: 'Merchant of Record', value: 'Test Airlines' },
    { label: '3DS/Fraud Handling', value: 'Initial 3DS authentication, BA fraud monitoring' },
    { label: 'Additional Fees', value: 'Interest/admin fees as per BA policy' },
    { label: '3RI Support', value: 'No - single CIT authorisation only' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay in full',
      description: 'Complete payment today'
    },
    {
      id: 'instalments',
      name: 'BA Instalments (Full Auth)',
      description: 'Single authorisation with staged captures'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="badge border-blue-200 bg-blue-50 text-blue-700">
                  Merchant-Financed (Full Auth)
                </div>
                <div className="badge border-green-200 bg-green-50 text-green-700">
                  Single Authorization
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Full Authorization with Staged Captures</h1>
              <p className="text-gray-600">
                BA authorizes the full instalment amount upfront, then uses staged captures to collect payments according to the schedule. Lower risk but requires acquirer support.
              </p>
            </div>

            <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Choose your payment method</h2>
                <PaymentMethodSelector 
                  methods={paymentMethods}
                  onSelect={(methodId) => {
                    if (methodId === 'instalments') {
                      setStep(2)
                    }
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Select your instalment plan</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-2">How Full Authorization Works</div>
                    <ul className="space-y-1 text-blue-700">
                      <li>• BA authorizes the full amount (£{amount.toFixed(2)}) on your card today</li>
                      <li>• Your available credit is reduced by the full amount immediately</li>
                      <li>• BA captures payments according to your chosen schedule</li>
                      <li>• You only pay interest on captured amounts, not the full authorisation</li>
                    </ul>
                  </div>
                </div>
                <PlanPicker amount={amount} onSelect={(p) => { setPlan(p); setStep(3) }} />
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Payment authorisation</h2>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-700">
                    <div className="font-medium text-gray-900 mb-2">Pre-filled Customer Details</div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div>Name: {customerData.name}</div>
                        <div>Email: {customerData.email}</div>
                        <div>Phone: {customerData.phone}</div>
                      </div>
                      <div>
                        <div>Card: **** **** **** 4242</div>
                        <div>Expiry: {customerData.expiryDate}</div>
                        <div>Type: UK Visa</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {plan && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="text-sm text-amber-800">
                      <div className="font-medium mb-1">Authorization Schedule</div>
                      <div>Full amount (£{amount.toFixed(2)}) will be authorized today</div>
                      <div>Captures: £{(amount/plan.months).toFixed(2)} monthly for {plan.months} months</div>
                      <div className="text-xs mt-2 text-amber-600">
                        Your card will show the full amount as "pending" until captures complete
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button 
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                    onClick={() => {
                      setProcessing(true)
                      setTimeout(() => {
                        setProcessing(false)
                        setResult('approved')
                        setStep(4)
                      }, 2000)
                    }}
                  >
                    Authorize Full Amount
                  </button>
                </div>
              </div>
            )}

            {step === 4 && result === 'approved' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">Authorization Successful</h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="font-medium text-green-800 mb-2">Payment Schedule Confirmed</div>
                    <div className="text-green-700">
                      {plan && (
                        <div className="space-y-1">
                          <div>Full authorisation: £{amount.toFixed(2)} (authorized today)</div>
                          <div>Capture schedule: £{(amount/plan.months).toFixed(2)} monthly</div>
                          <div>Duration: {plan.months} months</div>
                          <div>Next capture: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="font-medium text-blue-800 mb-2">What happens next</div>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Your card shows £{amount.toFixed(2)} as "pending/authorized"</li>
                      <li>• BA captures payments monthly according to schedule</li>
                      <li>• You receive email notifications before each capture</li>
                      <li>• Available credit restored as authorisation expires</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Airline References */}
            <div className="bg-white rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">✈️ Real Airline References</h3>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">American Airlines</div>
                  <div className="text-sm text-gray-600 mb-3">Full authorisation staged capture model for vacation packages and premium flights</div>
                  <a href="https://www.aa.com/homePage" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Airline Website <span className="text-xs">🔗</span>
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">Delta Air Lines</div>
                  <div className="text-sm text-gray-600 mb-3">Pre-authorisation with staged billing for multi-city itineraries</div>
                  <a href="https://www.delta.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Airline Website <span className="text-xs">🔗</span>
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">United Airlines</div>
                  <div className="text-sm text-gray-600 mb-3">Hold and capture system for flexible fare changes and upgrades</div>
                  <a href="https://www.united.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Airline Website <span className="text-xs">🔗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <TermsPanel model="merchant-fullauth" />

            {/* Business Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Business Rules and Eligibility</h3>
              <RulesList rules={rules} />
            </div>


            {/* Sequence Diagram */}
            <SequenceDiagram
              title="Payment Flow Sequence"
              actors={['Customer', 'BA', 'Acquirer', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'BA',
                  message: 'Select instalment plan',
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Customer',
                  message: 'Display terms and schedule',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'BA',
                  message: 'Confirm payment details',
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Acquirer',
                  message: `Authorize full amount (£${amount})`,
                  note: 'Single full authorisation for entire instalment amount',
                  type: 'request'
                },
                {
                  from: 'Acquirer',
                  to: 'Bank',
                  message: 'Authorization request',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Acquirer',
                  message: 'Authorization approved',
                  type: 'response'
                },
                {
                  from: 'Acquirer',
                  to: 'BA',
                  message: 'Authorization successful',
                  type: 'response'
                },
                {
                  from: 'BA',
                  to: 'Customer',
                  message: 'Booking confirmed',
                  type: 'response'
                },
                {
                  from: 'BA',
                  to: 'Acquirer',
                  message: `Capture £${plan ? (amount/plan.months).toFixed(2) : 'XX'} (Month 1)`,
                  note: 'Staged capture according to schedule',
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Acquirer',
                  message: `Capture £${plan ? (amount/plan.months).toFixed(2) : 'XX'} (Month 2)`,
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Acquirer',
                  message: `Capture £${plan ? (amount/plan.months).toFixed(2) : 'XX'} (Month N)`,
                  note: 'Continue until full amount captured',
                  type: 'request'
                }
              ]}
            />
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-4 lg:self-start space-y-4">
            <SummaryCard amount={amount} />
            
            {/* Key Model Attributes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="Full Auth Model"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Smart Notes */}
      <EnhancedNotesSection isCompact={true} modelContext="Merchant-Financed (Full Auth)" />

      {/* Processing Modal */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-lg font-semibold mb-2">Processing Authorization...</div>
            <div className="text-sm text-gray-600 mb-4">Authorizing full amount with your acquirer</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">This typically takes 1-3 seconds</div>
          </div>
        </div>
      )}
    </div>
  )
}