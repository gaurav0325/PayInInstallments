'use client'
import { EnhancedNotesSection } from "@/components/EnhancedNotesSection"
import { SequenceDiagram } from '@/components/SequenceDiagram'
import { useState, useEffect } from 'react'
import { ProgressSteps } from '@/components/ProgressSteps'
import { CardForm } from '@/components/CardForm'
import { SummaryCard } from '@/components/SummaryCard'
import { TermsPanel } from '@/components/TermsPanel'
import { RulesList } from '@/components/RulesList'
import { CategorizedAttributesDiagram } from '@/components/CategorizedAttributesDiagram'
import { PaymentMethodSelector } from '@/components/PaymentMethodSelector'

export default function DepositInstalmentsPage() {
  const amount = 1250 // UK GBP - package holiday
  const isShortHaul = false // Set to true for short-haul European destinations
  const [step, setStep] = useState<1|2|3|4>(1)
  const [depositAmount, setDepositAmount] = useState(0)
  const [customDepositAmount, setCustomDepositAmount] = useState(0)
  const [remainingAmount, setRemainingAmount] = useState(0)
  const [balanceDueDate, setBalanceDueDate] = useState('')
  const [balanceWeeks, setBalanceWeeks] = useState(7)
  const [selectedDepositOption, setSelectedDepositOption] = useState<'minimum' | 'custom'>('minimum')
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

  // Calculate deposit based on Test Airlines Holidays rules (from official documentation)
  const calculateDeposit = (total: number) => {
    if (total >= 300 && total < 700) return 99
    if (total >= 700 && total < 1000) return 120
    if (total >= 1000 && total < 3000) return 170
    if (total >= 3000 && total < 3500) return 220
    if (total >= 3500) return 220
    return Math.max(99, Math.min(220, total * 0.15)) // Fallback for edge cases
  }

  // Get the actual deposit amount based on selected option
  const getActualDepositAmount = () => {
    return selectedDepositOption === 'minimum' ? depositAmount : customDepositAmount
  }

  // Get the actual remaining balance
  const getActualRemainingAmount = () => {
    return amount - getActualDepositAmount()
  }

  useEffect(() => {
    const deposit = calculateDeposit(amount)
    setDepositAmount(deposit)
    setCustomDepositAmount(deposit) // Initialize custom amount to minimum deposit
    setRemainingAmount(amount - deposit)
    // Balance due timing: 4 weeks for short-haul, 7 weeks for other holidays (per Test Airlines documentation)
    const weeks = isShortHaul ? 4 : 7
    setBalanceWeeks(weeks)
    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + (weeks * 7)) // Convert weeks to days
    setBalanceDueDate(dueDate.toLocaleDateString())
  }, [amount, isShortHaul])

  const rules = [
    { label: 'Flight + Hotel OR Flight + Car package', passed: true, required: true },
    { label: 'Booked via "Customise Your Trip" option', passed: true, required: true },
    { label: 'UK residence and payment card', passed: true, required: true },
    { label: 'Minimum package value £300', passed: amount >= 300, required: true },
    { label: 'Travel date allows payment schedule', passed: true, required: true },
    { label: 'ATOL protection applies', passed: true, required: true },
    { label: 'OpenJaw system integration', passed: true, required: true },
    { label: 'Deposit payment successful', passed: result === 'approved', required: true }
  ]

  const attributes = [
    { label: 'Test Airlines Gets Money', value: 'Flight payment at booking, hotel/car at balance payment' },
    { label: 'Risk Owner', value: 'Test Airlines Holidays bears collection risk on balance' },
    { label: 'Complexity', value: 'Medium - requires travel date integration & OpenJaw' },
    { label: 'Flexibility', value: 'High - customer controls payment timing' },
    { label: 'Refund Trigger', value: 'Test Airlines Holidays manages cancellations and refunds' },
    { label: 'Ledger Adjustments', value: 'Complex - deferred revenue for hotel/car components' },
    { label: 'Instalment Engine', value: 'OpenJaw solution with Test Airlines Holidays integration' },
    { label: 'Funding Source', value: 'Customer funds, Test Airlines Holidays collection risk' },
    { label: 'Customer Experience', value: 'Simple - low deposit, flexible balance timing' },
    { label: 'Tokenisation/MIT', value: 'Optional - mainly for balance collection reminders' },
    { label: 'Merchant of Record', value: 'Test Airlines Holidays' },
    { label: '3DS/Fraud Handling', value: 'Standard card authentication for both payments' },
    { label: 'Additional Fees', value: 'No additional fees, deposit generally non-refundable' },
    { label: '3RI Support', value: 'Limited - mainly for payment reminders' }
  ]

  const paymentMethods = [
    {
      id: 'full',
      name: 'Pay in full',
      description: 'Complete payment today'
    },
    {
      id: 'deposit',
      name: 'Low deposit + balance',
      description: 'Secure your holiday with a low deposit, balance due before travel'
    },
    {
      id: 'custom',
      name: 'Pay other amount',
      description: 'Choose your own deposit amount (minimum £' + depositAmount + ')'
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
                <div className="badge border-orange-200 bg-orange-50 text-orange-700">
                  Low deposit + Instalments
                </div>
                <div className="badge border-blue-200 bg-blue-50 text-blue-700">
                  Test Airlines Holidays
                </div>
                <div className="badge border-green-200 bg-green-50 text-green-700">
                  Internal Reference
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Low deposit + Instalments</h1>
              <p className="text-gray-600">
                Secure your package holiday with a low deposit. Pay the balance when convenient, but at least {balanceWeeks} weeks before departure. 
                OpenJaw solution with ATOL protection and flexible payment timing.
              </p>
            </div>

            <ProgressSteps step={step} onStepClick={(stepNumber) => setStep(stepNumber as 1|2|3|4)} />

            {step === 1 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Choose your payment option</h2>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-orange-800">
                    <div className="font-medium mb-2">Test Airlines Holidays Low Deposit Benefits</div>
                    <ul className="space-y-1 text-orange-700">
                      <li>• Secure your holiday for just £{depositAmount}</li>
                      <li>• Pay balance when convenient (deadline: {balanceWeeks} weeks before travel)</li>
                      <li>• Full ATOL protection from booking confirmation</li>
                      <li>• Manage payments via "Manage My Booking"</li>
                    </ul>
                  </div>
                </div>
                <PaymentMethodSelector 
                  methods={paymentMethods}
                  onSelect={(methodId) => {
                    if (methodId === 'deposit') {
                      setSelectedDepositOption('minimum')
                      setStep(2)
                    } else if (methodId === 'custom') {
                      setSelectedDepositOption('custom')
                      setStep(2)
                    }
                  }}
                />
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedDepositOption === 'minimum' ? 'Deposit payment breakdown' : 'Choose your deposit amount'}
                </h2>
                
                {selectedDepositOption === 'custom' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="text-sm text-amber-800">
                      <div className="font-medium mb-2">Custom Deposit Amount</div>
                      <div className="text-amber-700 mb-3">
                        Enter any amount £{depositAmount} or higher to secure your booking
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="text-sm font-medium">Deposit Amount:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                          <input
                            type="number"
                            min={depositAmount}
                            max={amount}
                            value={customDepositAmount}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || depositAmount
                              setCustomDepositAmount(Math.max(depositAmount, Math.min(amount, value)))
                            }}
                            className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg w-32 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          (Min: £{depositAmount}, Max: £{amount})
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="text-sm text-blue-800">
                      <div className="font-medium mb-2">Deposit Payment (Today)</div>
                      <div className="text-2xl font-bold text-blue-900 mb-1">£{getActualDepositAmount()}</div>
                      <div className="text-blue-700">
                        Secures your booking immediately<br/>
                        Generally non-refundable
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-sm text-green-800">
                      <div className="font-medium mb-2">Balance Payment</div>
                      <div className="text-2xl font-bold text-green-900 mb-1">£{getActualRemainingAmount()}</div>
                      <div className="text-green-700">
                        Due by: {balanceDueDate}<br/>
                        Pay when convenient before deadline
                      </div>
                    </div>
                  </div>
                </div>

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

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-amber-800">
                    <div className="font-medium mb-2">Payment Timeline</div>
                    <div className="space-y-1 text-amber-700">
                      <div>• Today: Deposit payment (£{getActualDepositAmount()})</div>
                      <div className="text-xs text-amber-600 mt-1">
                        Deposit: £99 (£300-£699), £120 (£700-£999), £170 (£1000-£2999), £220 (£3000+)
                      </div>
                      <div>• Flight costs: Paid to Test Airlines immediately</div>
                      <div>• Hotel/Car: Held until balance payment</div>
                      <div>• Balance due: {balanceDueDate} ({balanceWeeks} weeks before travel)</div>
                      <div>• Reminders: Email notifications sent regularly</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
                    onClick={() => setStep(3)}
                  >
                    Pay Deposit £{getActualDepositAmount()}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-xl font-semibold mb-4">Complete deposit payment</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="text-sm text-blue-800">
                    <div className="font-medium mb-1">Processing deposit payment</div>
                    <div>Charging £{getActualDepositAmount()} to your card to secure the booking</div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-700 transition-colors"
                    onClick={() => {
                      setProcessing(true)
                      setTimeout(() => {
                        setProcessing(false)
                        setResult('approved')
                        setStep(4)
                      }, 2000)
                    }}
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}

            {step === 4 && result === 'approved' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-sm">✓</span>
                  <h2 className="text-xl font-semibold">Booking Secured</h2>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="font-medium text-green-800 mb-2">Deposit Payment Successful</div>
                    <div className="text-green-700 space-y-1">
                      <div>Deposit paid: £{getActualDepositAmount()}</div>
                      <div>Flight costs: Paid to Test Airlines</div>
                      <div>Booking reference: BAH{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                      <div>ATOL protection: Active from confirmation</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="font-medium text-blue-800 mb-2">Balance Payment Schedule</div>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Balance due: £{getActualRemainingAmount()}</li>
                      <li>• Payment deadline: {balanceDueDate}</li>
                      <li>• Manage via "Manage My Booking" portal</li>
                      <li>• Email reminders sent regularly</li>
                      <li>• Multiple payment options available</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="font-medium text-amber-800 mb-2">Important Information</div>
                    <ul className="text-amber-700 space-y-1">
                      <li>• Deposit is generally non-refundable</li>
                      <li>• Balance must be paid by {balanceDueDate}</li>
                      <li>• Failure to pay balance may result in cancellation</li>
                      <li>• Test Airlines Holidays manages cancellations and refunds</li>
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
                  <div className="font-medium text-gray-900 mb-2">Virgin Atlantic Holidays</div>
                  <div className="text-sm text-gray-600 mb-3">Deposit instalments for package holidays with flexible balance payment schedules</div>
                  <a href="https://www.virgin-atlantic.com/gb/en/flights/book/holidays" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Booking Page <span className="text-xs">🔗</span>
                  </a>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="font-medium text-gray-900 mb-2">TUI Airways</div>
                  <div className="text-sm text-gray-600 mb-3">Low deposit booking system with remainder due before departure</div>
                  <a href="https://www.tui.co.uk/holidays" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1">
                    Visit Booking Page <span className="text-xs">🔗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <TermsPanel model="deposit-instalments" />

            {/* Business Rules */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Business Rules and Eligibility</h3>
              <RulesList rules={rules} />
            </div>


            {/* Sequence Diagram */}
            <SequenceDiagram
              title="Payment Flow Sequence"
              actors={['Customer', 'Test Airlines Holidays', 'OpenJaw', 'Acquirer', 'Bank']}
              steps={[
                {
                  from: 'Customer',
                  to: 'Test Airlines Holidays',
                  message: 'Select package holiday',
                  type: 'request'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'OpenJaw',
                  message: 'Calculate deposit amount',
                  note: 'Deposit calculation based on package value',
                  type: 'request'
                },
                {
                  from: 'OpenJaw',
                  to: 'Test Airlines Holidays',
                  message: `Deposit £${getActualDepositAmount()} for £${amount} package`,
                  type: 'response'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'Customer',
                  message: 'Display deposit option',
                  type: 'response'
                },
                {
                  from: 'Customer',
                  to: 'Test Airlines Holidays',
                  message: 'Choose low deposit payment',
                  type: 'request'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'Acquirer',
                  message: `Process deposit payment £${getActualDepositAmount()}`,
                  note: 'Low deposit payment to secure booking',
                  type: 'request'
                },
                {
                  from: 'Acquirer',
                  to: 'Bank',
                  message: 'Charge customer card',
                  type: 'request'
                },
                {
                  from: 'Bank',
                  to: 'Acquirer',
                  message: 'Payment approved',
                  type: 'response'
                },
                {
                  from: 'Acquirer',
                  to: 'Test Airlines Holidays',
                  message: 'Deposit payment confirmed',
                  type: 'response'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'Test Airlines',
                  message: 'Pay flight costs',
                  note: 'Flight payment made immediately',
                  type: 'process'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'Customer',
                  message: `Booking confirmed, balance due ${balanceDueDate}`,
                  note: `Balance due before travel (${balanceWeeks} weeks)`,
                  type: 'response'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'Customer',
                  message: `Balance due reminder £${getActualRemainingAmount()}`,
                  note: 'Before travel - balance payment required',
                  type: 'request'
                },
                {
                  from: 'Customer',
                  to: 'Test Airlines Holidays',
                  message: 'Pay balance',
                  type: 'request'
                },
                {
                  from: 'Test Airlines Holidays',
                  to: 'Test Airlines',
                  message: 'Complete hotel/car payments',
                  note: 'Final payments to suppliers',
                  type: 'process'
                }
              ]}
            />
            
            {/* Smart Notes Section */}
            <EnhancedNotesSection modelContext="Low deposit + Instalments" />
          </div>

          {/* Right Sidebar - Package holiday details */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <h2 className="text-lg font-semibold mb-3">Package Holiday Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">LHR → FCO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">7 nights</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel:</span>
                  <span className="font-medium">4* Rome Center</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passengers:</span>
                  <span className="font-medium">2 Adults</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">£{amount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-orange-600">
                    <span>Deposit today:</span>
                    <span className="font-semibold">£{getActualDepositAmount()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Balance due:</span>
                    <span>£{getActualRemainingAmount()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="text-xs text-amber-700">
                  <div className="font-medium">⚠️ Simulation</div>
                  <div className="mt-1">No real payments processed</div>
                </div>
              </div>
            </div>
            
            {/* Key Attributes moved to sidebar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h3 className="text-lg font-semibold mb-3">Key Model Attributes</h3>
              <CategorizedAttributesDiagram 
                attributes={attributes} 
                title="Key Attributes"
                modelName="Deposit + Instalments"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {processing && (
        <div className="fixed inset-0 bg-black/30 grid place-items-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-lg font-semibold mb-2">Processing Deposit...</div>
            <div className="text-sm text-gray-600 mb-4">Securing your booking with Test Airlines Holidays</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full animate-pulse w-2/3"></div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Confirming with OpenJaw system</div>
          </div>
        </div>
      )}
    </div>
  )
}