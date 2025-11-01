'use client'

import React from 'react'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'

export default function FlexPayPage(){
  const amount = 480
  const [step,setStep]=useState<1|2|3|4>(1)
  const [result,setResult]=useState<'approved'|'declined'|null>(null)
  const [selectedInstalments, setSelectedInstalments] = useState<3|6|12>(3)

  const rules = [
    { label: 'Minimum amount £200', passed: amount >= 200, required: true },
    { label: 'Maximum amount £5000', passed: amount <= 5000, required: true },
    { label: 'FlexPay credit check passed', passed: result === 'approved', required: true },
    { label: 'UATP network available', passed: true, required: true },
    { label: 'Amadeus ConnectAPI integration active', passed: true, required: true },
    { label: 'Valid email for instalment notifications', passed: true, required: true },
    { label: 'Travel date within acceptable window', passed: true, required: true }
  ]

  const attributes = [
    { label: 'Who funds', value: 'FlexPay (partner financing)' },
    { label: 'Credit risk', value: 'FlexPay bears credit risk with fee/interest deduction' },
    { label: 'Underwriting', value: 'Real-time credit assessment by FlexPay portal' },
    { label: 'Customer cost', value: 'Interest/fees applied to instalment plan' },
    { label: 'First payment timing', value: 'Immediate - first instalment charged at booking' },
    { label: 'Integration type', value: 'Web-redirect via XPP (Amadeus Payment Platform)' },
    { label: 'Payment orchestration', value: 'XPP coordinates all payment flows and logging' },
    { label: 'VCC Technology', value: 'Virtual Credit Card (VCC) using UATP network' },
    { label: 'Card generation', value: 'FlexPay generates VCC upon successful loan approval' },
    { label: 'Authorization flow', value: 'DAPI submits VCC authorization to UATP network' },
    { label: 'Customer journey', value: 'Redirect to FlexPay portal for login & loan agreement' },
    { label: 'Customer visibility', value: 'Customer sees instalment plan at FlexPay portal' },
    { label: 'Data captured', value: 'FlexPay captures customer data for loan application' },
    { label: 'Payment validation', value: 'XPP enquires loan status from FlexPay' },
    { label: 'Settlement to Test Airlines', value: 'Immediate full payment via UATP after authorization' },
    { label: 'Refund handling', value: 'Test Airlines initiates via XPP, FlexPay adjusts plan' },
    { label: 'Chargeback liability', value: 'FlexPay handles chargebacks and disputes' },
    { label: 'Markets supported', value: 'Global (subject to UATP network and FlexPay availability)' },
    { label: 'Dependencies', value: 'XPP, FlexPay, DAPI, UATP network, ConnectAPI' }
  ]

  const paymentMethods = [
    {
      id: 'flexpay-3',
      name: 'FlexPay - 3 monthly instalments',
      description: `3 monthly payments of £${(amount/3).toFixed(2)} (interest applies)`
    },
    {
      id: 'flexpay-6',
      name: 'FlexPay - 6 monthly instalments',
      description: `6 monthly payments of £${(amount/6).toFixed(2)} (interest applies)`
    },
    {
      id: 'flexpay-12',
      name: 'FlexPay - 12 monthly instalments',
      description: `12 monthly payments of £${(amount/12).toFixed(2)} (interest applies)`
    },
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Complete payment now'
    }
  ]

  const handleMethodSelect = (methodId: string) => {
    if (methodId === 'flexpay-3') {
      setSelectedInstalments(3)
      setStep(2)
    } else if (methodId === 'flexpay-6') {
      setSelectedInstalments(6)
      setStep(2)
    } else if (methodId === 'flexpay-12') {
      setSelectedInstalments(12)
      setStep(2)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="badge border-purple-200 bg-purple-50 text-purple-700">
            Model: FlexPay via Amadeus
          </div>
          <div className="badge border-blue-200 bg-blue-50 text-blue-700">
            VCC UATP
          </div>
          <div className="badge border-green-200 bg-green-50 text-green-700">
            Partner financed
          </div>
        </div>

        <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

        {step===1 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Choose your payment method</h2>
            <p className="text-sm text-gray-600 mb-4">
              Select a FlexPay instalment option or pay with card. FlexPay uses secure Virtual Credit Cards (VCC) via UATP network in the background.
            </p>
            <PaymentMethodSelector
              methods={paymentMethods}
              onSelect={handleMethodSelect}
            />
          </section>
        )}

        {step===2 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">Redirecting to FlexPay</h2>
            <p className="text-sm text-gray-600 mb-4">
              You'll be redirected to FlexPay to complete your instalment application. XPP (Amadeus Payment Platform) is initiating the connection.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-purple-800">
                <div className="font-medium mb-2">Selected Plan</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Total amount:</span>
                    <span className="font-medium">£{amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Number of instalments:</span>
                    <span className="font-medium">{selectedInstalments} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly payment:</span>
                    <span className="font-medium">£{(amount/selectedInstalments).toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-purple-600 mt-2">
                    Note: Interest rates apply as per FlexPay terms
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-blue-800">
                <div className="font-medium mb-2">What happens next</div>
                <div className="space-y-1">
                  <div>1. XPP initiates payment with FlexPay (server-to-server)</div>
                  <div>2. You'll be redirected to FlexPay portal</div>
                  <div>3. Login and select your instalment plan</div>
                  <div>4. Accept loan agreement</div>
                  <div>5. FlexPay generates VCC UATP card</div>
                  <div>6. Return to Test Airlines for confirmation</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn-secondary" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn-primary" onClick={() => setStep(3)}>
                Continue to FlexPay
              </button>
            </div>
          </section>
        )}

        {step===3 && (
          <section className="card p-5">
            <h2 className="text-xl font-semibold mb-3">FlexPay Portal - Loan Application</h2>
            <p className="text-sm text-gray-600 mb-4">
              You're now on the FlexPay portal. Complete your loan application to proceed with the instalment plan.
            </p>

            <div className="bg-purple-100 border-2 border-purple-300 rounded-xl p-4 mb-4">
              <div className="text-sm text-purple-900 font-medium mb-3">FlexPay Login & Application</div>
              <div className="bg-white rounded-lg p-3 space-y-3">
                <div className="space-y-2">
                  <div className="text-xs text-gray-600">Enter your information:</div>
                  <input type="text" placeholder="Email / Username" className="w-full px-3 py-2 border border-gray-300 rounded text-sm" disabled />
                  <input type="password" placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded text-sm" disabled />
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="text-xs text-gray-600 mb-2">Select instalment plan:</div>
                  <div className="space-y-1">
                    <div className={`p-2 border rounded text-xs ${selectedInstalments === 3 ? 'border-purple-500 bg-purple-50' : 'border-gray-300'}`}>
                      {selectedInstalments} monthly instalments of £{(amount/selectedInstalments).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <label className="flex items-start gap-2 text-xs">
                    <input type="checkbox" className="mt-0.5" disabled checked />
                    <span className="text-gray-700">I accept the loan agreement and terms & conditions</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
              <div className="text-sm text-amber-800">
                <div className="font-medium mb-2">🔄 Processing loan application</div>
                <div className="space-y-1">
                  <div>✓ Customer information verified</div>
                  <div>✓ Instalment plan selected</div>
                  <div>✓ Loan agreement accepted</div>
                  <div>⏱ FlexPay performing credit assessment...</div>
                  <div>⏱ Generating VCC UATP card...</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn-secondary" onClick={() => setResult('declined')}>
                Simulate Decline
              </button>
              <button className="btn-primary" onClick={() => {
                setResult('approved')
                setStep(4)
              }}>
                Simulate Approval
              </button>
            </div>
          </section>
        )}

        {step===4 && (
          <section className="card p-5">
            {result === 'approved' ? (
              <>
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">FlexPay Approved - Booking Confirmed</h2>
                </div>
                <div className="space-y-3 text-sm">
                  <p>Your FlexPay instalment plan has been approved and your booking is confirmed.</p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <div className="font-medium text-green-800 mb-2">Instalment Schedule</div>
                    <ul className="text-green-700 space-y-1">
                      {Array.from({ length: selectedInstalments }, (_, i) => (
                        <li key={i}>
                          • Instalment {i + 1}: {new Date(Date.now() + (i * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString()} - £{(amount/selectedInstalments).toFixed(2)}
                        </li>
                      ))}
                      <li className="mt-2 font-medium">• Total: £{amount.toFixed(2)} + interest</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-green-200 text-xs text-green-700">
                      Payments processed automatically via VCC UATP cards generated by Amadeus
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <div className="font-medium text-blue-800 mb-1">What happens next</div>
                    <div className="text-blue-700 space-y-1 text-xs">
                      <div>• You'll receive a confirmation email with instalment details</div>
                      <div>• Access FlexPay portal to manage your payments</div>
                      <div>• First instalment charged today</div>
                      <div>• Subsequent instalments charged automatically each month</div>
                      <div>• Test Airlines receives full payment immediately</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-red-600 mb-3">
                  <span className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center text-sm">✗</span>
                  <h2 className="text-xl font-semibold">FlexPay Application Declined</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your FlexPay application was not approved. Please try a different payment method or contact FlexPay support.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="text-sm text-red-700">
                    <div className="font-medium mb-1">Alternative payment options:</div>
                    <div>• Pay with credit/debit card</div>
                    <div>• Try a different BNPL provider</div>
                    <div>• Reduce booking amount</div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="btn-primary" onClick={() => {
                    setStep(1)
                    setResult(null)
                  }}>
                    Choose different payment method
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {/* FlexPay Provider Reference */}
        <div className="bg-white rounded-2xl border border-purple-200 p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-900">FlexPay via Amadeus XPP Integration</h3>
          <div className="space-y-4">
            <div className="border border-purple-300 bg-purple-50 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">FlexPay BNPL Solution</div>
              <div className="text-sm text-gray-600 mb-3">
                FlexPay provides instalment financing using Virtual Credit Card (VCC) technology via the UATP network. Integration orchestrated through Amadeus XPP (Payment Platform) with ConnectAPI for server-to-server communication.
              </div>
              <div className="text-xs text-gray-700 space-y-2 bg-white rounded p-3 border border-purple-200">
                <div className="font-medium text-purple-800">Key Technical Components:</div>
                <div>• <strong>XPP (Amadeus Payment Platform)</strong>: Orchestrates payment flow and logging</div>
                <div>• <strong>FlexPay Portal</strong>: Customer login, instalment selection, loan agreement</div>
                <div>• <strong>ConnectAPI</strong>: Server-to-server communication between XPP and FlexPay</div>
                <div>• <strong>VCC Generation</strong>: FlexPay creates Virtual Credit Card upon loan approval</div>
                <div>• <strong>DAPI</strong>: Submits VCC authorization request to UATP</div>
                <div>• <strong>UATP Network</strong>: Processes VCC authorization and capture</div>
                <div>• <strong>Real-time validation</strong>: XPP enquires loan status from FlexPay</div>
                <div>• <strong>PCI DSS compliant</strong>: No card data stored by merchant</div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="font-medium text-gray-900 mb-2">Integration Flow Highlights</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>✓ Web-redirect to FlexPay portal for loan application</div>
                <div>✓ XPP orchestrates all payment communications</div>
                <div>✓ FlexPay generates VCC upon successful credit approval</div>
                <div>✓ DAPI authorizes VCC payment via UATP network</div>
                <div>✓ Test Airlines receives immediate payment confirmation</div>
                <div>✓ FlexPay bears all credit risk with fee/interest</div>
                <div>✓ Flexible instalment plans (3/6/12 months)</div>
                <div>✓ Global reach via UATP airline payment network</div>
              </div>
            </div>

            <div className="border border-blue-300 bg-blue-50 rounded-lg p-4">
              <div className="font-medium text-gray-900 mb-2">Architecture Overview</div>
              <div className="text-xs text-gray-700 space-y-1">
                <div><strong>Digital/Checkout</strong> → Initiates payment creation request</div>
                <div><strong>XPP</strong> → Connects to FlexPay, manages redirection, validates payment</div>
                <div><strong>FlexPay</strong> → Credit assessment, VCC generation, loan management</div>
                <div><strong>DAPI</strong> → Payment gateway for VCC authorization</div>
                <div><strong>UATP</strong> → Authorizes and captures VCC payment</div>
                <div><strong>Test Airlines</strong> → Receives immediate settlement, issues ticket</div>
              </div>
            </div>
          </div>
        </div>

        <TermsPanel model="flexpay" />

        <section className="card p-5">
          <h3 className="text-lg font-semibold mb-3">Business rules and eligibility</h3>
          <RulesList rules={rules} />
        </section>

        {/* Sequence Diagram */}
        <SequenceDiagram
          title="FlexPay VCC UATP Integration Flow - Complete 17-Step Process"
          actors={['Customer', 'Digital/Checkout', 'XPP (Amadeus)', 'FlexPay', 'DAPI', 'UATP Network']}
          steps={[
            {
              from: 'Customer',
              to: 'Digital/Checkout',
              message: 'Step 1: Arrives at payment page, selects FlexPay',
              type: 'request'
            },
            {
              from: 'Digital/Checkout',
              to: 'XPP (Amadeus)',
              message: 'Step 2: Payment creation request',
              note: 'Send booking amount, customer details, instalment preference',
              type: 'request'
            },
            {
              from: 'XPP (Amadeus)',
              to: 'FlexPay',
              message: 'Step 3: Initiate payment (server-to-server)',
              note: 'XPP connects to FlexPay via ConnectAPI',
              type: 'request'
            },
            {
              from: 'FlexPay',
              to: 'XPP (Amadeus)',
              message: 'Step 4: Return redirection URL',
              note: 'XPP logs initialization step',
              type: 'response'
            },
            {
              from: 'XPP (Amadeus)',
              to: 'Digital/Checkout',
              message: 'Step 5: Return redirection URL',
              note: 'Facilitate web-redirection to FlexPay',
              type: 'response'
            },
            {
              from: 'Digital/Checkout',
              to: 'Customer',
              message: 'Step 6: Redirect to FlexPay login page',
              type: 'response'
            },
            {
              from: 'Customer',
              to: 'FlexPay',
              message: 'Steps 7-9: Login, enter information, select plan',
              note: 'User selects instalment plan, accepts loan agreement, confirms payment',
              type: 'request'
            },
            {
              from: 'Digital/Checkout',
              to: 'XPP (Amadeus)',
              message: 'Step 10: Request payment validation',
              note: 'Check loan application status',
              type: 'request'
            },
            {
              from: 'XPP (Amadeus)',
              to: 'FlexPay',
              message: 'Step 11: Enquire loan status',
              type: 'request'
            },
            {
              from: 'FlexPay',
              to: 'XPP (Amadeus)',
              message: 'Step 12: Return VCC on successful loan approval',
              note: 'FlexPay generates Virtual Credit Card (VCC) UATP',
              type: 'response'
            },
            {
              from: 'XPP (Amadeus)',
              to: 'DAPI',
              message: 'Step 13a: Orchestrate VCC authorization flow',
              note: 'XPP coordinates with DAPI',
              type: 'request'
            },
            {
              from: 'DAPI',
              to: 'UATP Network',
              message: 'Step 13b: Submit VCC authorization request',
              note: 'Authorize VCC payment via UATP',
              type: 'request'
            },
            {
              from: 'UATP Network',
              to: 'DAPI',
              message: 'Step 14: Authorization approved',
              note: 'UATP authorizes the VCC payment',
              type: 'response'
            },
            {
              from: 'DAPI',
              to: 'XPP (Amadeus)',
              message: 'Authorization success',
              type: 'response'
            },
            {
              from: 'XPP (Amadeus)',
              to: 'Digital/Checkout',
              message: 'Step 15: Return successful payment status',
              note: 'Ticket is issued',
              type: 'response'
            },
            {
              from: 'Digital/Checkout',
              to: 'Customer',
              message: 'Step 16: Display confirmation page',
              note: 'Booking confirmed, ticket issued',
              type: 'response'
            },
            {
              from: 'UATP Network',
              to: 'XPP (Amadeus)',
              message: 'Step 17: Capture notification',
              note: 'UATP confirms successful capture, FlexPay settles',
              type: 'response'
            }
          ]}
        />

        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
          <CategorizedAttributesDiagram
            attributes={attributes}
            title="Key Attributes"
            modelName="FlexPay VCC UATP Integration"
          />
        </div>
      </div>

      <SummaryCard amount={amount} />
    </div>
  )
}
