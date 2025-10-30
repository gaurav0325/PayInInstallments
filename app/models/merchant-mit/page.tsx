'use client'

import React from 'react'
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

export default function MerchantMITPage() {
  const amount = 480 // UK GBP
  const [step, setStep] = useState<1|2|3|4>(1)
  const [plan, setPlan] = useState<{months:number;mode:'promo0'|'fee2'|'apr149'}|null>(null)
  const [processing3DS, setProcessing3DS] = useState(false)
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
    { label: 'Booking via eCommerce (New Test Airlines.com)', passed: true, required: true },
    { label: 'Return flight journey', passed: true, required: true },
    { label: 'UK residence with valid ID', passed: true, required: true },
    { label: 'Minimum purchase £100', passed: amount >= 100, required: true },
    { label: 'Maximum purchase £5,000', passed: amount <= 5000, required: true },
    { label: 'Visa or MasterCard issued in UK', passed: true, required: true },
    { label: 'Applicant is passenger on booking', passed: true, required: true },
    { label: 'MIT consent provided', passed: result === 'approved', required: true },
    { label: 'Network tokenisation successful', passed: result === 'approved', required: true },
    { label: 'Initial CIT with SCA completed', passed: result === 'approved', required: true }
  ]

  const attributes = [
    { label: 'Test Airlines Gets Money', value: 'First payment today, then monthly MIT debits' },
    { label: 'Risk Owner', value: 'Test Airlines bears full credit risk and payment failure risk' },
    { label: 'Complexity', value: 'High - requires MIT compliance and tokenisation' },
    { label: 'Flexibility', value: 'High - Test Airlines controls schedule and can adjust payments' },
    { label: 'Refund Trigger', value: 'Test Airlines manages all refunds and schedule adjustments' },
    { label: 'Ledger Adjustments', value: 'Complex - revenue recognition per payment cycle' },
    { label: 'Instalment Engine', value: 'Test Airlines proprietary system with MIT orchestration' },
    { label: 'Funding Source', value: 'Test Airlines finances customer, collects via MIT debits' },
    { label: 'Customer Experience', value: 'Standard - initial payment + monthly debits' },
    { label: 'Tokenisation/MIT', value: 'Required - network tokens for recurring payments' },
    { label: 'Merchant of Record', value: 'Test Airlines' },
    { label: '3DS/Fraud Handling', value: 'Initial SCA required, MIT exemptions thereafter' },
    { label: 'Additional Fees', value: 'Interest/admin fees as per Test Airlines policy' },
    { label: '3RI Support', value: 'Yes - 3DS Requestor Initiated for MIT transactions' }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay in full',
      description: 'Complete payment today'
    },
    {
      id: 'instalments',
      name: 'Test Airlines Instalments (MIT)',
      description: 'Initial payment with Strong Customer Authentication + monthly debits'
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
                <div className="badge border-purple-200 bg-purple-50 text-purple-700">
                  Merchant-Financed (MIT)
                </div>
                <div className="badge border-orange-200 bg-orange-50 text-orange-700">
                  Recurring Debits
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Initial CIT + Monthly MIT Debits</h1>
              <p className="text-gray-600">
                Strong Customer Authentication for the first payment, then Merchant Initiated Transaction (MIT) debits monthly using stored credentials or network tokens.
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
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-purple-800">
                    <div className="font-medium mb-2">How MIT Instalments Work</div>
                    <ul className="space-y-1 text-purple-700">
                      <li>• First payment (£{plan ? (amount/plan.months).toFixed(2) : 'XX'}) with Strong Customer Authentication</li>
                      <li>• Your card is securely tokenised for future payments</li>
                      <li>• Monthly MIT debits without additional authentication</li>
                      <li>• You can manage or cancel the schedule anytime</li>
                    </ul>
                  </div>
                </div>
                <PlanPicker amount={amount} onSelect={(p) => { setPlan(p); setStep(3) }} />
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Payment setup and consent</h2>
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
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="text-sm text-blue-800">
                      <div className="font-medium mb-1">MIT Payment Schedule</div>
                      <div>First payment today: £{(amount/plan.months).toFixed(2)} (with SCA)</div>
                      <div>Monthly MIT debits: £{(amount/plan.months).toFixed(2)} for {plan.months - 1} months</div>
                      <div>Total payable: £{amount.toFixed(2)}</div>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-amber-800">
                    <div className="font-medium mb-2">MIT Consent Required</div>
                    <div className="space-y-2">
                      <label className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <span className="text-amber-700">
                          I consent to Test Airlines storing my payment credentials and processing monthly MIT debits according to the agreed schedule. I understand I can cancel or modify this arrangement at any time.
                        </span>
                      </label>
                      <label className="flex items-start gap-3">
                        <input type="checkbox" defaultChecked className="mt-1" />
                        <span className="text-amber-700">
                          I understand that future payments will not require additional authentication and will be processed automatically.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
                    onClick={() => {
                      setProcessing3DS(true)
                      setTimeout(() => {
                        setProcessing3DS(false)
                        setResult('approved')
                        setStep(4)
                      }, 3000)
                    }}
                  >
                    Setup MIT Payments
                  </button>
                </div>
              </div>
            )}

            {step === 4 && result === 'approved' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">MIT Setup Successful</h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="font-medium text-green-800 mb-2">Payment Schedule Active</div>
                    <div className="text-green-700">
                      {plan && (
                        <div className="space-y-1">
                          <div>First payment: £{(amount/plan.months).toFixed(2)} (processed today with SCA)</div>
                          <div>Network token: Created and stored securely</div>
                          <div>MIT schedule: {plan.months - 1} monthly payments of £{(amount/plan.months).toFixed(2)}</div>
                          <div>Next debit: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="font-medium text-blue-800 mb-2">MIT Management</div>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Monthly debits processed automatically (no SCA required)</li>
                      <li>• Email notifications sent before each debit</li>
                      <li>• Manage or cancel schedule via "Manage My Booking"</li>
                      <li>• Network tokens used for enhanced security</li>
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
                  <div className="font-medium text-gray-900 mb-2">Southwest Airlines</div>
                  <div className="text-sm text-gray-600 mb-3">MIT recurring billing for vacation packages and multi-city bookings</div>
                  <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">JetBlue Airways</div>
                  <div className="text-sm text-gray-600 mb-3">Stored credential MIT system for flexible travel plans and ancillary services</div>
                  <a href="#" onClick={() => alert("Feature reference - actual implementation would link to payment page")} className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        View Feature <span className="text-xs">🔗</span>
                      </a>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <TermsPanel model="merchant-mit" />

            {/* Business Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Business Rules and Eligibility</h3>
              <RulesList rules={rules} />
            </div>


            {/* Sequence Diagram */}
            <SequenceDiagram
              title="Payment Flow Sequence"
              actors={['Customer', 'Test Airlines', 'Acquirer', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'Test Airlines',
                  message: 'Select instalment plan',
                  type: 'request'
                },
                {
                  from: 'Test Airlines',
                  to: 'Customer',
                  message: 'Display MIT consent and terms',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Test Airlines',
                  message: 'Provide consent for MIT debits',
                  type: 'request'
                },
                {
                  from: 'Test Airlines',
                  to: 'Acquirer',
                  message: `Process first payment with SCA (£${plan ? (amount/plan.months).toFixed(2) : 'XX'})`,
                  note: 'Initial CIT payment with Strong Customer Authentication',
                  type: 'request'
                },
                {
                  from: 'Acquirer',
                  to: 'Bank',
                  message: 'SCA challenge (3DS)',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Customer',
                  message: '3DS authentication',
                  type: 'request'
                },
                {
                  from: 'Customer',
                  to: 'Bank',
                  message: 'Complete 3DS',
                  type: 'response'
                },
                {
                  from: 'Bank',
                  to: 'Acquirer',
                  message: 'SCA approved',
                  type: 'response'
                },
                {
                  from: 'Acquirer',
                  to: 'Test Airlines',
                  message: 'First payment successful + network token',
                  note: 'Network tokenization for future MIT transactions',
                  type: 'response'
                },
                {
                  from: 'Test Airlines',
                  to: 'Customer',
                  message: 'Booking confirmed, MIT schedule active',
                  type: 'response'
                },
                {
                  from: 'Test Airlines',
                  to: 'Acquirer',
                  message: `MIT debit (£${plan ? (amount/plan.months).toFixed(2) : 'XX'}) using token`,
                  note: 'Monthly MIT cycle - no SCA required',
                  type: 'request'
                },
                {
                  from: 'Acquirer',
                  to: 'Bank',
                  message: 'MIT transaction (no SCA required)',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Acquirer',
                  message: 'MIT approved',
                  type: 'response'
                },
                {
                  from: 'Acquirer',
                  to: 'Test Airlines',
                  message: 'MIT payment successful',
                  type: 'response'
                }
              ]}
            />
            
            {/* Smart Notes Section */}
            <EnhancedNotesSection modelContext="Merchant-Financed (MIT)" />
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <SummaryCard amount={amount} />
            
            {/* Key Model Attributes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="MIT Model"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3DS Processing Modal */}
      {processing3DS && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-lg font-semibold mb-2">Strong Customer Authentication</div>
            <div className="text-sm text-gray-600 mb-4">Processing 3DS challenge for MIT setup...</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Creating network token and setting up MIT schedule</div>
          </div>
        </div>
      )}
    </div>
  )
}