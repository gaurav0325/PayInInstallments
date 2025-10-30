'use client'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { useState } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { PlanPicker } from '@/components/PlanPicker'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { BackNavigation } from '@/components/BackNavigation'
import { ScreenshotModal } from '@/components/ScreenshotModal'

export default function PSPPage(){
  const amount = 440 // Updated for PSP experience
  const [step,setStep]=useState<1|2|3|4>(1)
  const [plan,setPlan]=useState<{months:number;mode:'promo0'|'fee2'|'apr149'}|null>(null)
  const [showPSPModal,setShowPSPModal]=useState(false)
  const [selectedPSP,setSelectedPSP]=useState('cybersource')
  const [result,setResult]=useState<'approved'|'declined'|null>(null)
  const [screenshotModal, setScreenshotModal] = useState<{ isOpen: boolean; title: string }>({ isOpen: false, title: '' })

  // Pre-filled customer data
  const customerData = {
    name: 'Michael Thompson',
    email: 'michael.thompson@example.com',
    phone: '+44 7700 456789',
    address: '789 Regent Street, London, W1B 2HG',
    cardNumber: '4242424242424242',
    expiryDate: '12/26',
    cvv: '123'
  }

  // PSP providers with embedded modal styling
  const pspProviders = [
    { 
      id: 'cybersource', 
      name: 'CyberSource', 
      description: 'Advanced payment scheduling with fraud protection',
      logo: '🛡️',
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      type: 'Embedded Modal'
    },
    { 
      id: 'adyen', 
      name: 'Adyen', 
      description: 'Split payments with built-in authentication',
      logo: '💎',
      color: 'bg-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      type: 'Embedded Widget'
    },
    { 
      id: 'stripe', 
      name: 'Stripe', 
      description: 'Subscription billing with instalment support',
      logo: '⚡',
      color: 'bg-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      type: 'Embedded Flow'
    }
  ]

  const currentPSP = pspProviders.find(p => p.id === selectedPSP) || pspProviders[0]

  const rules = [
    { label: 'Valid payment card required', passed: true, required: true },
    { label: 'Global market eligibility', passed: true, required: true },
    { label: 'Minimum basket £100', passed: amount >= 100, required: true },
    { label: 'Maximum basket £2,500', passed: amount <= 2500, required: true },
    { label: '3D Secure authentication supported', passed: true, required: true },
    { label: 'PSP instalment service available', passed: true, required: true },
    { label: 'Network tokenisation enabled', passed: result === 'approved', required: true },
    { label: 'Fraud screening passed', passed: result === 'approved', required: true }
  ]

  const attributes = [
    { label: 'BA Gets Money', value: 'According to PSP settlement schedule', importance: 'high' as const, type: 'positive' as const },
    { label: 'Risk Owner', value: 'Shared - PSP manages processing, BA bears service risk', importance: 'high' as const, type: 'warning' as const },
    { label: 'Complexity', value: 'Low - embedded PSP integration', importance: 'high' as const, type: 'positive' as const },
    { label: 'Flexibility', value: 'Low - limited to PSP capabilities', importance: 'medium' as const, type: 'negative' as const },
    { label: 'Refund Trigger', value: 'Coordinated between PSP and BA', importance: 'medium' as const, type: 'neutral' as const },
    { label: 'Ledger Adjustments', value: 'Automated via PSP system', importance: 'medium' as const, type: 'positive' as const },
    { label: 'Instalment Engine', value: 'PSP embedded system (CyberSource/Adyen/Stripe)', importance: 'high' as const, type: 'positive' as const },
    { label: 'Funding Source', value: 'PSP manages payment collection and settlement', importance: 'medium' as const, type: 'neutral' as const },
    { label: 'Customer Experience', value: 'Embedded - appears as BA service with PSP power', importance: 'high' as const, type: 'positive' as const },
    { label: 'Tokenisation/MIT', value: 'Optional - PSP handles token management', importance: 'low' as const, type: 'neutral' as const },
    { label: 'Merchant of Record', value: 'British Airways', importance: 'medium' as const, type: 'positive' as const },
    { label: '3DS/Fraud Handling', value: 'PSP handles all authentication and fraud screening', importance: 'medium' as const, type: 'positive' as const },
    { label: 'Additional Fees', value: 'PSP processing fees + potential customer service charges', importance: 'medium' as const, type: 'warning' as const },
    { label: '3RI Support', value: 'Minimal - basic recurring payment support', importance: 'low' as const, type: 'negative' as const }
  ]

  const paymentMethods = [
    {
      id: 'card',
      name: 'Pay with card',
      description: 'Complete payment today'
    },
    {
      id: 'instalments',
      name: 'PSP Installments',
      description: 'Split payments managed by payment service provider'
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
                <div className="badge border-blue-200 bg-blue-50 text-blue-700">
                  PSP-Driven Installments
                </div>
                <div className="badge border-green-200 bg-green-50 text-green-700">
                  Embedded Modal
                </div>
                <div className="badge border-purple-200 bg-purple-50 text-purple-700">
                  Automated Scheduling
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Service Provider Installments</h1>
              <p className="text-gray-600">
                Embedded instalment solutions powered by leading PSPs. No redirect required - complete the process within BA's checkout experience.
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
                <h2 className="text-xl font-semibold mb-4">Select PSP instalment provider</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-2">Embedded PSP Experience</div>
                    <ul className="space-y-1 text-blue-700">
                      <li>• No redirect - complete payment within BA checkout</li>
                      <li>• PSP handles payment splitting and scheduling automatically</li>
                      <li>• Built-in fraud protection and 3DS authentication</li>
                      <li>• Network tokenisation for secure recurring charges</li>
                    </ul>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 mb-6">
                  {pspProviders.map((provider) => (
                    <label key={provider.id} className={`flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      selectedPSP === provider.id 
                        ? `${provider.borderColor} ${provider.bgColor}` 
                        : 'border-gray-200 bg-white'
                    }`}>
                      <input 
                        type="radio" 
                        name="psp" 
                        value={provider.id}
                        checked={selectedPSP === provider.id}
                        onChange={(e) => setSelectedPSP(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-2xl mb-2">{provider.logo}</div>
                        <div className={`font-medium ${selectedPSP === provider.id ? provider.textColor : 'text-gray-900'}`}>
                          {provider.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {provider.type}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">
                          {provider.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button 
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
                    onClick={() => setStep(3)}
                  >
                    Continue with {currentPSP.name}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">PSP instalment setup</h2>
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
                  <div className={`${currentPSP.bgColor} border ${currentPSP.borderColor} rounded-xl p-4 mb-6`}>
                    <div className="text-sm">
                      <div className={`font-medium mb-2 ${currentPSP.textColor}`}>
                        {currentPSP.logo} {currentPSP.name} Instalment Schedule
                      </div>
                      <div className="text-gray-700">
                        <div>Provider: {currentPSP.name}</div>
                        <div>Type: {currentPSP.type}</div>
                        <div>Duration: {plan.months} monthly payments</div>
                        <div>Amount per payment: £{(amount/plan.months).toFixed(2)}</div>
                        <div>Total: £{amount.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-amber-800">
                    <div className="font-medium mb-2">📱 Embedded Modal Processing</div>
                    <div className="text-amber-700">
                      {currentPSP.name} will open an embedded modal within this page to securely process your payment splitting and tokenisation.
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    className={`${currentPSP.color} text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity`}
                    onClick={() => {
                      setShowPSPModal(true)
                    }}
                  >
                    Open {currentPSP.name} Modal
                  </button>
                </div>
              </div>
            )}

            {step === 4 && result === 'approved' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">PSP Installments Configured</h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="font-medium text-green-800 mb-2">Payment schedule active via {currentPSP.name}</div>
                    <div className="text-green-700">
                      {plan && (
                        <div className="space-y-1">
                          <div>PSP: {currentPSP.name} {currentPSP.logo}</div>
                          <div>Schedule: {plan.months} payments of £{(amount/plan.months).toFixed(2)}</div>
                          <div>First charge: Today</div>
                          <div>Subsequent charges: Monthly automatic</div>
                          <div>Total: £{amount.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="font-medium text-blue-800 mb-2">PSP Management</div>
                    <ul className="text-blue-700 space-y-1">
                      <li>• {currentPSP.name} handles all payment scheduling automatically</li>
                      <li>• Network tokens created for secure recurring charges</li>
                      <li>• BA receives payments according to PSP settlement schedule</li>
                      <li>• Built-in fraud monitoring and 3DS authentication</li>
                      <li>• Email notifications sent before each charge</li>
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
                  <div className="font-medium text-gray-900 mb-2">Ryanair</div>
                  <div className="text-sm text-gray-600 mb-3">Partnership with Adyen for embedded payment splitting and instalment processing</div>
                  <button 
                    onClick={() => setScreenshotModal({ isOpen: true, title: 'Ryanair PSP Integration' })}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Screenshot →
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">easyJet</div>
                  <div className="text-sm text-gray-600 mb-3">Stripe integration for subscription-based travel plans and flexible payments</div>
                  <button 
                    onClick={() => setScreenshotModal({ isOpen: true, title: 'easyJet Stripe Integration' })}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Screenshot →
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">Air France</div>
                  <div className="text-sm text-gray-600 mb-3">CyberSource embedded modal for premium cabin instalments and extra services</div>
                  <button 
                    onClick={() => setScreenshotModal({ isOpen: true, title: 'Air France CyberSource Integration' })}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Screenshot →
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <TermsPanel model="psp" />

            {/* Business Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Business Rules and Eligibility</h3>
              <RulesList rules={rules} />
            </div>


            {/* Sequence Diagram */}
            <SequenceDiagram
              title="PSP Instalment Processing Flow Sequence"
              actors={['Customer', 'BA', 'PSP', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'BA',
                  message: 'Select PSP instalment option',
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'Customer',
                  message: 'Display PSP provider options',
                  note: 'Show available PSPs (CyberSource, Adyen, Stripe)',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'BA',
                  message: `Choose PSP (${currentPSP.name})`,
                  type: 'request'
                },
                {
                  from: 'BA',
                  to: 'PSP',
                  message: 'Initialize embedded modal/widget',
                  note: 'Open PSP instalment setup interface',
                  type: 'request'
                },
                {
                  from: 'PSP',
                  to: 'Customer',
                  message: 'Display embedded instalment setup',
                  note: 'Show payment splitting options and terms',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'PSP',
                  message: 'Complete payment details & authorisation',
                  note: `Setup £${amount.toFixed(2)} instalment plan`,
                  type: 'request'
                },
                {
                  from: 'PSP',
                  to: 'Bank',
                  message: 'Process first payment with 3DS authentication',
                  note: plan ? `First payment: £${(amount/plan.months).toFixed(2)}` : 'Initial payment processing',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'PSP',
                  message: 'Payment approved & network token created',
                  note: 'Secure token for future recurring payments',
                  type: 'response'
                },
                {
                  from: 'PSP',
                  to: 'BA',
                  message: 'First payment confirmation & schedule setup',
                  note: 'Automated payment schedule activated',
                  type: 'response'
                },
                {
                  from: 'BA',
                  to: 'Customer',
                  message: 'Booking confirmation',
                  type: 'response'
                },
                {
                  from: 'PSP',
                  to: 'Bank',
                  message: 'Process scheduled payment (no 3DS required)',
                  note: 'MIT payment using stored network token',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'PSP',
                  message: 'Payment processed successfully',
                  type: 'response'
                },
                {
                  from: 'PSP',
                  to: 'BA',
                  message: 'Settlement according to agreed schedule',
                  note: 'PSP handles payment collection and merchant settlement',
                  type: 'response'
                },
                {
                  from: 'PSP',
                  to: 'Customer',
                  message: 'Email notification of payment processed',
                  note: 'Customer receives payment confirmation',
                  type: 'process'
                }
              ]}
            />
            
            {/* Smart Notes Section */}
            <EnhancedNotesSection modelContext="PSP-Driven" />
          </div>

          {/* Right Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <SummaryCard amount={amount} />
            
            {/* Key Attributes moved to sidebar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="PSP Model"
              />
            </div>
          </div>
        </div>
      </div>

      {/* PSP Embedded Modal */}
      {showPSPModal && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className={`text-2xl`}>{currentPSP.logo}</div>
              <div>
                <div className="text-lg font-semibold">{currentPSP.name} Embedded Modal</div>
                <div className="text-sm text-gray-600">{currentPSP.type}</div>
              </div>
            </div>
            
            <div className={`${currentPSP.bgColor} border ${currentPSP.borderColor} rounded-xl p-4 mb-4`}>
              <div className="text-sm">
                <div className={`font-medium mb-2 ${currentPSP.textColor}`}>
                  Secure Payment Processing
                </div>
                <div className="text-gray-700">
                  <div>Amount: £{amount.toFixed(2)}</div>
                  <div>Splitting into: Monthly instalments</div>
                  <div>Authentication: 3D Secure enabled</div>
                  <div>Tokenisation: Network tokens for recurring</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border border-gray-200 rounded-xl p-3">
                <div className="font-medium text-gray-900 mb-2">Payment Method</div>
                <div className="text-gray-600">**** **** **** 4242 (Visa)</div>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-3">
                <div className="font-medium text-gray-900 mb-2">Instalment Schedule</div>
                <div className="text-gray-600">
                  {plan ? `${plan.months} monthly payments of £${(amount/plan.months).toFixed(2)}` : '3 monthly payments'}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="font-medium text-green-800 mb-1">✅ Fraud Check: Passed</div>
                <div className="font-medium text-green-800 mb-1">✅ 3DS Authentication: Ready</div>
                <div className="font-medium text-green-800">✅ Network Tokenisation: Enabled</div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50"
                onClick={() => setShowPSPModal(false)}
              >
                Cancel
              </button>
              <button 
                className={`flex-1 ${currentPSP.color} text-white py-3 rounded-xl font-medium hover:opacity-90`}
                onClick={() => {
                  setShowPSPModal(false)
                  setResult('approved')
                  setStep(4)
                }}
              >
                Confirm Setup
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ScreenshotModal
        isOpen={screenshotModal.isOpen}
        onClose={() => setScreenshotModal({ isOpen: false, title: '' })}
        title={screenshotModal.title}
      />
    </div>
  )
}