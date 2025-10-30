'use client'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ProgressSteps } from '@/components/ProgressSteps'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { BackNavigation } from '@/components/BackNavigation'

export default function HoldMyFarePage() {
  const amount = 650 // Example fare amount
  const [step, setStep] = useState<1|2|3|4|5|6>(1)
  const [holdOption, setHoldOption] = useState<'24h'|'72h'|'7days'>('72h')
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [holdExpired, setHoldExpired] = useState(false)

  const holdOptions = [
    { id: '24h', duration: '24 hours', fee: 10, suitable: 'Last minute bookings' },
    { id: '72h', duration: '72 hours', fee: 20, suitable: 'Weekend consideration time' },
    { id: '7days', duration: '7 days', fee: 40, suitable: 'Long-haul planning (premium fares only)' }
  ]

  const rules = [
    { label: 'Fare type eligible for hold', passed: true, required: true },
    { label: 'Route supports hold option', passed: true, required: true },
    { label: 'Minimum 48h before departure', passed: amount >= 200, required: true },
    { label: 'Customer account in good standing', passed: true, required: true },
    { label: 'Seat availability confirmed', passed: true, required: true },
    { label: 'Payment method validated', passed: paymentComplete, required: true }
  ]

  const attributes = [
    { label: 'Hold Duration', value: holdOptions.find(h => h.id === holdOption)?.duration || '72 hours' },
    { label: 'Hold Fee', value: `£${holdOptions.find(h => h.id === holdOption)?.fee || 20}` },
    { label: 'Fee Refundability', value: 'Non-refundable under any circumstances' },
    { label: 'Ticket Issuance', value: 'Only after full balance payment' },
    { label: 'Risk Owner', value: 'Test Airlines (blocked seat revenue risk)' },
    { label: 'Financing Model', value: 'No external financing - airline carries risk' },
    { label: 'Balance Payment', value: 'Full payment or instalments (if available)' },
    { label: 'Expiry Handling', value: 'Auto-cancellation with hold fee forfeited' }
  ]

  const airlineReferences = [
    { 
      name: 'Lufthansa', 
      feature: 'Secure your fare option for up to 7 days',
      screenshot: '/screenshots/lufthansa-hold.jpg'
    },
    { 
      name: 'Singapore Airlines', 
      feature: 'Hold the Price for 72 hours',
      screenshot: '/screenshots/singapore-hold.jpg'
    },
    { 
      name: 'Emirates', 
      feature: 'Hold My Fare option for 72 hours',
      screenshot: '/screenshots/emirates-hold.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackNavigation />
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="badge border-purple-200 bg-purple-50 text-purple-700">
                  Hold My Fare
                </div>
                <div className="badge border-amber-200 bg-amber-50 text-amber-700">
                  Pay Later Option
                </div>
                <div className="badge border-blue-200 bg-blue-50 text-blue-700">
                  Airline Financed
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Hold My Fare, Pay Later</h1>
              <p className="text-gray-600 mb-4">
                Reserve your flight fare for a limited period with a small upfront fee. Pay the balance later in full or instalments.
              </p>
              
              {/* Airline References */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-medium text-blue-900 mb-2">Real Airline References</h3>
                <div className="grid gap-2 text-sm">
                  {airlineReferences.map((airline, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-blue-800">{airline.name}:</span>
                        <span className="text-blue-700 ml-2">{airline.feature}</span>
                      </div>
                      <a href={`https://www.${airline.name.toLowerCase().replace(' ', '')}.com`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                        Visit Website <span className="text-xs">🔗</span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Steps */}
            <ProgressSteps 
              step={step} 
              onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4|5|6)}
            />

            {/* Step Content */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Flight Search Results</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">LHR → JFK</div>
                        <div className="text-sm text-gray-600">Non-stop • Economy</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">£{amount}</div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                        onClick={() => alert('Standard booking flow')}
                      >
                        Book Now
                      </button>
                      <button 
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
                        onClick={() => setStep(2)}
                      >
                        Hold Fare, Pay Later
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Select Hold Duration</h2>
                <div className="space-y-3">
                  {holdOptions.map((option) => (
                    <div 
                      key={option.id}
                      className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                        holdOption === option.id 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setHoldOption(option.id as any)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Hold for {option.duration}</div>
                          <div className="text-sm text-gray-600">{option.suitable}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-purple-600">£{option.fee}</div>
                          <div className="text-xs text-gray-500">Non-refundable</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 mt-6"
                  onClick={() => setStep(3)}
                >
                  Continue with {holdOptions.find(h => h.id === holdOption)?.duration}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Eligibility Check</h2>
                <RulesList rules={rules} />
                <div className="flex justify-end mt-6">
                  <button 
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700"
                    onClick={() => setStep(4)}
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Pay Hold Fee</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Hold Fee ({holdOptions.find(h => h.id === holdOption)?.duration})</div>
                      <div className="text-sm text-amber-700">Non-refundable • Secures fare until deadline</div>
                    </div>
                    <div className="text-xl font-bold text-amber-800">
                      £{holdOptions.find(h => h.id === holdOption)?.fee}
                    </div>
                  </div>
                </div>
                <CardForm onPay={() => {}} />
                <button 
                  className="w-full bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 mt-6"
                  onClick={() => {
                    setPaymentComplete(true)
                    setStep(5)
                  }}
                >
                  Pay Hold Fee £{holdOptions.find(h => h.id === holdOption)?.fee}
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">Fare Held Successfully</h2>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
                  <div><strong>Booking Reference:</strong> HMFBA123</div>
                  <div><strong>Fare Held Until:</strong> {new Date(Date.now() + (holdOption === '24h' ? 86400000 : holdOption === '72h' ? 259200000 : 604800000)).toLocaleString()}</div>
                  <div><strong>Hold Fee Paid:</strong> £{holdOptions.find(h => h.id === holdOption)?.fee}</div>
                  <div><strong>Balance Due:</strong> £{amount - (holdOptions.find(h => h.id === holdOption)?.fee || 0)}</div>
                </div>
                <div className="mt-6 flex gap-3">
                  <button 
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700"
                    onClick={() => setStep(6)}
                  >
                    Pay Balance Now
                  </button>
                  <button 
                    className="bg-gray-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-700"
                    onClick={() => alert('Payment reminder set. We will notify you 24 hours before hold expiry.')}
                  >
                    Pay Later
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Complete Payment</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Original Fare:</span>
                    <span>£{amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hold Fee (Paid):</span>
                    <span>-£{holdOptions.find(h => h.id === holdOption)?.fee}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold">
                    <span>Balance Due:</span>
                    <span>£{amount - (holdOptions.find(h => h.id === holdOption)?.fee || 0)}</span>
                  </div>
                </div>
                <div className="grid gap-3 mb-6">
                  <button 
                    className="bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700"
                    onClick={() => alert(`Processing full balance payment of £${amount - (holdOptions.find(h => h.id === holdOption)?.fee || 0)}...`)}
                  >
                    Pay Full Balance
                  </button>
                  <button 
                    className="bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700"
                    onClick={() => alert('Redirecting to instalment options...')}
                  >
                    Pay in Instalments
                  </button>
                </div>
              </div>
            )}

            {/* Sequence Diagram */}
            <SequenceDiagram
              title="Hold My Fare Payment Flow Sequence"
              actors={['Customer', 'Test Airlines', 'Acquirer', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'Test Airlines',
                  message: 'Search flights and select "Hold Fare"',
                  type: 'request'
                },
                {
                  from: 'Test Airlines',
                  to: 'Customer',
                  message: 'Display hold duration options',
                  note: 'Show 24h, 72h, 7-day hold options with fees',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Test Airlines',
                  message: `Choose ${holdOptions.find(h => h.id === holdOption)?.duration} hold`,
                  note: `Hold fee: £${holdOptions.find(h => h.id === holdOption)?.fee}`,
                  type: 'request'
                },
                {
                  from: 'Test Airlines',
                  to: 'Test Airlines',
                  message: 'Check eligibility rules',
                  note: 'Verify fare eligibility, route availability, customer standing',
                  type: 'process'
                },
                {
                  from: 'Test Airlines',
                  to: 'Customer',
                  message: 'Request hold fee payment',
                  note: 'Non-refundable hold fee to secure fare',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Test Airlines',
                  message: 'Submit card details for hold fee',
                  type: 'request'
                },
                {
                  from: 'Test Airlines',
                  to: 'Acquirer',
                  message: 'Process hold fee payment',
                  note: `Charge £${holdOptions.find(h => h.id === holdOption)?.fee} hold fee`,
                  type: 'request'
                },
                {
                  from: 'Acquirer',
                  to: 'Bank',
                  message: 'Process hold fee charge',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Acquirer',
                  message: 'Hold fee payment confirmed',
                  type: 'response'
                },
                {
                  from: 'Acquirer',
                  to: 'Test Airlines',
                  message: 'Hold fee payment settled',
                  type: 'response'
                },
                {
                  from: 'Test Airlines',
                  to: 'Test Airlines',
                  message: 'Activate fare hold with expiry timer',
                  note: `Hold active until ${new Date(Date.now() + (holdOption === '24h' ? 86400000 : holdOption === '72h' ? 259200000 : 604800000)).toLocaleDateString()}`,
                  type: 'process'
                },
                {
                  from: 'Test Airlines',
                  to: 'Customer',
                  message: 'Send hold confirmation with deadline',
                  note: 'Booking reference and payment deadline provided',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Test Airlines',
                  message: 'Complete balance payment (before expiry)',
                  note: `Pay remaining £${amount - (holdOptions.find(h => h.id === holdOption)?.fee || 0)}`,
                  type: 'request'
                },
                {
                  from: 'Test Airlines',
                  to: 'Acquirer',
                  message: 'Process balance payment',
                  type: 'request'
                },
                {
                  from: 'Acquirer',
                  to: 'Bank',
                  message: 'Process balance charge',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Acquirer',
                  message: 'Balance payment confirmed',
                  type: 'response'
                },
                {
                  from: 'Acquirer',
                  to: 'Test Airlines',
                  message: 'Balance payment settled',
                  type: 'response'
                },
                {
                  from: 'Test Airlines',
                  to: 'Test Airlines',
                  message: 'Process ticket issuance',
                  note: 'Full payment received, issue ticket',
                  type: 'process'
                },
                {
                  from: 'Test Airlines',
                  to: 'Customer',
                  message: 'Ticket issued successfully',
                  note: 'Booking complete with confirmation',
                  type: 'response'
                }
              ]}
            />
            
            {/* Smart Notes Section */}
            <EnhancedNotesSection modelContext="Hold My Fare" />
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <SummaryCard amount={amount} />

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="Hold My Fare Model"
              />
            </div>

            <TermsPanel model="hold-my-fare" />
          </div>
        </div>
      </div>
    </div>
  )
}